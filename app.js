'use strict'

var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var morgan = require('morgan')
var config = require('config')
var WXUtil = require('./wx/Util')
var WechatAPI = require('wechat-api')
var router = require('./router')

var wxconf = config.get('wx')
var API = new WechatAPI(wxconf.APPID, wxconf.APPSECRET)
var menuconf = wxconf.menu

var port = process.env.PORT || 3000
var app = new express()
var dbUrl = 'mongodb://127.0.0.1/raffle'

mongoose.connect(dbUrl)

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'html')
app.engine('html', require('ejs-mate'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(express.static(path.join(__dirname, 'public')))

//router
app.use('/', router)

API.createMenu(menuconf, function(err, res) {
	if (err) {
		console.log('创建目录失败');
	} else {
		console.log(res);
	}
})

if ('development' === app.get('env')) {
	// 打印错误信息
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
		// 输出样式格式化
	app.locals.pretty = true
		// 输出数据库报错信息
	mongoose.set('debug', true)
}

app.listen(port, function() {
	console.log('God bless...')
})
