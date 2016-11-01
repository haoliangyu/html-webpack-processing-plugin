const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-spawn-mocha');
const runSequence = require('run-sequence');
const cache = require('gulp-cached');
const optimizejs = require('gulp-optimize-js');
const babel = require('gulp-babel');

const scripts = {
  dist: 'dist',
  src: 'src/index.js',
  test: 'test/**/*.js'
};

/**
 * Babel
 */

gulp.task('compile', () => {
  return gulp.src(scripts.src)
    .pipe(babel({
      presets: ['es2015'],
      minified: true
    }))
    .pipe(optimizejs())
    .pipe(gulp.dest(scripts.dist));
});

/**
 * Testing
 */

gulp.task('test', function() {
  return gulp.src(scripts.test)
    .pipe(mocha({
      istanbul: { report: 'none' }
    }));
});

/**
 * Linting
 */

function addLinterTask(name, path) {
  gulp.task(name, () => {
    return gulp.src(path)
      .pipe(cache('eslint', { optimizeMemory: true }))
      .pipe(eslint({
        configFile: '.eslintrc.js',
        quiet: true
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  });
}

addLinterTask('eslint-src', scripts.src);
addLinterTask('eslint-test', scripts.test);

/**
 * Watch
 */

function addWatchTask(name, path, tasks) {
  gulp.task(name, () => {
    gulp.watch(path, () => {
      runSequence.call(this, tasks);
    });
  });
}

addWatchTask('watch-src', scripts.src, ['eslint-src', 'test', 'compile']);
addWatchTask('watch-test', scripts.test, ['eslint-test', 'test']);

/**
 * Tasks
 */

gulp.task('watch', ['watch-src', 'watch-test']);
gulp.task('default', ['watch']);
