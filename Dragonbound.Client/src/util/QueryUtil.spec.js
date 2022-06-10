import QueryUtil from "./QueryUtil";

describe("Query Util", ()=>{
    test("getNotStrictedWords", ()=>{
        let query = {
            "fields": "name,description",
            "name": "test",
            "description": "test"
        };

        let notStrictedWords = QueryUtil.getNotStrictedWords(query);

        expect(notStrictedWords).toEqual({
            "name": "test",
            "description": "test"
        });
    });

    test("from field to array", ()=>{
        let fields = "name,description";
        let keys = QueryUtil.fromFieldToArray(fields);

        expect(keys).toEqual(["name", "description"]);
    });

    test("ArrayToArrayEval", ()=>{
        const result = "['name']['description']";
        const array = ["name", "description"];
        const eval_ = QueryUtil.ArrayToArrayEval(array);

        expect(eval_).toEqual(result);
    })

    test("transformArrayToObjWithValue", ()=>{
        var obj_res = {
            person: {
                name: "John",
            }
        };

        const keys = ["person", "name"];
        const value = "John";

        const expected = QueryUtil.transformArrayToObjWithValue(keys, value);

        expect(expected).toEqual(obj_res);
    })

    test("generateObjFromObjBasedOnFields", ()=>{
        const obj = {
            name: "John",
            description: "test",
            person: {
                apodo: "Jhonny"
            }
        };

        const fields = "name,description,person.apodo";

        const expected = {
            name: "John",
            description: "test",
            person: {
                apodo: "Jhonny"
            }
        };

        const result = QueryUtil.generateObjFromObjBasedOnFields(obj, fields);
        expect(result).toEqual(expected);
    })
});