var gulp = require('gulp');
var watchLess = require('gulp-watch-less');
var less = require('gulp-less');

var destination = 'dist';
 
gulp.task('default', ['watch']);

gulp.task('watch', function() {
    gulp.watch('style.less', ['styles']);
    gulp.watch('index.html', ['html']);
    gulp.watch('*.js', ['js']);
});

gulp.task('styles', function () {
    gulp.src('style.less')
        .pipe(watchLess('style.less'))
        .pipe(less())
        .pipe(gulp.dest(destination));
    gulp.src('fonts/*')
        .pipe(gulp.dest(destination + '/fonts'));
    gulp.src('images/*')
        .pipe(gulp.dest(destination + '/images'));
});

gulp.task('html', function() {
    gulp.src('index.html')
    .pipe(gulp.dest(destination));
});

gulp.task('js', function() {
    gulp.src([
        '*.js',
        './node_modules/d3/build/d3.min.js',
        './node_modules/d3-selection-multi/build/d3-selection-multi.min.js'])
    .pipe(gulp.dest(destination));
});