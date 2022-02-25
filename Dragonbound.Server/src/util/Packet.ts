class Packet{
    public static TYPES = {
        STRING: "string",
        NUMBER: "number",
        OBJECT: "object",
    }

    public static TYPES_DATA = {
        BUFFER: "Buffer",
    }

    public static ArrayToString(buffer: Array<any>): string{
        let data = ``;
        for(let i = 0; i < buffer.length; i++){
            let pointer = buffer[i];
            if(typeof pointer === Packet.TYPES.STRING){
                data += `"${pointer}"`;
            }
            else if(typeof pointer === Packet.TYPES.NUMBER){
                data += pointer;
            }
            else if(typeof pointer === Packet.TYPES.OBJECT){
                data += this.ArrayToString(pointer);
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

    public static DecodeBuffer(buffer: any): Array<any>{
        const { type, data } = buffer.toJSON();
        switch(type){
            case Packet.TYPES_DATA.BUFFER:
                return Packet.BufferToArray(data);
            default:
                throw new Error(`Unknown type: ${type}`);
        }
    }

    public static BufferToArray(buffer: Array<any>): Array<String | Number>{
        var a = new Uint8Array(buffer);
            var size = a.length;
            for (var b = 0; b < size; b++)
                a[b] ^= 165;
            var d = a.buffer.slice(a.byteOffset, a.byteOffset + a.byteLength)
              , c = new TextDecoder("utf-8")
              , f = c.decode(d);
        const stringOriginal = JSON.stringify(f);
        const removedFirstLetter = stringOriginal.substring(1, stringOriginal.length - 1);
        let array = [];

        // capture number
        let NEXT_QUOTE_POSITION = removedFirstLetter.indexOf(`"`);
        let SVG_CODE = removedFirstLetter.substring(0, NEXT_QUOTE_POSITION);

        SVG_CODE = SVG_CODE.replace(/\\/g, "");
        array.push(Packet.DecodeNumber(SVG_CODE));

        while(true){
            let NEXT_COMMA_POSITION = f.indexOf(",");
            if(NEXT_COMMA_POSITION === -1){
                array.push(this.GuessAndConvertToDataBufferString(f));
                break;
            }else{
                let nextData = f.substring(0, NEXT_COMMA_POSITION);
                array.push(this.GuessAndConvertToDataBufferString(nextData));
                f = f.substring(NEXT_COMMA_POSITION + 1);
            }
        }
        return array;
    }

    public static GuessAndConvertToDataBufferString(data: string): String | Number{
        return this.GuessTypeOfBufferString(data) === this.TYPES.STRING ? data.split("\"")[1] : parseInt(data);
    }

    public static GuessTypeOfBufferString(data: string): String{
        return data.indexOf("\"") !== -1 ? this.TYPES.STRING : this.TYPES.NUMBER;
    }

    public static DecodeNumber(data: string): number{
        return parseInt(data.replace("u", "0x"), 16);
    }
}

export default Packet;