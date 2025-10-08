module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    ".eslintrc.js",
    "node_modules",
    "dist",
    ".next"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },

  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
  ],
  extends: [
    "standard-with-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  // Configuración base para todos los archivos
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
  },
  overrides: [
    // Configuración específica para Next.js (frontend)
    {
      files: [
        "apps/frontend/**/*.{js,jsx,ts,tsx}",
        "apps/web/**/*.{js,jsx,ts,tsx}",
        "packages/**/components/**/*.{js,jsx,ts,tsx}",
        "**/*.{jsx,tsx}",
      ],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:@next/next/recommended",
      ],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "react/jsx-indent": ["error", 2],
        "react/jsx-indent-props": ["error", 2],
        "react/jsx-closing-bracket-location": ["error", "line-aligned"],
        "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
        "react/jsx-tag-spacing": [
          "error",
          {
            closingSlash: "never",
            beforeSelfClosing: "always",
            afterOpening: "never",
            beforeClosing: "never"
          }
        ],
        "react/jsx-wrap-multilines": [
          "error",
          {
            declaration: "parens-new-line",
            assignment: "parens-new-line",
            return: "parens-new-line",
            arrow: "parens-new-line",
            condition: "parens-new-line",
            logical: "parens-new-line",
            prop: "ignore"
          }
        ],
        "react/self-closing-comp": "error",
        "react/jsx-boolean-value": ["error", "never"],
        "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "jsx-a11y/anchor-is-valid": [
          "error",
          {
            components: ["Link"],
            specialLink: ["hrefLeft", "hrefRight"],
            aspects: ["invalidHref", "preferButton"],
          },
        ],
        "@next/next/no-html-link-for-pages": "off",
      },
    },
    // Configuración específica para NestJS (backend)
    {
      files: [
        "apps/backend/**/*.{js,ts}",
        "apps/api/**/*.{js,ts}",
        "packages/**/services/**/*.{js,ts}",
        "**/*.controller.ts",
        "**/*.service.ts",
        "**/*.module.ts",
        "**/*.guard.ts",
        "**/*.interceptor.ts",
        "**/*.decorator.ts",
        "**/*.filter.ts",
        "**/*.pipe.ts",
        "**/*.strategy.ts",
      ],
      excludedFiles: ["**/*.{jsx,tsx}"],
      rules: {
        '@typescript-eslint/explicit-function-return-type': "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/prefer-readonly": "error",
        "prefer-const": "error",
        "no-var": "error",
        // Desactivar reglas de React para backend
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "no-type-imports",
            disallowTypeAnnotations: false
          }
        ]
      },
    },
    // Configuración para archivos de configuración
    {
      files: [
        "*.config.{js,ts}",
        ".*rc.{js,ts}",
        "*.setup.{js,ts}",
        "jest.config.{js,ts}",
      ],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-anonymous-default-export": "off",
      },
    },
    // Configuración para archivos de test
    {
      files: [
        "**/*.test.{js,jsx,ts,tsx}",
        "**/*.spec.{js,jsx,ts,tsx}",
        "**/__tests__/**/*.{js,jsx,ts,tsx}",
      ],
      extends: ["plugin:jest/recommended"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "jest/expect-expect": "off",
      },
    },
    // Configuración para archivos de definición de tipos
    {
      files: ["**/*.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    "coverage/",
    "*.min.js",
    "public/",
  ],
};