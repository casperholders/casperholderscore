module.exports = {
    presets: [
        ['@babel/preset-env', { targets: 'last 1 chrome version', modules: false }],
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
            ],
        },
    },
};
