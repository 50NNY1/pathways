const maxApi = require("max-api");
const url = require("url");
const path = require("path");

maxApi.addHandler("editor", () => {
    const filepath = path.join(__dirname, "editor", "editor.html");
    const fileurl = url.pathToFileURL(filepath);
    maxApi.outlet(["editor", fileurl]);
});

//maxApi.addHandler("rhythms", () => {
//    const filepath = path.join(__dirname, "rhythms");
//    maxApi.outlet(["rhythms", filepath]);
//});

maxApi.outlet("ready");
