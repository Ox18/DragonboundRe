import { DIGIT_ENCRYPTION } from "./consts";

export class Packet {
    static DecodeBuffer(data) {
        var c = data;
        for (var e = new Uint8Array(c), f = e.length, h = 0; h < f; h++) {
            e[h] ^= DIGIT_ENCRYPTION.CLIENT_SERVER;
        }
        f = e[0];
        if (0 == data.byteLength) throw new Error("Packet is empty");

        var packet_received = [Number(f)];

        var d = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
            , g = new TextDecoder("utf-8")
            , a = g.decode(d);

        let NEXT_QUOTE = a.indexOf('"');
        let next_dat = a.slice(NEXT_QUOTE, a.length);
        let next_dat_array = next_dat.split(",");
        next_dat_array.forEach((element) => {
            if (element.includes('"')) {
                packet_received.push(String(element.replace(/"/g, '')));
            } else {
                packet_received.push(Number(element));
            }
        })

        return packet_received;
    }

    static Encode(params){
        return this.EncodeToBuffer(...params);
    }

    static EncodeToBuffer(...rest) {
        if (0 != arguments.length) {
            for (var a = [], b = 0; b < arguments.length; b++)
                a.push(arguments[b]);
            a = JSON.stringify(a).slice(1, -1);
            var c = a.indexOf(",");
            -1 == c ? a = new Uint8Array([Number(a)]) : (b = Number(a.substring(0, c)),
                a = Packet.StringToBuffer(a.substring(c)),
                a[0] = b);
            c = a.length;
            for (b = 0; b < c; b++)
                a[b] ^= DIGIT_ENCRYPTION.CLIENT_WEB;
            return a;
        } else {
            throw new Error("error in packet");
        }
    }

    static StringToBuffer(a) {
        return (new TextEncoder()).encode(a)
    }
}