import 'module-alias/register'

(async function IIE() {
	const { setupApp } = await import("./config/app");
	const app = await setupApp();
	app.listen(3000, () => {
		console.log("Server is running on port 3000");
	});
})();
