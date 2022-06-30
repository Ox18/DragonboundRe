export class PacketHelper {
    static TYPES_DATA = {
        BUFFER: "Buffer",
    }

    static NUMBERS = {
        CLIENT_SERVER_DIGIT_DECRYPTION: 165,
        CLIENT_WEB_DIGIT_DECRYPTION: 219,
    }

    static EncodeArray(data) {
        return JSON.stringify(data).slice(1, -1);
    }

    static DecodeBuffer(buffer) {
        const { type, data } = buffer.toJSON();

        switch (type) {
            case PacketHelper.TYPES_DATA.BUFFER:
                return PacketHelper.Decode(data);
            default:
                throw new Error("PacketHelper is not valid");
        }
    }

    static Decode(data) {
        var c = data;
        for (var e = new Uint8Array(c), f = e.length, h = 0; h < f; h++) {
            e[h] ^= PacketHelper.NUMBERS.CLIENT_SERVER_DIGIT_DECRYPTION;
        }
        f = e[0];
        if (0 == data.byteLength) throw new Error("PacketHelper is empty");

        var PacketHelper_received = [Number(f)];

        try {
            var d = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength)
                , g = new TextDecoder("utf-8")
                , a = g.decode(d);

            let NEXT_QUOTE = a.indexOf('"');
            let next_dat = a.slice(NEXT_QUOTE, a.length);
            let next_dat_array = next_dat.split(",");
            next_dat_array.forEach((element) => {
                if (element.includes('"')) {
                    PacketHelper_received.push(String(element.replace(/"/g, '')));
                } else {
                    PacketHelper_received.push(Number(element));
                }
            })

        }
        catch (e) {

        }

        return PacketHelper_received;
    }

    static Encode(...rest) {
        if (0 != arguments.length) {
            for (var a = [], b = 0; b < arguments.length; b++)
                a.push(arguments[b]);
            a = JSON.stringify(a).slice(1, -1);
            var c = a.indexOf(",");
            -1 == c ? a = new Uint8Array([Number(a)]) : (b = Number(a.substring(0, c)),
                a = PacketHelper.StringToBuffer(a.substring(c)),
                a[0] = b);
            c = a.length;
            for (b = 0; b < c; b++)
                a[b] ^= PacketHelper.NUMBERS.CLIENT_WEB_DIGIT_DECRYPTION;
            return a;
        } else {
            throw new Error("error in PacketHelper");
        }
    }

    static StringToBuffer(a) {
        return (new TextEncoder()).encode(a)
    }
}
