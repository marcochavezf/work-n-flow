
const {
  override,
  addLessLoader,
  addBabelPlugins,
} = require("customize-cra");

module.exports = override(
  ...addBabelPlugins(
    [
      "import",
      { libraryName: "antd", style: true },
      "antd"
    ],
  ),

  addLessLoader({
    javascriptEnabled: true,
    importLoaders: true,
    modifyVars: {
      '@primary-color': '#4482FF',
    }
  }),
  
);