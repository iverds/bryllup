var gulp        = require('gulp')
, less          = require('gulp-less')
, autoprefixer  = require('gulp-autoprefixer')
, path          = require('path');

gulp.task('compile-less', function () {
  gulp.src('./public/stylesheets/less/app.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .on('error', function(err){ console.log(err.message); })
  .pipe(autoprefixer())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('watch-less', function() {
  gulp.watch('./public/stylesheets/less/**/*.less', ['compile-less'])
})


gulp.task('default', ['watch-less']);
