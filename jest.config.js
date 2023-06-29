/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    "transform": {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    "transformIgnorePatterns": [
        // "^.+\\.module\\.(css|sass|scss)$",
        "node_modules/(?!keycloakify)/"
    ],
    // "moduleNameMapper": {
    //     "src/(.*)$": "<rootDir>/src/$1"
    // }
};
