// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
// const cleanCSS = require('gulp-clean-css');
// const imagemin = require('gulp-imagemin');

// // Process and minify CSS files
// gulp.task('css', function () {
//   return gulp.src('assets/css/*.css')
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('public/assets/css'));
// });

// // Process and minify JavaScript files
// gulp.task('js', function () {
//   return gulp.src('assets/js/*.js')
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest('public/assets/js'))
//     .pipe(uglify())
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('public/assets/js'));
// });

// // Optimize images
// gulp.task('images', function () {
//   return gulp.src('assets/images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('public/assets/images'));
// });

// // Build task: compile, minify, and optimize all assets
// gulp.task('build', gulp.parallel('css', 'js', 'images'));

// // Default task: runs when you just type 'gulp' in the terminal
// gulp.task('default', gulp.series('build'));



const gulp = require("gulp");
const sass = require("gulp-sass");
//import rev from "gulp-rev";
//const cssnano = require("gulp-cssnano");
const revAll = require("gulp-rev-all");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

// Minified css
function css() {
  return (
    gulp
      .src('./assets/scss/**/*.scss')
      .pipe(sass())
      .pipe(cssnano())
      .pipe(gulp.dest('./assets.css'))
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({
        cwd: "public",
        merge: true
      }))
      .pipe(gulp.dest('./public/assets'))
  );
}

// Minified javascript
function js() {
  return (
    gulp
      .src('./assets/**/*.js')
      .pipe(uglify())
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({
        cwd: "public",
        merge: true
      }))
      .pipe(gulp.dest('./public/assets'))
  );
}

// Minified images
function images() {
  return (
    gulp
      .src('./assets/**/*.(png|jpg|svg|gif|jpeg)')
      .pipe(imagemin())
      .pipe(rev())
      .pipe(gulp.dest('./public/assets'))
      .pipe(rev.manifest({
        cwd: "public",
        merge: true
      }))
      .pipe(gulp.dest('./public/assets'))
  );
}

// Whenever server will restart, all old work done by gulp will be deleted
// and it will perform all the tasks and minification again
function cleanAssets(done) {
  del.sync("./public/assets");
  done();
}

// Run all the tasks one by one
const build = gulp.series(cleanAssets, gulp.parallel(css, js, images));

exports.css = css;
exports.js = js;
exports.images = images;
exports.cleanAssets = cleanAssets;
exports.build = build;
exports.default = build;
