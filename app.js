const proxies = require("./data/proxies.json");
const domains = require("./data/domains.json");
const Website = require("./lib/website");
var CronJob = require("cron").CronJob;

function randomKeyword() {
  var keywords = ["ezdefi", "ezdefi payment", "cryptocurrency"];

  return keywords[Math.floor(Math.random() * keywords.length)];
}

proxies.forEach(async (proxy, index) => {
  var proxy = `http://${proxy.username}:${proxy.password}@${proxy.ip}`;
  var domain = domains[index];
  var fakeWebsite = new Website(proxy, domain);
  await fakeWebsite.getPlugins();
  var keyword = randomKeyword();
  await fakeWebsite.getPlugins(keyword);
  var pluginInfo = await fakeWebsite.getPluginInfo("ezdefi-woocommerce");
  await fakeWebsite.downloadPlugin(JSON.parse(pluginInfo)["download_link"]);
  var job = new CronJob(
    "0 */12 * * *",
    async function() {
      await fake.checkCoreUpdate();
      await fake.checkPluginsUpdate();
      await fake.checkThemesUpdate();
    },
    null,
    true,
    "America/Los_Angeles"
  );
  job.start();
});
