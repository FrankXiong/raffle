var gulp = require('gulp'),
	watch = require('gulp-watch'),
	cssmin = require('gulp-cssmin'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer');


// .css -> .min.css
gulp.task('cssmin', function() {
	gulp.src('./src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./public'));
});

gulp.task('jsmin', function() {
	gulp.src('./src/css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./public'));
});

// live realod the browser
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './',
			index: 'index.html',
			reloadDelay: 2000
		}
	});
});


gulp.task('default', ['browser-sync'], function() {
	gulp.watch(['./public/css/*.css'], ['cssmin', browserSync.reload]);
});
