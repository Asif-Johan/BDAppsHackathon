const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, {
  // Add custom config options here
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs'],
    assetExts: ['ttf', 'otf', 'png', 'jpg', 'jpeg', 'gif', 'webp'],
  },
});

// Ensure proper module resolution
config.resolver.disableHierarchicalLookup = false;
config.resolver.enableGlobalPackages = true;

module.exports = withNativeWind(config, { input: './global.css' });