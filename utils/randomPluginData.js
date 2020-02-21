const plugins = require("../data/plugins.json");

module.exports = function() {
  var randomData = {};
  var slug = "ezdefi-woocommerce/woocommerce-gateway-ezdefi.php";

  for (let i = 0; i < 5; i++) {
    let keys = Object.keys(plugins);
    let index = (keys.length * Math.random()) << 0;
    let key = keys[index];
    randomData[key] = plugins[key];
    delete plugins[key];
  }

  if (!Object.keys(randomData).includes(slug)) {
    randomData[slug] = plugins[slug];
  }

  return { plugins: randomData };
};
