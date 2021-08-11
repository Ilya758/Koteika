const gulp = require('gulp');

module.exports = function libs() {
  return gulp.src('src/libs/**/*.*')
    .pipe(gulp.dest('build/libs'));
};
