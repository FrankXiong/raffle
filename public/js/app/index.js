'use strict';

var JHAPPKEY = "13e2618e902b2873f89e2f87191302e8"
var CATERING_API_ADDRESS = "http://apis.juhe.cn/catering/query"

define(['ajax', 'wx', 'wxapi', 'layer', 'api', 'storage', 'util'], function(ajax, wx, wxapi, layer, api, storage, util) {
	var $ = util.$
	var touch = util.touch

	wxapi.setup()
	wx.ready(function() {
		wxapi.getLocation(function(res) {
			alert('latitude:' + res.latitude);
		}, function(error) {
			alert('getLocation error');
		})
	})

	var data = api.result || []
	var timer = null
	var curr = {}
	var mutex = false

	var box = $('.box')[0]
	var title = $('#title')
	var play = $('#play')
	var stop = $('#stop')
	var info = $('#info')
	var go = $('#go')
	touch(play, playFunc)
	touch(stop, stopFunc)
	touch(go, goFunc)

	function playFunc(e) {
		go.style.display = 'none'
		if (data.length === 0 || !data) {
			layer.open({
				content: '附近无餐厅数据'
			})
		} else {
			util.addClass(box, 'expand')
			info.style.display = 'none'
			stop.removeAttribute('disabled')
			clearInterval(timer)
			timer = setInterval(function() {
				var random = Math.floor(Math.random() * data.length)
				curr = data[random]
				title.innerHTML = curr.name
				info.innerHTML = '<div class="address"><span class="icono-pin"></span>' + curr.address + '</div>' + '<div class="tags"><span class="icono-tag"></span>' + curr.tags + '</div>'
			}, 50)
			this.setAttribute('disabled', 'true')
		}
	}

	function stopFunc(e) {
		util.addClass(box, 'expand')
		go.style.display = 'block'
		stop.setAttribute('disabled', 'true')
		clearInterval(timer)
		info.style.display = 'block'
		play.removeAttribute('disabled')
		storage.clear()
		storage.set(curr)
	}

	function goFunc(e) {
		ajax({
			type: 'post',
			url: '/',
			data: {
				id: curr.id
			},
			success: function(res) {
				window.location.href = "/detail?rid=" + curr.id
			},
			error: function() {
				layer.open({
					content: '出了一些问题...'
				})
			}
		})
	}

	function getNearRestaurant(lng, lat, radius, fn) {
		if (!lng || !lat) {
			return
		}
		var radius = radius || 3000
		ajax({
			type: 'get',
			url: CATERING_API_ADDRESS,
			dataType: 'jsonp',
			data: {
				key: JHAPPKEY,
				lng: lng,
				lat: lat,
				radius: radius
			},
			success: fn,
			error: function(err) {
				layer.open({
					content: err
				})
			}
		})
	}

	// getNearRestaurant(121.538123, 31.677132, 3000, function(res) {
	// 	data = res.result
	// })
})
