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
            e[h] ^= 165;
        }
        f = e[0];
        if(0 == data.byteLength) throw new Error("Packet is empty");

        var packet_received = [f];

        try{
            var d = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
            , g = new TextDecoder("utf-8")
            , a = g.decode(d);        
            var k = "[" + a + "]";
            var l = JSON.stringify(k);
            var m = JSON.parse(l);
            packet_received = [...packet_received, ...m];
        }  
        catch(e){
            throw new Error("Packet is not valid");
        }

        return packet_received;
    }  
}

export default Packet;