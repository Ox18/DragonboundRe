require("dotenv").config();
var TextUtil = require("./src/util/TextUtil");

class OTHER_CONST{
	static BUFFER_TYPE = {
		BASE_64: "base64"
	}

	static ENCRYPTED_REDIRECT_BASE = "var _='@{domain_name}';if(location.hostname.indexOf(_)==-1)location.href='@{domain_protocol}://'+_+'@{domain_top_level}'";

	static ENCRYPTED_REDIRECT_DEVELOPTMENT = TextUtil.replace(OTHER_CONST.ENCRYPTED_REDIRECT_BASE, { domain_name: "localhost", domain_protocol: "http", domain_top_level: "/" });

	static ENCRYPTED_REDIRECT_PRODUCTION = TextUtil.replace(OTHER_CONST.ENCRYPTED_REDIRECT_BASE, { domain_name: process.env.DOMAIN_NAME, domain_protocol: process.env.DOMAIN_PROTOCOL, domain_top_level: process.env.DOMAIN_TOP_LEVEL });
}

module.exports = OTHER_CONST;