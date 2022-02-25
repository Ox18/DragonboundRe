class Buffer{
    public static ArrayBufferToString(buffer: Array<any>): string{
        let data = ``;
        for(let i = 0; i < buffer.length; i++){
            let pointer = buffer[i];
            if(typeof pointer === "string"){
                data += `"${pointer}"`;
            }
            else if(typeof pointer === "number"){
                data += pointer;
            }
            else if(typeof pointer === "object"){
                data += Buffer.ArrayBufferToString(pointer);
            }
            else{
                data += pointer;
            }
            if(i < buffer.length - 1){
                data += ",";
            }
        }
        return data;
    }
}

export default Buffer;