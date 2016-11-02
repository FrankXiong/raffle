define(function() {
	return {
		get: function() {
			var data = {}
			for (var i = 0, len = localStorage.length; i < len; i++) {
				var name = localStorage.key(i)
				var value = localStorage.getItem(name)
				data[name] = value
			}
			return data
		},
		set: function(o) {
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					localStorage.setItem(i, o[i])
				}
			}
		},
		clear: function() {
			localStorage.clear()
		}
	}
})
