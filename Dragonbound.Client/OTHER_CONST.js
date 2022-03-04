require("dotenv").config();
var TextUtil = require("./src/util/TextUtil");

class OTHER_CONST{
	static BUFFER_TYPE = {
		BASE_64: "base64"
	}

	static ENCRYPTED_REDIRECT_BASE = "var _='@{domain_name}';if(location.hostname.indexOf(_)==-1)location.href='@{domain_protocol}://'+_+'@{domain_top_level}'";

	static API_REDIRECT_DEVELOPTMENT = TextUtil.replace(OTHER_CONST.ENCRYPTED_REDIRECT_BASE, { domain_name: "localhost", domain_protocol: "http", domain_top_level: "/" });

	static API_REDIRECT_PRODUCTION = TextUtil.replace(OTHER_CONST.ENCRYPTED_REDIRECT_BASE, { domain_name: process.env.DOMAIN_NAME, domain_protocol: process.env.DOMAIN_PROTOCOL, domain_top_level: process.env.DOMAIN_TOP_LEVEL });

	static API_ENCRYPTED_REDIRECT_DEVELOPTMENT = Buffer.from(OTHER_CONST.API_REDIRECT_DEVELOPTMENT).toString(OTHER_CONST.BUFFER_TYPE.BASE_64);

	static API_ENCRYPTED_REDIRECT_PRODUCTION = Buffer.from(OTHER_CONST.API_REDIRECT_PRODUCTION).toString(OTHER_CONST.BUFFER_TYPE.BASE_64);

	static API_REDIRECT = process.env.NODE_ENV === "development" ? OTHER_CONST.API_ENCRYPTED_REDIRECT_DEVELOPTMENT : OTHER_CONST.API_ENCRYPTED_REDIRECT_PRODUCTION;
}

module.exports = OTHER_CONST;