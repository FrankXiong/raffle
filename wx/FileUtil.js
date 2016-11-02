'use strict'

var fs = require('fs')

module.exports = {
	readFile: function(uri) {
		return fs.readFileSync(uri, "utf8");
	},
	writeFile: function(uri, content) {
		fs.writeFileSync(uri, content, "utf8");
	}
}
