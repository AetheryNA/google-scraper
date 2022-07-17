import { src, dest, watch, series } from 'gulp';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cleanCSS = require('gulp-clean-css');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('./src/public/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./src/public'));
}

function minifyCSS() {
  return src('./src/public/styles/*.css')
    .pipe(cleanCSS())
    .pipe(dest('dist/public'));
}

exports.buildStyles = buildStyles;
exports.minifyCSS = minifyCSS;
exports.watch = function () {
  watch('./src/public/**/*.scss');
};

exports.default = series(buildStyles, minifyCSS);
