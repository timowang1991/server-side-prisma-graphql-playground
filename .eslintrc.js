module.exports = {
    env: {
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        indent: ['error', 4],
        'no-await-in-loop': 'off',
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'global-require': 'off',
    },
};
