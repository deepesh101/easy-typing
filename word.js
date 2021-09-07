const letters = require("./letters");
var vowels = ['a', 'e', 'i', 'o', 'u'];
var sounds = ['bh', 'ch', 'dh', 'gh', 'jh', 'kh', 'ph', 'sh', 'th'];

module.exports = function generateWord(word) {
    word = word.toLowerCase();
    return splitWord(word);
}

function suggestWords(suggestionWords, extension) {
    var newSuggestionWords = [];
    suggestionWords.forEach(suggestion => {
        newSuggestionWords.push(suggestion+extension);
    });
    return newSuggestionWords;
}

function splitWord(word) {
    var first=false;
    var suggestionWords = [""];
    var vowelsGroup = "";
    for(var i=0; i<word.length; i++) {
        if(word[i] === ' ') {
            if(vowelsGroup !== "") {
                if(letters[vowelsGroup]) {
                    suggestionWords = suggestWords(suggestionWords, letters[vowelsGroup][1]+" ");
                } else {
                    if(vowelsGroup === "ia") {
                        suggestionWords = suggestWords(suggestionWords, letters["i"][1]+letters["y"][0]+letters["aa"][1]+" ");
                    } else if(vowelsGroup === "oi") {
                        suggestionWords = suggestWords(suggestionWords, letters["o"][1]+letters["ee"][0]+" ");
                    } else if(vowelsGroup === "ao") {
                        suggestionWords = suggestWords(suggestionWords, letters["a"][1]+letters["o"][0]);
                    }
                }
                vowelsGroup = "";
            }
        }
        else {
            if(!vowels.includes(word[i])) {
                if(vowelsGroup !== "") {
                    if(first) {
                        if(letters[vowelsGroup]) {
                            suggestionWords = suggestWords(suggestionWords, letters[vowelsGroup][0]);
                        } else {
                            if(vowelsGroup === "ia") {
                                suggestionWords = suggestWords(suggestionWords, letters["i"][0]+letters["y"][0]+letters["aa"][1]);
                            } else if(vowelsGroup === "oi") {
                                suggestionWords = suggestWords(suggestionWords, letters["o"][0]+letters["ee"][0]);
                            } else if(vowelsGroup === "ao") {
                                suggestionWords = suggestWords(suggestionWords, letters["a"][0]+letters["o"][0]);
                            }
                        }                        
                        first = false;
                    } else {
                        if(vowelsGroup !== "a") {
                            if(letters[vowelsGroup]) {
                                suggestionWords = suggestWords(suggestionWords, letters[vowelsGroup][1]);
                            } else {
                                if(vowelsGroup === "ia") {
                                    suggestionWords = suggestWords(suggestionWords, letters["i"][1]+letters["y"][0]+letters["aa"][1]);
                                } else if(vowelsGroup === "oi") {
                                    suggestionWords = suggestWords(suggestionWords, letters["o"][1]+letters["ee"][0]);
                                } else if(vowelsGroup === "ao") {
                                    suggestionWords = suggestWords(suggestionWords, letters["a"][1]+letters["o"][0]);
                                }
                            }  
                        }
                    }
                }
                vowelsGroup = "";
                var newSuggestionWords = [];
                var extensionArray;
                if(word[i+1] === 'h' && sounds.includes(word[i]+word[i+1])) {
                    extensionArray = letters[word[i]+'h'];
                    i++;
                } else {
                    extensionArray = letters[word[i]];
                }
                suggestionWords.forEach(suggestion => {
                    extensionArray.forEach(el => {
                        newSuggestionWords.push(suggestion+el);
                    });
                });
                suggestionWords = newSuggestionWords;
                newSuggestionWords = [];
                if(!vowels.includes(word[i+1]) && i+1 < word.length) {
                    suggestionWords = suggestWords(suggestionWords, letters['halant']);
                }
            } else {
                if(i === 0) {                    
                    first = true;
                }
                vowelsGroup += word[i];
            }
        }
    }
    if(vowelsGroup) {
        if(first) {
            if(letters[vowelsGroup]) {
                suggestionWords = suggestWords(suggestionWords, letters[vowelsGroup][0]);
            } else {
                if(vowelsGroup === "ia") {
                    suggestionWords = suggestWords(suggestionWords, letters["i"][0]+letters["y"][0]+letters["aa"][1]);
                } else if(vowelsGroup === "oi") {
                    suggestionWords = suggestWords(suggestionWords, letters["o"][0]+letters["ee"][0]);
                } else if(vowelsGroup === "ao") {
                    suggestionWords = suggestWords(suggestionWords, letters["a"][0]+letters["o"][0]);
                }
            }                        
            first = false;
        } else {
            if(letters[vowelsGroup]) {
                suggestionWords = suggestWords(suggestionWords, letters[vowelsGroup][1]);
            } else {
                if(vowelsGroup === "ia") {
                    suggestionWords = suggestWords(suggestionWords, letters["i"][1]+letters["y"][0]+letters["aa"][1]);
                } else if(vowelsGroup === "oi") {
                    suggestionWords = suggestWords(suggestionWords, letters["o"][1]+letters["ee"][0]);
                } else if(vowelsGroup === "ao") {
                    suggestionWords = suggestWords(suggestionWords, letters["a"][1]+letters["o"][0]);
                }
            }
        }
    }
    return suggestionWords;
}