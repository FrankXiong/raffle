define(['ajax', 'wx'], function(ajax, wx) {
	return {
		setup: function(ready) {
			this.getJsSDKSignature(function(data) {
				var data = JSON.parse(data)
				wx.config({
					debug: false,
					appId: data.appId,
					timestamp: data.timestamp,
					nonceStr: data.nonceStr,
					signature: data.signature,
					jsApiList: ['checkJsApi', 'getLocation']
				})
			})
		},
		getJsSDKSignature: function(success, error) {
			var pageUrl = location.href.split('#')[0]
			ajax({
				type: 'post',
				url: '/wx/signature',
				async: 'false',
				data: {
					signature: true,
					url: pageUrl
				},
				success: success,
				error: error
			})
		},
		getLocation: function(success, error) {
			wx.getLocation({
				type: 'wgs84',
				success: success,
				error: error
			});
		}
	}
})
