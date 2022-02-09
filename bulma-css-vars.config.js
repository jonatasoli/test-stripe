const appColors = {
  white: "#fff",
  primary: "#41b883",
  dark: "#283252",
  link: "#485fc7",
  info: "#039be5",
  success: "#06d6a0",
  warning: "#faae42",
  danger: "#e62965",
};

module.exports = {
  jsOutputFile: "src/style/bulma-generated/bulma-colors.js",
  sassOutputFile: "src/style/bulma-generated/generated-bulma-vars.sass",
  cssFallbackOutputFile: "src/style/bulma-generated/generated-fallback.css",
  colorDefs: appColors,
  sassEntryFile: "src/style/main.sass",
  transition: null,
};
