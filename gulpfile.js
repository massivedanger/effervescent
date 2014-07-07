var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');

gulp.task('default', ['test']);

gulp.task('test', function() {
  gulp.src(['test/test.js', 'test/**/*.js'])
    .pipe(mocha({ globals: ['chai', 'expect', 'sinon', 'requireFromSrc'] }))
    .on('error', gutil.log);
});
