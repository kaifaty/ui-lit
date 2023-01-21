module.exports = {
    
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:wc/recommended",
        "plugin:lit/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "import",
        "lit", 
        "prettier"
    ],
    "settings": {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
          },
        "import/resolver": {
            "eslint-import-resolver-custom-alias": {
                "alias": {
                    "root": "./src",
                    "ui": "./src/components/ui",
                    "components": "./src/components"
                },
                "extensions": [
                    ".js",
                    ".jsx",
                    "ts",
                    "tsx"
                ]
            },
            "typescript": {}
        }
    },
    "rules": {
            
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        'linebreak-style': ['error', 'windows'],
        "no-missing-import": "off",
        "no-unreachable": "off",
        "import/no-unresolved": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "object-curly-spacing": [
            "error",
            "never"
        ],
        "no-mixed-spaces-and-tabs": [
            "error",
            "smart-tabs"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        quotes: [
            'warn',
            'single',
            {
              allowTemplateLiterals: true,
            },
          ],
        "semi": [
            "error",
            "never"
        ],
        "sort-imports": [
            "error",
            {
                "ignoreCase": true,
                "ignoreDeclarationSort": true
            }
        ],
        'prettier/prettier': [
            'error',
            {
              printWidth: 110,
              endOfLine: 'auto',
            },
          ],
        "import/order": [
            "error",
            {
                "newlines-between": "always",
                "groups": ["external", "parent", "builtin", "sibling", "index"],
                "pathGroups": [
                    {
                        "pattern": "lit**",
                        "group": "external"
                    },
                    {
                        "pattern": "@kai/**",
                        "group": "external"
                    },
                    {
                        "pattern": "root/**",
                        "group": "builtin"
                    },
                    {
                        "pattern": "components/**",
                        "group": "builtin"
                    }
                ],
                "pathGroupsExcludedImportTypes": [
                    "parent"
                ],
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }
        ]
    }
  }

  