function sendTextToMax(text) {
    if (window.max) {
        if (text) {
            window.max.outlet.apply(window.max, ["text", text]);
        } else {
            window.max.outlet("text");
        }
    }
}

const myCodeMirror = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'text.html',
    lineWrapping: true,
    theme: "darcula",
    indentWithTabs: true,
    lineNumbers: true,
    tabSize: 2
});
myCodeMirror.setSize("250,150");
window.cm = myCodeMirror;

if (window.max) {
    window.max.bindInlet("text", (text) => {
        if (myCodeMirror) {
            myCodeMirror.setValue(text);
        }
    });

    //    window.max.bindInlet("mark", (line, col, token, message) => {
    //        if (myCodeMirror) {
    //            // If there's a token, mark it
    //            if (token) {
    //                const parsedToken = (token === "##comma##" ? "," : token);
    //                myCodeMirror.markText({ line, ch: col }, { line, ch: col + parsedToken.length }, { className: "errortext" });
    //            }

    //            // Otherwise mark the whole line
    //            else {
    //                const lineText = myCodeMirror.getLine(line);
    //                myCodeMirror.markText({ line, ch: 0 }, { line, ch: lineText.length }, { className: "errortext" });
    //            }
    //        }
    //    });
    //}
    myCodeMirror.on("change", () => {
        const text = myCodeMirror.getValue();
        if (text) {
            sendTextToMax(text);
        } else {
            sendTextToMax(null);
        }
    });
    myCodeMirror.on("keydown", (_instance, event) => {
        if (event.shiftKey && event.key === "Enter") {
            var cursorPos = cm.getCursor().line;
            var selectedText = cm.getLine(cursorPos);
            //const selectedText = myCodeMirror.getLine(cursorPos[0]);
            const lineCount = myCodeMirror.lineCount();
            if (window.max) {
                window.max.outlet.apply(window.max, ["submit"]);
                window.max.outlet.apply(window.max, ["lineCount", lineCount]);
                window.max.outlet.apply(window.max, ["cursorPosition", cursorPos]);
                window.max.outlet.apply(window.max, ["selectedText", selectedText]);
            }
            event.preventDefault();
        }
    });
}
