"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const del = require("del");
const cleanCSS = require('gulp-clean-css');

gulp.task("concatScripts", () => {
  return gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(maps.init())
    .pipe(concat("global.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], () => {
  return gulp
    .src("js/global.js")
    .pipe(uglify())
    .pipe(rename("global.min.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("compileSass", () => {
  return gulp
    .src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"));
});

gulp.task("minifyCss", ["compileSass"], () => {
   return gulp
     .src("css/global.css")
     .pipe(cleanCSS({compatibility: 'ie8'}))
     .pipe(rename("global.min.css"))
     .pipe(gulp.dest("css"));
 });

gulp.task("watchFiles", () => {
  gulp.watch(["sass/**/*.scss", "sass/**/*.sass"], ["compileSass"]);
  gulp.watch("js/global.js", ["concatScripts"]);
});

gulp.task("clean", () => {
  del(["dist", "js/global.js", "css", "js/global.min.js", "js/global.js.map"]);
});

gulp.task("build", ["minifyScripts", "minifyCss"], () => {
  return gulp
    .src(
      [
        "css/global.min.css",
        "js/global.min.js",
        "index.html",
        "images/**",
        "icons/**",
        "sass/**"
      ],
      { base: "./" }
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("serve", ["watchFiles"]);

gulp.task("default", ["clean"], () => {
  gulp.start("build");
});
