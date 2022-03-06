import QUERY_CONST from "../consts/QUERY_CONST";

class QueryUtil{
    static getNotStrictedWords(query){
        let notStrictedWords = {};
        Object.keys(query).forEach(key => {
            if(QUERY_CONST.words_restricted.indexOf(key) === -1){
                notStrictedWords[key] = query[key];
            }
        });
        return notStrictedWords;
    }

    static fromFieldToArray(fields){
        let keys = fields.split(",");
        return keys;
    }
}

export default QueryUtil;