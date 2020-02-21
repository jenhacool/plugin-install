const queryString = require("query-string");
const baseUrl = "https://api.wordpress.org";

function createApiUrl(endpoint, params) {
  var url = `${baseUrl}/${endpoint}`;
  return queryString.stringifyUrl({
    url: url,
    query: { ...params }
  });
}

module.exports = createApiUrl;
