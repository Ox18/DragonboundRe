/**
 * @author lnferno / Alex
 * @email xander.scorpio@gmail.com
 * @create date 2022-02-25 16:25:02
 * @modify date 2022-02-26 22:09:29
 * @desc Reverse-engineered code to decode data brought in from the client
 */

 function BufferToString(a: any) {
    a instanceof ArrayBuffer && (a = new Uint8Array(a));
    return (new TextDecoder("utf-8")).decode(a)
}

class Packet{
    public static TYPES_DATA = {
        BUFFER: "Buffer",
    }

    public static NUMBERS = {
        CLIENT_SERVER_DIGIT_DECRYPTION: 165,
        CLIENT_WEB_DIGIT_DECRYPTION: 219,
    }

    public static EncodeArray(data: Array<any>): string{
        return JSON.stringify(data).slice(1, -1);
    }

    public static DecodeBuffer(buffer: any): Array<any>{
        const { type, data } = buffer.toJSON();

        switch(type){
            case Packet.TYPES_DATA.BUFFER:
                return Packet.Decode(data);
            default:
                throw new Error("Packet is not valid");
        }
    }

    public static Decode(data: Uint8Array): Array<any>{
        var c = data;
        for(var e = new Uint8Array(c), f = e.length, h = 0; h < f; h++) {
            e[h] ^= Packet.NUMBERS.CLIENT_SERVER_DIGIT_DECRYPTION;
        }
        f = e[0];
        if(0 == data.byteLength) throw new Error("Packet is empty");

        var packet_received:Array<any> = [Number(f)];

        try{
            var d = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
            , g = new TextDecoder("utf-8")
            , a = g.decode(d);    

            let NEXT_QUOTE = a.indexOf('"');
            let next_dat = a.slice(NEXT_QUOTE, a.length);
            let next_dat_array: Array<string> = next_dat.split(",");
            next_dat_array.forEach((element: string) => {
                if(element.includes('"')){
                    packet_received.push(String(element.replace(/"/g, '')));
                }else{
                    packet_received.push(Number(element));
                }
            })

        }  
        catch(e){
            
        }

        return packet_received;
    }  
}

export default Packet;