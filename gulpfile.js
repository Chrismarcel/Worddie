const gulp = require("gulp");
const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const uglify = require("gulp-terser");

gulp.task("compress-css", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(concat("styles.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task("compress-js", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("watch", () => {
  gulp.watch("./src/css/*.css", ["compress-css"]);
  gulp.watch("./src/js/*.js", ["compress-js"]);
});
