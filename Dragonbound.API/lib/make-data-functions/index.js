
var bodyFile = "GAA soy un archivo";
var dir = "./lib/make-data-functions/functions";



const functionList = [
    {
        name: "account",
    },
    {
        name: "avatar"
    },
    {
        name: "guild-members"
    },
    {
        name: "guild"
    },
    {
        name: "server",
        aditionalFunctions: ["find-all-array"]
    },
    {
        name: "user-avatar-equipped"
    },
    {
        name: "user-avatars"
    },
    {
        name: "user-events"
    },
    {
        name: "user-prix"
    },
    {
        name: "user-relationship"
    },
    {
        name: "user"
    }
];

const methodsName = ["find-all", "find-by-where", "create", "find-all", "delete", "update"];

const items = [];

functionList.forEach((functionItem)=>{
    let newItemData = {};
    const realMethods = functionItem?.aditionalFunctions ? functionItem.aditionalFunctions : [];
    [...methodsName, ...realMethods].forEach((methodName)=>{
        // start
        newItemData[methodName] = {};

        newItemData[methodName].filename = `db-${methodName}-${functionItem.name}`;
        newItemData[methodName].originalName = functionItem.name;
        newItemData[methodName].methodName = methodName;
        newItemData[methodName].classNameConverted = newItemData[methodName].filename.split("-").map((item)=>{ return item.charAt(0).toUpperCase() + item.slice(1); }).join("");
        let lastMethodName = newItemData[methodName].methodName.split("-").map((item)=>{ return item.charAt(0).toUpperCase() + item.slice(1); }).join("");
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
}
        
        `;
        console.log(newItemData[methodName]);
        require("fs")
            .writeFileSync(`${dir}/${newItemData[methodName].filename}.js`, newItemData[methodName].body);
        // end
    });

})


