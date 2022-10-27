module.exports = {
  apps : [{
    name   : "API",
    script : "./main.js",
    cwd    : "master/dist/apps/api/"

  }, {
    name   : "Data processing",
    script : "./main.js",
    cwd    : "master/dist/apps/services/cp-message-queue/"

  }, {
    name   : "Healtcheck",
    script : "master/dist/apps/services/healthchecker/main.js",
  }
  ]
}
