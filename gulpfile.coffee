gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
watch = require 'gulp-watch'
mocha = require 'gulp-mocha'
clean = require 'gulp-clean'
bump = require 'gulp-bump'

argv = require('yargs').argv

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

gulp.task 'bump', ->
  gulp.src './package.json'
    .pipe bump type: (argv.type or 'patch')
    .pipe gulp.dest('./')

gulp.task 'version', ->
  return console.error("You must provide a version with the --to flag") unless argv.to
  gulp.src './package.json'
    .pipe bump version: argv.to
    .pipe gulp.dest('./')

gulp.task 'publish:npm', (cb) ->
  exec "npm publish", (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb err

gulp.task 'publish:tag', (cb) ->
  pkg = require "./package.json"
  exec "git tag -a 'v#{pkg.version}'", (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb err

gulp.task 'publish:git', (cb) ->
  exec "git push --tags", (err, stdout, stderr) ->
    console.log stdout
    console.log stderr
    cb err

gulp.task 'publish', ['publish:tag', 'publish:git', 'publish:npm']

gulp.task 'build', ['test', 'coffee']


