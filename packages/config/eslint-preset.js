module.exports = {
  extends: [
    "next",
    "prettier",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "import/no-anonymous-default-export": [0],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"]
  },
}
