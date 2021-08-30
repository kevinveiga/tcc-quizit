const { getDefaultConfig } = require('metro-config');

module.exports = (async function () {
    const {
        resolver: { assetExts, sourceExts }
    } = await getDefaultConfig(__dirname);

    return {
        transformer: {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false
                }
            })
        },
        resolver: {
            assetExts: assetExts.filter((ext) => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg']
        }
    };
})();
