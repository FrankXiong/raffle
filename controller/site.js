'use strict'

const JHKEY = 'JHba0a1779bb16b46c654692a8969173da'
const URL = 'http://apis.juhe.cn/catering/query'

const User = require('../model/user')
const Restaurant = require('../model/restaurant')
const WXUtil = require('../wx/Util')

function index(req, res, next) {
	res.render('index', {})
}

function detail(req, res, next) {
	let rid = req.query.id
	res.render('detail', {})
}

function save(req, res, next) {
	let data = req.body
	res.json({
		code: 200,
		msg: 'success'
	})
}

function signature(req, res, next) {
	let url = req.body.url
	if (req.body.signature) {
		WXUtil.getJsSDKSignature(url, function(config) {
			res.json(config)
		}, this)
	}
}

// 获取周边餐厅
function getNearRestaurant(req, res, next) {
	let rid = req.query.rid

}

module.exports = {
	index: index,
	detail: detail,
	save: save,
	signature: signature
}
