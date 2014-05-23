require('coffee-script/register');

var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');

var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['coffee']);

gulp.task('coffee', function() {
  gulp.src('./src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function() {
  watch({ glob: './src/**/*.coffee' }, ['coffee']);
});

gulp.task('doc', function() {
  var biscotto = require('biscotto');
  biscotto.run();
});


gulp.task('browserify', ['coffee'], function() {
  browserify({
    entries: ['./build/wintermute.js'],
    extensions: ['.js']
  })
  .bundle().on('error', gutil.log)
  .pipe(source('wintermute.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('test', function() {
   gulp.src(['test/test.coffee', 'test/**/*.coffee'])
    .pipe(mocha({
      compilers: 'coffee:coffee-script/register',
      globals: ['chai', 'expect', 'sinon']
    })).on('error', gutil.log);
});

gulp.task('clean', function() {
  gulp.src(['build', 'dist'], { read: false })
    .pipe(clean());
});

gulp.task('build', ['clean', 'test', 'coffee', 'browserify', 'doc']);
