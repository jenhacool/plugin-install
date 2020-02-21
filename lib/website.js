const createApiUrl = require("../utils/createApiUrl");
const sendRequest = require("../utils/sendRequest");
const randomPluginData = require("../utils/randomPluginData");
const themeData = require("../data/themes.json");

function Website(proxy, domain) {
  this.proxy = proxy;
  this.domain = domain;
  this.requestHeaders = {
    timeout: 15,
    "User-Agent": `WordPress/5.3.2; http://${this.domain}/`
  };
}

Website.prototype.getPlugins = function(keyword) {
  var params = {
    action: "query_plugins",
    "request[page]": 1,
    "request[per_page]": 36,
    "request[locale]": "en_US",
    "request[wp_version]": "5.3"
  };
  if (keyword) {
    params["request[search]"] = keyword;
  } else {
    params["request[browse]"] = "featured";
  }
  var url = createApiUrl("plugins/info/1.2/", params);
  return sendRequest(url, "GET", this.requestHeaders, {}, this.proxy);
};

Website.prototype.getPluginInfo = function(slug) {
  var params = {
    action: "plugin_information",
    "request[slug]": slug,
    "request[locale]": "en_US",
    "request[wp_version]": "5.3"
  };
  var url = createApiUrl("plugins/info/1.2/", params);
  return sendRequest(url, "GET", this.requestHeaders, {}, this.proxy);
};

Website.prototype.downloadPlugin = function(url) {
  return sendRequest(url);
};

Website.prototype.checkCoreUpdate = function() {
  var params = {
    version: "5.3.2",
    php: "7.2.12",
    locale: "en_US",
    mysql: "5.5.5",
    local_package: "",
    blogs: 1,
    users: 2,
    multisite_enabled: 0,
    initial_db_version: 44719
  };
  var headers = {
    ...this.requestHeaders,
    wp_install: `http://${this.domain}/`,
    wp_blog: `http://${this.domain}/`
  };
  var url = createApiUrl("core/version-check/1.7/", params);
  return sendRequest(url, "POST", headers, {}, this.proxy);
};

Website.prototype.checkPluginsUpdate = function() {
  var plugins = randomPluginData();
  var active = Object.keys(plugins);
  var data = {
    ...plugins,
    ...active
  };
  var body = {
    plugins: JSON.stringify(data),
    all: true,
    locale: [],
    translations: []
  };
  var url = createApiUrl("plugins/update-check/1.1/");
  return sendRequest(url, "POST", {}, body, this.proxy);
};

Website.prototype.checkThemesUpdate = function() {
  var name = [
    "twentynineteen",
    "twentyseventeen",
    "twentysixteen",
    "twentytwenty"
  ];
  var data = {
    themes: themeData,
    active: name[Math.floor(Math.random() * name.length)]
  };
  var body = {
    themes: JSON.stringify(data),
    locale: [],
    translations: []
  };
  var url = createApiUrl("themes/update-check/1.1/");
  return sendRequest(url, "POST", {}, body, this.proxy);
};

module.exports = Website;
