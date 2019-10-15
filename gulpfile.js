const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

//Sökvägar
const files = {
  htmlPath: "src/**/*.html",
  jsPath: "src/**/*.js",
  sassPath: "src/scss/**/*.scss",
  imagePath: "src/images/*"
};

//HTML-filer
function copyHTML() {
  return src(files.htmlPath).pipe(dest("pub"));
}

//Sass-CSS-filer
function scssTask() {
  return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(dest("pub/css"));
}

//JS-filer
function jsTask() {
  return src(files.jsPath)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest("pub/js"));
}

//Bildoptimering
function imageTask() {
  return src(files.imagePath)
    .pipe(imagemin())
    .pipe(dest("pub/images"));
}

//Watcher
function watchTask() {
  watch(
    [files.htmlPath, files.sassPath, files.jsPath, files.imagePath],
    parallel(copyHTML, scssTask, jsTask, imageTask)
  );
}

exports.default = series(
  parallel(copyHTML, scssTask, jsTask, imageTask),
  watchTask
);
