require("dotenv").config();
var gulp = require("gulp");
var { exec } = require('child_process');
var minify = require("gulp-minify");
var fs = require('fs');
var OTHER_CONST = require("./OTHER_CONST");

var FILE_NUMBER = process.env.DRAGONBOUND_FILE_VERSION;
var PATH_DEST = "src/main/resources/public/js";
var PATH_DRAGONBOUND = PATH_DEST + "/dragonbound.js";
var PATH_BUILD = PATH_DEST + "/" + FILE_NUMBER + ".js";
var PATH_BUILD_MIN = PATH_DEST + "/" + FILE_NUMBER + "-min.js";
var PATH_JQUERY = PATH_DEST + "/jquery/jquery.js";

gulp.task("reversesheet", function(done){
  try{
    const JQUERY_TEXT = fs.readFileSync(PATH_JQUERY, 'utf8');
    const DRAGONBOUND_TEXT = fs.readFileSync(PATH_DRAGONBOUND, 'utf8');
    let MERGE_TEXT = JQUERY_TEXT.replace("{@body}", DRAGONBOUND_TEXT);
        MERGE_TEXT = MERGE_TEXT.replace("@{API_REDIRECT}", OTHER_CONST.API_REDIRECT);
        MERGE_TEXT = MERGE_TEXT.replace("@{FACEBOOK_APP_ID}", process.env.FACEBOOK_APP_ID)
    fs.writeFileSync(PATH_BUILD, MERGE_TEXT);
    exec("gulp minified");
  }catch(ex){
    console.log(ex);
  }finally{
    done();
  }
});

gulp.task("minified", function(done){
  const stream = gulp.src(PATH_BUILD, { allowEmpty: true })
  .pipe(minify({ noSource: true }))
  .pipe(gulp.dest(PATH_DEST));
  stream.on("end", function(){
    const MERGE_TEXT = fs.readFileSync(PATH_BUILD_MIN, "utf8");
    const MERGE_JSON = JSON.stringify(MERGE_TEXT, null, 2);
    fs.writeFileSync(PATH_BUILD, MERGE_JSON);
    fs.unlinkSync(PATH_BUILD_MIN);
  })
  done();
});


gulp.task("default", function(done){
  exec("gulp reversesheet")
  done();
})