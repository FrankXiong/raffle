'use strict'

var WechatApi = require('wechat-api')
var config = require('config')
var wxconf = config.get('wx')
var menuconf = wxconf.menu
var APPID = wxconf.APPID
var APPSECRET = wxconf.APPSECRET
var API = new WechatApi(APPID, APPSECRET)

function menu() {
	API.createMenu(menuconf, function(err, res) {
		if (err) {
			alert('创建目录失败')
		}
		console.log(res);
	})
}

module.exports = {
	menu: menu
}
