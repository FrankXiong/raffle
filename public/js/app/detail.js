define(['template', 'storage', 'util', 'layer'], function(template, storage, util, layer) {
	var data = storage.get()
	var $ = window.$ = util.$
	var type = util.type
	if (!data) {
		$('#info').innerHTML = '无数据'
		$('#info').style.display = 'block'
	} else {
		var photosUrl = data.photos.replace('/\+/g', '')
		var stars = Math.floor(data.stars) || 4
		var navs = data.navigation.split('>>').map(function(i) {
			return '<span class="">' + i + '</span><span class="icono-rightArrow"></span>'
		}).join('')
		var pathDom = ''
		var banner = '<div class="banner" style="background-image:url(' + photosUrl + ');background-size:cover"></div>'
		var sec_a = '<div class="sec"><div class="row rest-info"><h1 class="name">' + data.name + '</h1> <div class="rating"> <span class="score"> <span class="stars"> <i class="text-icon icon-star"></i> <i class="text-icon icon-star"></i> <i class="text-icon icon-star"></i> <i class="text-icon icon-star"></i> <i class="text-icon icon-star"></i> <span class="star-text">' + data.stars + '</span> </span> </span> <span class="avg-price">人均:￥' + data.avg_price + '</span> </div> <div class="tags"><span class="tag">' + data.tags + '</span></div></div> <div class="row contact"><div class="left"><span class="icono-pin"></span><h6 class="address">' + data.address + '</h6> </div><div class="right"> <a data-com="phonecall" data-tele="" class="icon-phone"> <i class="text-icon">✆</i> </a> </div> </div> </div>'
		var sec_b = '<div class="sec"> <div class="row"> <p>路线</p><div class="navigation">' + navs + '</div> </div> </div>'
		$('.container')[0].innerHTML = banner + sec_a + sec_b
		for (var i = 0; i < stars; i++) {
			var dom = $('.icon-star')[i]
			util.addClass(dom, 'active')
		}
	}

	util.touch($('.icon-phone')[0], function() {
		layer.open({
			content: '拨打商家电话:  ' + data.phone,
			btn: ['呼叫', '取消'],
			skin: 'footer',
			yes: function(index) {
				var tel = document.createElement('a')
				tel.href = 'tel:' + data.phone
				tel.click()
				tel = null
			}
		});
	})

})
