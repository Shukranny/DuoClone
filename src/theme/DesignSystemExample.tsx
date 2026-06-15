/**
 * Design System - Example Component
 * Demonstrates how to use the Lingua design system
 *
 * This component showcases:
 * - Color usage (brand, semantic, neutral)
 * - Typography scale
 * - Spacing and layout
 * - Tailwind/NativeWind classes
 */

import { linguaColors } from "@/theme";
import { Text, TouchableOpacity, View } from "react-native";

export function DesignSystemExample() {
  return (
    <View className="flex-1 bg-background p-4">
      {/* Header */}
      <Text className="text-h1 text-text-primary mb-6">
        Design System Example
      </Text>

      {/* Color Palette Section */}
      <View className="mb-6">
        <Text className="text-h3 text-text-primary mb-4">Brand Colors</Text>
        <View className="flex-row gap-2 flex-wrap">
          <ColorBox
            color={linguaColors.purple}
            label="Purple"
            code="#6C4EF5"
          />
          <ColorBox
            color={linguaColors.deepPurple}
            label="Deep Purple"
            code="#5B3BF6"
          />
          <ColorBox color={linguaColors.blue} label="Blue" code="#4D8BFF" />
          <ColorBox color={linguaColors.green} label="Green" code="#21C16B" />
        </View>
      </View>

      {/* Semantic Colors Section */}
      <View className="mb-6">
        <Text className="text-h3 text-text-primary mb-4">Semantic Colors</Text>
        <View className="flex-row gap-2 flex-wrap">
          <ColorBox color={linguaColors.success} label="Success" code="#21C16B" />
          <ColorBox color={linguaColors.warning} label="Warning" code="#FFC800" />
          <ColorBox color={linguaColors.error} label="Error" code="#FF4D4F" />
          <ColorBox color={linguaColors.info} label="Info" code="#4D8BFF" />
        </View>
      </View>

      {/* Typography Section */}
      <View className="mb-6">
        <Text className="text-h3 text-text-primary mb-4">Typography Scale</Text>
        <Text className="text-h1 text-text-primary">Heading 1 (H1)</Text>
        <Text className="text-h2 text-text-primary">Heading 2 (H2)</Text>
        <Text className="text-h3 text-text-primary">Heading 3 (H3)</Text>
        <Text className="text-h4 text-text-primary">Heading 4 (H4)</Text>
        <Text className="text-body-lg text-text-primary">
          Body Large (16px, important content)
        </Text>
        <Text className="text-body-md text-text-primary">
          Body Medium (14px, main body text)
        </Text>
        <Text className="text-body-sm text-text-secondary">
          Body Small (13px, supporting text)
        </Text>
        <Text className="text-caption text-text-secondary">
          Caption (11px, labels and meta)
        </Text>
      </View>

      {/* Button Examples */}
      <View className="mb-6">
        <Text className="text-h3 text-text-primary mb-4">Button Styles</Text>
        <TouchableOpacity className="btn-primary mb-3">
          <Text className="text-white font-semibold">Primary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity className="btn-secondary mb-3">
          <Text className="text-text-primary font-semibold">Secondary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity className="btn-success">
          <Text className="text-white font-semibold">Success Button</Text>
        </TouchableOpacity>
      </View>

      {/* Card Example */}
      <View className="card-base p-4 mb-6">
        <Text className="text-h4 text-text-primary mb-2">Card Example</Text>
        <Text className="text-body-sm text-text-secondary">
          Cards are commonly used for content grouping with subtle surface
          background and border styling.
        </Text>
      </View>

      {/* Badge Examples */}
      <View className="mb-6">
        <Text className="text-h3 text-text-primary mb-4">Badges</Text>
        <View className="flex-row gap-2 flex-wrap">
          <View className="badge-primary">
            <Text className="text-white text-caption font-semibold">
              Primary Badge
            </Text>
          </View>
          <View className="badge-success">
            <Text className="text-white text-caption font-semibold">
              Success Badge
            </Text>
          </View>
          <View className="badge-warning">
            <Text className="text-white text-caption font-semibold">
              Warning Badge
            </Text>
          </View>
          <View className="badge-error">
            <Text className="text-white text-caption font-semibold">
              Error Badge
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Helper component to display a color swatch
 */
function ColorBox({
  color,
  label,
  code,
}: {
  color: string;
  label: string;
  code: string;
}) {
  return (
    <View className="items-center">
      <View
        style={{ backgroundColor: color }}
        className="w-16 h-16 rounded-lg mb-2 border border-border"
      />
      <Text className="text-caption text-text-secondary font-semibold">
        {label}
      </Text>
      <Text className="text-caption text-text-secondary">{code}</Text>
    </View>
  );
}
