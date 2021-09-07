var editor = document.getElementById("editor");
var suggestions = document.getElementById("suggestions");
var mode = document.getElementById("mode");
var keys = [];
var fullforms = [];
var db = openDatabase("shortHandsDB", "1.0", "", 2*1024*1024);
db.transaction((transaction) => {
    var query = "SELECT * FROM Shorthands;";
    transaction.executeSql(query, undefined, (transaction, results) => {
        for(var i=0; i<results.rows.length; i++) {
            keys.push(results.rows.item(i).key.toLowerCase());
            fullforms.push(results.rows.item(i).fullform);
        }
    });
});

const arr = ["Meta", "Control", "Shift", "Alt", "CapsLock", "PageUp", "PageDown", "Unidentified", "Tab", "Escape", "End", "Home"];
function abc(event) {
    var selection = window.getSelection();
    var index = selection.focusOffset;
    var currentNode = selection.anchorNode;
    var str = currentNode.textContent.substr(0, index-1);
    var words = str.split(" ");
    suggestions.innerHTML = "";
    if(event.key === " ") {
        if(keys && fullforms && mode.value !== "2") {
            if(keys.includes(words[words.length-1].toLowerCase())) {
                var fullForm = fullforms[keys.indexOf(words[words.length-1].toLowerCase())];
                if(words[words.length-1][0].toLowerCase() !== words[words.length-1][0]) {
                    fullForm = fullForm.charAt(0).toUpperCase()+fullForm.slice(1);
                } 
                currentNode.textContent = currentNode.textContent.replace(words[words.length-1], fullForm);
                setCursorPosition(currentNode.textContent.length, currentNode);
            }
        }
        if(mode.value === "2") {            
            var url = "/request?word="+words[words.length-1];
            fetch(url)
            .then(response => response.json())
            .then(substituteWord => {
                words[words.length-1] = substituteWord[0];
                var substituteWordsArray = words.join(" ");
                substituteWordsArray += " ";
                currentNode.textContent = currentNode.textContent.replace(str, substituteWordsArray);
                setCursorPosition(substituteWordsArray.length, selection.anchorNode);
                for(var i=0; i<substituteWord.length && i<12; i++) {
                    var wordSuggestion = document.createElement("div");
                    wordSuggestion.classList.add("word-suggestion");
                    wordSuggestion.innerText = substituteWord[i];
                    wordSuggestion.addEventListener("click", (event) => {
                        words[words.length-1] = event.target.innerText;
                        var newSubstituteWordsArray = words.join(" ");
                        newSubstituteWordsArray += " ";
                        currentNode.textContent = currentNode.textContent.replace(substituteWordsArray, newSubstituteWordsArray);
                        substituteWordsArray = newSubstituteWordsArray;
                        setCursorPosition(newSubstituteWordsArray.length, currentNode);
                    });
                    suggestions.appendChild(wordSuggestion);
                }
            }).catch(err => console.log(err));
        }
    }
}

function setCursorPosition(pos, element) {
    var rangeObj = document.createRange();
    var selectionObj = window.getSelection();
    rangeObj.setStart(element, pos);
    rangeObj.collapse(true);
    selectionObj.removeAllRanges();
    selectionObj.addRange(rangeObj);
}

function download() {
    const a = document.createElement("a");
    a.href = "data:attachment/text,"+encodeURI(editor.innerText);
    a.download = "testFile.txt";
    a.click();
}

function print() {
    var printWindow = window.open();
    printWindow.document.title = "Easy Typing Print";
    printWindow.document.write("<html><head><title>Easy Typing Print</title></head><body style='padding: 20px'>"+editor.innerHTML+"</body></html>");
    printWindow.document.close();
    printWindow.print();
}

editor.addEventListener("keyup", abc);

document.querySelector(".bold").addEventListener("click", () => {
    document.execCommand("bold", true);
});

document.querySelector(".italic").addEventListener("click", () => {
    document.execCommand("italic", true);
});

document.querySelector(".underline").addEventListener("click", () => {
    document.execCommand("underline", true);
});

document.getElementById("color").addEventListener("change", (event) => {
    document.execCommand("foreColor", true, event.target.value);
});

document.getElementById("background-color").addEventListener("change", (event) => {
    document.execCommand("hiliteColor", true, event.target.value);
});

document.querySelector(".align-left").addEventListener("click", () => {
    document.execCommand("justifyLeft", true);
});

document.querySelector(".align-center").addEventListener("click", () => {
    document.execCommand("justifyCenter", true);
});

document.querySelector(".align-right").addEventListener("click", () => {
    document.execCommand("justifyRight", true);
});

document.querySelector(".align-justify").addEventListener("click", () => {
    document.execCommand("justifyFull", true);
});

document.querySelector(".numbered-list").addEventListener("click", () => {
    document.execCommand("insertOrderedList", true);
});

document.querySelector(".list").addEventListener("click", () => {
    document.execCommand("insertUnorderedList", true);
});

document.querySelector(".strike-through").addEventListener("click", () => {
    document.execCommand("strikeThrough", true);
});

document.querySelector(".superscript").addEventListener("click", () => {
    document.execCommand("superscript", true);
});

document.querySelector(".subscript").addEventListener("click", () => {
    document.execCommand("subscript", true);
});

document.querySelector(".download").addEventListener("click", download);

document.querySelector(".print").addEventListener("click", print);