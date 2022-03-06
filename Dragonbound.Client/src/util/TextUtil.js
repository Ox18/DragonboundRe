class TextUtil{
	static replace(text, params) {
		for (var key in params) {
			text = text.replace("@{" + key + "}", params[key]);
		}
		return text;
	}

	static hasSymbol(text, symbol) {
		return text.indexOf(symbol) !== -1;
	}

	static separate(text, symbol) {
		return text.split(symbol);
	}
}

module.exports = TextUtil;