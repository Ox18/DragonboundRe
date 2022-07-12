var { readdirSync } = require("fs");
var path_main_repositories = "./src/infra/db/sequelize/repositories/";



import { Repository } from "../../src/infra/db/sequelize/lib/repository";

function getMethods(obj) {
    const methods = Object.getOwnPropertyNames(obj.prototype);
    return methods.filter(method => method !== "constructor");
}

function letterIsUppercase(letter) {
    return letter === letter.toUpperCase();
}

function convertWordWithUpperToWordSplit(word) {
    const letters = word.split('');
    let newModifiedName = '';
    letters.forEach((letter) => {
        if (letterIsUppercase(letter)) {
            newModifiedName += ` ${letter}`;
        } else {
            newModifiedName += letter;
        }
    });
    return newModifiedName;
}

function convertNameOfMethodToObj(name){
    let newModifiedName = convertWordWithUpperToWordSplit(name);
    let withSplit = newModifiedName.toLowerCase().replace(/\s+/g, '-')
    let db = "db-" + withSplit;
    let originalWithFirstLetterUppercase = name.replace(/^\w/, c => c.toUpperCase());
    let dbClassName = "Db" + originalWithFirstLetterUppercase;
    let filenameData = db + "-@";
    let filenameFactory = withSplit + "-@-factory";
    let filenameDataWithExtension = filenameData + ".js";
    let filenameFactoryWithExtension = filenameFactory + ".js";
    let repositoryProperty = "@Repository";
    let splitRepository = "@-repository";
    let makeDb = "makeDb" + originalWithFirstLetterUppercase + "@";

    return {
        original: name,
        withSplit,
        originalWithFirstLetterUppercase,
        dbClassName,
        filenameData,
        filenameFactory,
        filenameDataWithExtension,
        filenameFactoryWithExtension,
        repositoryProperty,
        splitRepository,
        makeDb
    };
}

function convertListNameOfMethodToObj(a){
    return a.map(convertNameOfMethodToObj);
}

function convertFilenameRepositoryToObj(filenameRepository){
    let split = filenameRepository.replace(".js", "");
    let withoutRepository = split.replace("-repository", "");
    let nameWithoutSplitFirstUppercase = withoutRepository.split("-").map(word => { return word.charAt(0).toUpperCase() + word.slice(1) }).join("");
    let nameWithoutSplitFirstLetterLowercase = nameWithoutSplitFirstUppercase.charAt(0).toLowerCase() + nameWithoutSplitFirstUppercase.slice(1);
    let nameWithRepositoryUppercase = nameWithoutSplitFirstUppercase + "Repository";
    let nameWithRepositoryLowercase = nameWithoutSplitFirstLetterLowercase + "Repository";

    return {
        withoutRepository,
        split,
        nameWithoutSplitFirstUppercase,
        nameWithoutSplitFirstLetterLowercase,
        nameWithRepositoryUppercase,
        nameWithRepositoryLowercase
    }
}


var methodsObjRepository = convertListNameOfMethodToObj(getMethods(Repository));

// end libs
async function readAllRepositories() {
    readdirSync(path_main_repositories).forEach(function(filename){
        const convertFilenameRepoToObj = convertFilenameRepositoryToObj(filename);
    });
}


readAllRepositories();