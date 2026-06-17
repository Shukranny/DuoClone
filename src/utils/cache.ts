import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const secureStoreOpts: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
};

// Simple in-memory fallback cache
const memoryCache = new Map<string, string>();

async function withTimeout<T>(promise: Promise<T>, timeoutMs = 1500, fallback: T): Promise<T> {
  let timeoutId: any;
  const timeoutPromise = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`[Clerk Cache] SecureStore operation timed out after ${timeoutMs}ms. Falling back.`);
      resolve(fallback);
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch (error) {
    clearTimeout(timeoutId!);
    console.error('[Clerk Cache] SecureStore operation failed:', error);
    return fallback;
  }
}

export const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    console.log(`[Clerk Cache] getToken called for key: ${key}`);
    
    // Check memory cache first for speed and troubleshooting
    if (memoryCache.has(key)) {
      const val = memoryCache.get(key) || null;
      console.log(`[Clerk Cache] getToken returned from memory: ${val ? 'found' : 'null'}`);
      return val;
    }

    if (Platform.OS === 'web') {
      return null;
    }

    try {
      const securePromise = SecureStore.getItemAsync(key, secureStoreOpts);
      const result = await withTimeout(securePromise, 1500, null);
      console.log(`[Clerk Cache] getToken returned from SecureStore: ${result ? 'found' : 'null'}`);
      if (result) {
        memoryCache.set(key, result);
      }
      return result;
    } catch (e) {
      console.error(`[Clerk Cache] getToken error:`, e);
      return null;
    }
  },

  async saveToken(key: string, token: string): Promise<void> {
    console.log(`[Clerk Cache] saveToken called for key: ${key}`);
    memoryCache.set(key, token);

    if (Platform.OS === 'web') {
      return;
    }

    try {
      const securePromise = SecureStore.setItemAsync(key, token, secureStoreOpts);
      await withTimeout(securePromise, 1500, undefined);
      console.log(`[Clerk Cache] saveToken completed successfully`);
    } catch (e) {
      console.error(`[Clerk Cache] saveToken error:`, e);
    }
  },

  async clearToken(key: string): Promise<void> {
    console.log(`[Clerk Cache] clearToken called for key: ${key}`);
    memoryCache.delete(key);

    if (Platform.OS === 'web') {
      return;
    }

    try {
      const securePromise = SecureStore.deleteItemAsync(key, secureStoreOpts);
      await withTimeout(securePromise, 1500, undefined);
      console.log(`[Clerk Cache] clearToken completed successfully`);
    } catch (e) {
      console.error(`[Clerk Cache] clearToken error:`, e);
    }
  }
};
