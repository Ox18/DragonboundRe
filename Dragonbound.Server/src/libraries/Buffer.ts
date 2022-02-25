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

    public static BufferArrayToNormalArray(buffer: Array<any>): Array<any>{
        var a = new Uint8Array(buffer);
            var size = a.length;
            for (var b = 0; b < size; b++)
                a[b] ^= 165;
            var d = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength)
              , c = new TextDecoder("utf-8")
              , f = c.decode(d);

        let newArray = [];

        while(true){
            const commatize = f.indexOf(",");

            if(commatize === -1){
                newArray.push(Buffer.GuessAndConvertToData(f));
                break;
            }else{
                const lastData = f.substring(0, commatize);
                newArray.push(Buffer.GuessAndConvertToData(lastData));
                f = f.substring(commatize + 1);
            }
        }
        return newArray;
    }

    public static GuessTypeOfString(data: string): string{
        return data.indexOf("\"") !== -1 ? "string" : "number";
    }

    public static GuessAndConvertToData(data: string): any{
        return this.GuessTypeOfString(data) === "string" ? data.split("\"")[1] : parseInt(data);
    }
}

export default Buffer;