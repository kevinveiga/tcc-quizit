module.exports = function (api) {
    api.cache(true);

    return {
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: ['.android.js', '.ios.js', '.js', '.json', '.ts', '.tsx'],
                    alias: {
                        'test/*': ['./__tests__/']
                    }
                }
            ],
            [
                'module:react-native-dotenv',
                {
                    allowUndefined: true,
                    blacklist: null,
                    moduleName: '@env',
                    path: '.env',
                    safe: false,
                    whitelist: null
                }
            ],
            'react-native-reanimated/plugin'
        ],
        presets: ['module:metro-react-native-babel-preset']
    };
};
