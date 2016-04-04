var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});


var paths = {
     javascript: [
         './src/**/*.js',
         '!./www/js/app.js',
         '!./www/lib/**'
     ],
     css: [
         './src/**/*.css',
         '!./www/css/ionic.app*.css',
         '!./www/lib/**'
     ]
 };

  gulp.task('index', function(){
     return gulp.src('./www/index.html')
         .pipe(inject(
             gulp.src(paths.javascript,
                 {read: false}), {relative: true}))
         .pipe(gulp.dest('./www'))
         .pipe(inject(
             gulp.src(paths.css,
             {read: false}), {relative: true}))
         .pipe(gulp.dest('./www'));
 });
