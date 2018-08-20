"use strict";

const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const maps = require("gulp-sourcemaps");
const del = require("del");
const cleanCSS = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const webserver = require('gulp-webserver');

// TASK1************************
gulp.task("concatScripts", () => {
  return gulp
    .src(["js/circle/autogrow.js", "js/circle/circle.js"])
    .pipe(maps.init())
    .pipe(concat("all.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("scripts", ["concatScripts"], () => {
  return gulp
    .src("js/all.js")
    .pipe(uglify())
    .pipe(rename("all.min.js"))
    .pipe(gulp.dest("dist/scripts"));
});
//********************************TASK 1 */

//TASK 2 ******************************
gulp.task("compileSass", () => {
  return gulp
    .src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write("./"))
    .pipe(gulp.dest("css"));
});

gulp.task("styles", ["compileSass"], () => {
  return gulp
    .src("css/global.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename("all.min.css"))
    .pipe(gulp.dest("dist/styles"));
});
//*************************TASK 2 */

//TASK 5 **************************
gulp.task("images", () => {
  gulp
    .src("images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/content"));
});
//*********************TASK 5 */

gulp.task("watchFiles", () => {
  gulp.watch(["sass/**/*.scss", "sass/**/*.sass"], ["compileSass"]);
  gulp.watch("js/global.js", ["concatScripts"]);
});

//TASK 6 *************************************/
gulp.task("clean", () => {
  del(["dist", "js/all.js", "css", "js/all.min.js", "js/all.js.map"]);
});
//**********TASK 6 **************************/

gulp.task("build", ['clean', 'styles', 'scripts', 'images'], () => {
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
  }
);

gulp.task("serve", ["watchFiles"]);

//WEBSERVER** PORT 3000
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 3000,
    }));
});


//DEFAULT TASK
gulp.task("default", ["clean", 'build'], () => {
  // gulp.start("build");
  gulp.start('webserver');
  gulp.start('watchFiles');
});