var gulp = require('gulp');
var gutil = require('gulp-util');
var mocha = require('gulp-mocha');
var pandoc = require('gulp-pandoc');

var repl = require('repl');
var _ = require('lodash');

gulp.task('default', ['test']);

gulp.task('test', function() {
  gulp.src(['test/test.js', 'test/**/*.js'])
    .pipe(mocha({ globals: ['chai', 'expect', 'sinon', 'requireFromSrc'] }))
    .on('error', gutil.log);
});

gulp.task('docs', function() {
  gulp.src('docs/**/*.md')
    .pipe(pandoc({
      from: 'markdown',
      to: 'html5',
      ext: '.html',
      args: [
        '--smart',
        '--standalone',
        '--table-of-contents',
        '--template=./docs/template.html',
        '--css=assets/docs.css'
      ]
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('public/'));
});

gulp.task('repl', function(done) {
  var replServer = repl.start({
    prompt: '> ',
  });

  var context = {
    Effervescent: require('.')
  };

  _.merge(replServer.context, context);

  replServer.on('exit', function() {
    done();
  });
});
