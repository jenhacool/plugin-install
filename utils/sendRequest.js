const request = require("request");

function sendRequest(url, method = "GET", headers = {}, body = {}, proxy) {
  var options = { url, method, headers, proxy };
  if (method === "POST" && Object.keys(body).length > 0) {
    options.form = body;
  }
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = sendRequest;
