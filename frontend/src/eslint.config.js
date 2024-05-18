const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
import eslintConfigPrettier from "eslint-config-prettier";

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
];
export default [eslintConfigPrettier];
