var gulp = require("gulp");
var minify = require("gulp-minify");
var fs = require('fs');
var concat = require('gulp-concat');

function readModuleFile(path, callback) {
  try {
      var filename = require.resolve(path);
      fs.readFile(filename, 'utf8', callback);
  } catch (e) {
      callback(e);
  }
}

gulp.task("merges", ()=>{
  gulp.src([
    "src/web/public/js/jquery/jq_header.js",
    "src/web/public/js/dragonbound.js",
    "src/web/public/js/jquery/jq_footer.js"
  ])
  .pipe(concat("dragonbound-merge.js"))
  .pipe(gulp.dest("src/web/public/js"))
});

gulp.task("minify-app", function(){
  gulp.src("src/web/public/js/dragonbound-merge.js", { allowEmpty: true })
  .pipe(minify({ noSource: true }))
  .pipe(gulp.dest("./src/web/public/js"));
});

gulp.task("minify-app-to-serialized", function(){
  readModuleFile('./src/web/public/js/dragonbound-merge-min.js', function (err, words) {
    const data = JSON.stringify(words, null, 2)
    fs.writeFile('./src/web/public/js/1089276.js', data, function (err) {
      if (err) return console.log(err);
    });
    fs.unlinkSync('./src/web/public/js/dragonbound-merge-min.js')
  });
})

gulp.task("minify-client", gulp.series("minify-app", "minify-app-to-serialized"))
