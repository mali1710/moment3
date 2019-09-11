const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

//Sökvägar
const files = {
  htmlPath: "src/**/*.html",
  jsPath: "src/**/*.js",
  sassPath: "src/scss/**/*.scss"
};

//HTML-filer
function copyHTML() {
  return src(files.htmlPath).pipe(dest("pub"));
}

//Sass-CSS-filer
function scssTask() {
  return src(files.sassPath)
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("pub/css"));
}

//JS-filer
function jsTask() {
  return src(files.jsPath)
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(dest("pub/js"));
}

//Watcher
function watchTask() {
  watch(
    [files.htmlPath, files.sassPath, files.jsPath],
    parallel(copyHTML, scssTask, jsTask)
  );
}

exports.default = series(parallel(copyHTML, scssTask, jsTask), watchTask);
