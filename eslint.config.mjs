import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // ESLint rules
    },
    extends: [
      "js/recommended",
      prettier // disables ESLint rules that conflict with Prettier
    ],
  },
  pluginReact.configs.flat.recommended,
]);