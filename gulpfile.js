"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");

gulp.task("concatScripts", () => {
  gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(maps.init())
    .pipe(concat("global.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", () => {
  gulp
    .src("js/global.js")
    .pipe(uglify())
    .pipe(rename("global.min.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("compileSass", () => {
  gulp
    .src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"));
});

gulp.task("default", ["hello"], () => {
  console.log("Default finished");
});
