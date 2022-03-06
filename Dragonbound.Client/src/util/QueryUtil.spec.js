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
});