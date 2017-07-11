let gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  babelify = require('babelify'),
  livereload = require('gulp-livereload');
 
gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});
 
gulp.task('build', function(){
  return browserify({ entries: './assets/js/app.js', debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .on('error', function (err) {
        console.log(err.toString());
        this.emit("end");
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./assets/build'))
    .pipe(livereload());
});


gulp.task('watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/**/*.js', ['build']);
  livereload.listen();
});

gulp.task('default', ['watch']);