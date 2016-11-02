define([], function() {
	return function(options) {
		function setData() {
			function setObjData(data, parentName) {
				function encodeData(name, value, parentName) {
					var items = [];
					name = parentName === undefined ? name : parentName + "[" + name + "]";
					if (typeof value === "object" && value !== null) {
						items = items.concat(setObjData(value, name));
					} else {
						name = encodeURIComponent(name);
						value = encodeURIComponent(value);
						items.push(name + "=" + value);
					}
					return items;
				}
				var arr = [],
					value;
				if (Object.prototype.toString.call(data) == '[object Array]') {
					for (var i = 0, len = data.length; i < len; i++) {
						value = data[i];
						arr = arr.concat(encodeData(typeof value == "object" ? i : "", value, parentName));
					}
				} else if (Object.prototype.toString.call(data) == '[object Object]') {
					for (var key in data) {
						value = data[key];
						arr = arr.concat(encodeData(key, value, parentName));
					}
				}
				return arr;
			};
			//设置字符串的遍码，字符串的格式为：a=1&b=2;
			function setStrData(data) {
				var arr = data.split("&");
				for (var i = 0, len = arr.length; i < len; i++) {
					name = encodeURIComponent(arr[i].split("=")[0]);
					value = encodeURIComponent(arr[i].split("=")[1]);
					arr[i] = name + "=" + value;
				}
				return arr;
			}

			if (data) {
				if (typeof data === "string") {
					data = setStrData(data);
				} else if (typeof data === "object") {
					data = setObjData(data);
				}
				data = data.join("&").replace("/%20/g", "+");
				//若是使用get方法或JSONP，则手动添加到URL中
				if (type === "get" || dataType === "jsonp") {
					url += url.indexOf("?") > -1 ? (url.indexOf("=") > -1 ? "&" + data : data) : "?" + data;
				}
			}
		}
		// support jsonp
		function createJsonp() {
			var script = document.createElement("script"),
				timeName = new Date().getTime() + Math.round(Math.random() * 1000),
				callback = "JSONP_" + timeName;

			window[callback] = function(data) {
				document.body.removeChild(script);
				success(data);
			}
			script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
			script.type = "text/javascript";
			document.body.appendChild(script);
		}
		// handle timeout
		function setTime() {

		}

		function createXHR() {
			var xhr
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest()
			} else {
				var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"]
				for (var i = 0; i < versions.length; i++) {
					try {
						var version = versions[i] + '.XMLHTTP'
						xhr = new ActiveXObject(version)
					} catch (e) {
						console.log(e)
					}
				}
			}
			xhr.open(type, url, async)
			if (type == 'post' && !contentType) {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
			} else if (contentType) {
				xhr.setRequestHeader('Content-Type', contentType)
			}
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						success(xhr.response)
					} else {
						error(xhr.status, xhr.statusText)
					}
				}
			}

			xhr.send(type === 'get' ? null : data)
		}

		var url = options.url || '',
			type = options.type || 'get',
			data = options.data || null,
			params = options.params || null,
			contentType = options.contentType || '', //请求头类型
			dataType = options.dataType || '', //请求类型
			success = options.success || function() {},
			error = options.error || function() {},
			async = options.async === undefined ? true : options.async //默认异步

		setData()

		if (dataType === 'jsonp') {
			createJsonp()
		} else {
			createXHR()
		}
	}
})
