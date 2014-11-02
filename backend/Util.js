/**
 *
 *
app.util = {
    insertAfter: function(newNode,referenceNode) {
        if (referenceNode.nextElementSibling) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        } else {
            referenceNode.parentNode.appendChild(newNode);
        }
    },

    doInsert: function(afterThis){
        var element = document.createElement('div');
        element.style.backgroundColor = "red";
        element.style.height = "30px";
        element.style.width = "60px";
        element.style.color = "white";
        element.appendChild(document.createTextNode("hi <span class='blueBolded'>kids</span>"));
        insertAfter(element, afterThis);
    },

    parseInput: function(stringInput) {
        var numberString = "";
        var len = stringInput.length;
        for (var i = 0; i < len; i++) {
            var char = stringInput.charAt(i);
            if (!isNaN(parseInt(char))){
                numberString += char;
            }
            if (char === "."){
                numberString += char;
            }
        }
        return parseFloat(numberString);
    }
}
*/
function insertAfter(newNode,referenceNode) {
    if (referenceNode.nextElementSibling) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    } else {
        referenceNode.parentNode.appendChild(newNode);
    }
}

function doInsert(afterThis){
    var element = document.createElement('div');
    element.style.backgroundColor = "red";
    element.style.height = "30px";
    element.style.width = "60px";
    element.style.color = "white";
    element.appendChild(document.createTextNode("hi <span class='blueBolded'>kids</span>"));
    insertAfter(element, afterThis);
}

function parseInput(stringInput) {
    var numberString = "";
    var len = stringInput.length;
    for (var i = 0; i < len; i++) {
        var char = stringInput.charAt(i);
        if (!isNaN(parseInt(char))){
            numberString += char;
        }
        if (char === "."){
            numberString += char;
        }
    }
    return parseFloat(numberString);
}