const gulp =require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
 
gulp.task('minify-js',function(){
	return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});
gulp.task('minify-css',function(){
	return gulp.src('styles/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/css'));
});