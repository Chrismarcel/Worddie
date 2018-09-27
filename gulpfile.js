const gulp = require("gulp");
const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");

gulp.task("compress", () => {
  return gulp
    .src("./src/css/*.css")
    .pipe(concat("styles.min.css"))
    .pipe(minifyCSS())
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task("watch", () => {
  gulp.watch("./src/css/*.css", ["compress"]);
});
