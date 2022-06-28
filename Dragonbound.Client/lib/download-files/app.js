import NFD from "nodejs-file-downloader";
import files from "./files.json";

(async () => {
    const filesDestructured = files.map(desestructureFileURL);
    try {
        await Promise.all(filesDestructured.map(async (file) => {
            const downloader = new NFD(file);
            await downloader.download();
        }))
        console.log("All done");
    } catch (ex) {
        console.log(ex);
    }
})()

function desestructureFileURL(fileURL) {

    const list = fileURL.split("/");
    const directory = generateDirectory(list);

    return {
        url: "https://dragonbound.net" + fileURL,
        directory
    }
}

function generateDirectory(items) {
    const max_index = items.length - 1;
    const initial_index = 2;
    const directory = items.slice(initial_index, max_index).join("/");
    return "./src/main/resources/public/" + directory;
}