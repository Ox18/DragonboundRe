class TextUtil{
	static replace(text, params) {
		for (var key in params) {
			text = text.replace("@{" + key + "}", params[key]);
		}
		return text;
	}
}

module.exports = TextUtil;