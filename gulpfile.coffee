gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
watch = require 'gulp-watch'
mocha = require 'gulp-mocha'
clean = require 'gulp-clean'

gulp.task 'default', ['coffee']

gulp.task 'coffee', ->
  gulp.src './src/**/*.coffee'
    .pipe coffee
      bare: true
    .on('error', gutil.log)
    .pipe gulp.dest('./build/')

gulp.task 'watch', ->
  watch glob: './src/**/*.coffee', ['coffee']

gulp.task 'test', ->
   gulp.src(['test/test.coffee', 'test/**/*.coffee'])
    .pipe(mocha(
      compilers: 'coffee:coffee-script/register',
      globals: ['chai', 'expect', 'sinon', 'requireFromSrc']
    )).on('error', gutil.log)

gulp.task 'clean', ->
  gulp.src ['build', 'dist'], read: false
    .pipe clean()

gulp.task 'build', ['test', 'coffee']
