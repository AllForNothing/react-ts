const {createProxyMiddleware} = require('http-proxy-middleware');

const proxyConfig = require('../config/proxy.config.json')

module.exports = function (app) {
    for (let path in proxyConfig) {
        app.use(
            createProxyMiddleware(path, proxyConfig[path])
        )
    }
};
