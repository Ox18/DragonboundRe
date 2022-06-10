import QUERY_CONST from "../consts/QUERY_CONST";
import TextUtil from "./TextUtil";

class QueryUtil{
    static getNotStrictedWords(query){
        let obj = {};
        Object.keys(query).filter((a) => QUERY_CONST.words_restricted.includes(a) === false).map(a => { obj[a] = query[a] });
        return obj;
    }

    static fromFieldToArray(fields){
        let keys = fields.split(",");
        return keys;
    }

    static generateObjFromObjBasedOnFields(obj, fields){
        let props = TextUtil.separate(fields, ",");
        let newObj = {};
        props.forEach(prop => {
            const isObj = TextUtil.hasSymbol(prop, ".");
            if(isObj){
                let array_keys = TextUtil.separate(prop, ".");
                let val;
                eval('val = obj' + QueryUtil.ArrayToArrayEval(array_keys));
                newObj = {
                    ...newObj,
                    ...QueryUtil.transformArrayToObjWithValue(array_keys, val)
                }
            }else{
                newObj[prop] = obj[prop];
            }
        });
        return newObj;
    }

    static transformArrayToObjWithValue(array, value){
        let newObj = {};
        array.forEach((item, index) => {
            let arr_ = QueryUtil.ArrayToArrayEval(array.slice(0, index + 1));
            eval('newObj' + arr_ + ' = {}')
            if(index === array.length - 1) eval('newObj' + arr_ + ' = value')
        });
        return newObj;
    }

    static ArrayToArrayEval(array){
        return array.map(item => `['${item}']`).join("")
    }

}

export default QueryUtil;