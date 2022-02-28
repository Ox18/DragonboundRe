var gulp = require("gulp");
var { exec } = require('child_process');
var minify = require("gulp-minify");
var fs = require('fs');

// ENVIRONMENTS
var FILE_NUMBER = 1089276;

var from = "src/web/public/js/jquery/jquery.js";
var dest = "src/web/public/js";

gulp.task("reversesheet", function(done){
  try{
    const wordFather = fs.readFileSync(from, 'utf8');
    const wordChildren = fs.readFileSync(dest + "/dragonbound.js", 'utf8');
    const word = wordFather.replace("{@body}", wordChildren);
    fs.writeFileSync(dest + "/" + FILE_NUMBER + ".js", word);
    exec("gulp minified");
  }catch(ex){
    console.log(ex);
  }finally{
    done();
  }
});

gulp.task("minified", function(done){
  const stream = gulp.src("src/web/public/js/" + FILE_NUMBER + ".js", { allowEmpty: true })
  .pipe(minify({ noSource: true }))
  .pipe(gulp.dest("./src/web/public/js"));
  stream.on("end", function(){
    const wordMerge = fs.readFileSync(dest + "/" + FILE_NUMBER + "-min.js", "utf8");
    const wordJSON = JSON.stringify(wordMerge, null, 2);
    fs.writeFileSync(dest + "/" + FILE_NUMBER + ".js", wordJSON);
    fs.unlinkSync(dest + "/" + FILE_NUMBER + "-min.js");
  })
  done();
});


gulp.task("default", function(done){
  exec("gulp reversesheet")
  done();
})