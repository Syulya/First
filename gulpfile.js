var pug = require('gulp-pug');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var watch = require('gulp-watch');

var path = {
	src: {
		pug: './src/*.pug',
		scss: './src/css/*.scss'
	},
	build: {
		html:'./build/html/',
		css:'./build/css/'
	},
	watch: {
		pug: './src/*.pug',
		scss: './src/css/*.scss'
	}
}
var server = {
	server: {
			baseDir: "./build/"
	}
}

gulp.task('html', function(){
	gulp.src(path.src.pug)
		.pipe(pug({
			pretty:true
		}))
		.pipe(gulp.dest(path.build.html))
		.on('end', browserSync.reload);
})
gulp.task('webserver', function(){
	browserSync(server);
});

gulp.task('sass', function(){
	gulp.src(path.src.scss)
	//return gulp.src('src/css/main.scss')
		.pipe(sass({
			pretty:true
		}))
		.pipe(gulp.dest(path.build.css))
		//.pipe(gulp.dest('build/css'))
		.on('end', browserSync.reload);
})

gulp.task('watch', function(){
	//gulp.watch(path.watch.pug, ['html']);
	watch([path.watch.pug, path.watch.scss], function(event, cb){
		gulp.start('html','sass');
	});
});


gulp.task('default', ['html', 'watch', 'webserver'])