var gulp = require("gulp");
var minify = require("gulp-minify");
var fs = require('fs');

function readModuleFile(path, callback) {
  try {
      var filename = require.resolve(path);
      fs.readFile(filename, 'utf8', callback);
  } catch (e) {
      callback(e);
  }
}

gulp.task("minify-app", function(){
  gulp.src("src/web/public/js/main.js", { allowEmpty: true })
  .pipe(minify({ noSource: true }))
  .pipe(gulp.dest("./src/web/public/js"));
});

gulp.task("minify-app-to-serialized", function(){
  readModuleFile('./src/web/public/js/main-min.js', function (err, words) {
    const data = JSON.stringify(words, null, 2)
    fs.writeFile('./src/web/public/js/1089276.js', data, function (err) {
      if (err) return console.log(err);
    });
  });
})

gulp.task("minify-client", gulp.series("minify-app", "minify-app-to-serialized"))