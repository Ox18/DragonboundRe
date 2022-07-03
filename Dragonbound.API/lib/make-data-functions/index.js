
var dir = "./lib/make-data-functions/";

const functionList = require("./functionList.json");

const methodsName = ["find-all", "find-by-where", "create", "find-all", "delete", "update"];

functionList.forEach((functionItem) => {
    let newItemData = {};
    const realMethods = functionItem?.aditionalFunctions ? functionItem.aditionalFunctions : [];
    [...methodsName, ...realMethods].forEach((methodName) => {
        // start
        newItemData[methodName] = {};

        newItemData[methodName].filename = `db-${methodName}-${functionItem.name}`;
        newItemData[methodName].originalName = functionItem.name;
        newItemData[methodName].methodName = methodName;
        newItemData[methodName].repositoryName = functionItem.name.charAt(0).toUpperCase() + functionItem.name.slice(1) + "Repository";
        newItemData[methodName].classNameConverted = newItemData[methodName].filename.split("-").map((item) => { return item.charAt(0).toUpperCase() + item.slice(1); }).join("");
        let lastMethodName = newItemData[methodName].methodName.split("-").map((item) => { return item.charAt(0).toUpperCase() + item.slice(1); }).join("");
        newItemData[methodName].classMethodName = lastMethodName.charAt(0).toLowerCase() + lastMethodName.slice(1);
        newItemData[methodName].body = `export class ${newItemData[methodName].classNameConverted} {
    constructor(
        repository
    ) {
        this.repository = repository;
    }   

    async ${newItemData[methodName].classMethodName}() {
        const response = await this.repository.${newItemData[methodName].classMethodName}(...arguments);
        return response;
    }
};`;

    let obj = newItemData[methodName];
    obj.factoryFilename = obj.methodName + "-" + obj.originalName + "-factory";

    obj.bodyFactory = `import { ${obj.classNameConverted} } from "../../../data/usecases/${obj.filename}";
    import { ${obj.repositoryName} } from "@infra/db/sequelize/repositories/${obj.originalName}-repository";
    
    export const make${obj.classNameConverted} = () => {
        return new ${obj.classNameConverted}(new ${obj.repositoryName}());
    }`;

    require("fs")
    .writeFileSync(`./src/data/usecases/${newItemData[methodName].filename}.js`, newItemData[methodName].body);


    require("fs")
    .writeFileSync(`./src/main/factories/usecases/${obj.factoryFilename}.js`, obj.bodyFactory);

        // end
    });

})


