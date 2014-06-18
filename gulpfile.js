var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var bump = require('gulp-bump');

var _ = require("lodash");
var argv = require('yargs').argv;

gulp.task('default', ['test']);
gulp.task('publish', ['publish:tag', 'publish:git', 'publish:npm']);

gulp.task('test', function() {
  gulp.src(['test/test.js', 'test/**/*.js'])
    .pipe(mocha({ globals: ['chai', 'expect', 'sinon', 'requireFromSrc'] }))
    .on('error', gutil.log);
});

gulp.task('version:bump', function() {
  gulp.src('./package.json')
    .pipe(bump({ type:  (argv.type || 'patch') }))
    .pipe(gulp.dest, './');
});

gulp.task('version:set', function() {
  if (!argv.to) {
    var pkg = require("./package.json");
    console.log("Current version: " + pkg.version);
  }
  gulp.src('./package.json')
    .pipe(bump({ version: argv.to }))
    .pipe(gulp.dest, './');
});

gulp.task('publish:npm', function(cb) {
  runCommand("npm publish", cb);
});

gulp.task('publish:tag', function(cb) {
  var pkg = require("./package.json");
  runCommand("git tag -a 'v" + pkg.version + "'", cb);
});

gulp.task('publish:git', function(cb) {
  runCommand("git push --tags", cb);
});

var runCommand = function(command, callback) {
  exec(command, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
}
