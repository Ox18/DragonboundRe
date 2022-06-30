const gulp = require("gulp"),
    minify = require("gulp-minify"),
    fs = require("fs"),
    { exec } = require('child_process');


const variables = {
    "API_KEY": "wilmer_api_redirect",
    "FACEBOOK_APP_ID": "wilmer_facebook_app_id",
    "VERSION": 133
};

async function getFileToString(path) {
    const text = await fs.promises.readFile(path, "utf8");
    return text;
}

async function saveFile(path, text) {
    await fs.promises.writeFile(path, text, "utf8");
}

function convertKeyToSecret(key) {
    return '@{' + key + '}';
}

gulp.task("minify", (done) => {
    console.log("minified");
    done();
})

gulp.task("default", async (done) => {
    const dragonbound_file_text = await getFileToString("./files/dragonbound.js");
    const jquery_file_text = await getFileToString("./files/jquery.js");

    const secrets = Object.keys(variables).map(key => ({
        key,
        value: variables[key],
        secret: convertKeyToSecret(key),
    }));

    var dragonbound_file_variables = dragonbound_file_text;

    secrets.forEach(function (secret) {
        dragonbound_file_variables = dragonbound_file_variables.replace(secret.secret, secret.value);
    });

    const new_file_dragonbound_text = jquery_file_text.replace("@{body}", dragonbound_file_variables);

    await saveFile("./files/secret-dragonbound.js", new_file_dragonbound_text);

    const stream = gulp.src("./files/secret-dragonbound.js", { allowEmpty: true })
        .pipe(minify({ noSource: true }))
        .pipe(gulp.dest("./files"));
    stream.on("end", function () {
        const MERGE_TEXT = fs.readFileSync("./files/secret-dragonbound-min.js", "utf8");
        const MERGE_JSON = JSON.stringify(MERGE_TEXT, null, 2);
        fs.writeFileSync("./files/secret-dragonbound.js", MERGE_JSON);
        fs.unlinkSync("./files/secret-dragonbound-min.js");
    }
    )
    done();
})