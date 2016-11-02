define(function() {
	return {
		$: function(s) {
			if (s.indexOf('#') > -1) {
				return document.querySelectorAll(s)[0]
			} else {
				return document.querySelectorAll(s)
			}
		},
		type: function(i) {
			return Object.prototype.toString.call(i).slice(7, this.length - 1)
		},
		touch: function(el, fn) {
			el.addEventListener('click', function(e) {
				fn.call(this, e)
			}, false)
		},
		addClass: function(el, cls) {
			var oldCls = el.className
			if (oldCls.indexOf(cls) > -1) {
				return el
			}
			if (this.type(cls) === 'Array') {
				var newCls = ' ' + cls.join(' ')
				el.className = oldCls + newCls
			} else {
				el.className = oldCls + ' ' + cls
			}
			return el
		},
		hasClass: function(el, cls) {
			if (el.className.indexOf(cls) > -1) {
				return true
			} else {
				return false
			}
		},
		removeClass: function(el, cls) {
			var oldCls = el.className
			if (oldCls.indexOf(cls) === -1) {
				return el
			} else {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
				el.className = el.className.replace(reg, ' ')
			}
			return el
		},
		toggleClass: function(el, cls) {
			if (this.hasClass(el, cls)) {
				this.removeClass(el, cls)
			} else {
				this.addClass(el, cls)
			}
		}
	}
})
