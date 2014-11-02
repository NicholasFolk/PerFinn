/*
 *  direction is either "forward" or "back"
 *  Assume that buttons are blocked if at first or last page
 */
var movePage = function() {
    var page = 1;

    return function (direction, tool) {
        clearPage(page, tool);
        if (direction == "forward") {
            page++;
        } else {
            page--;
        }

        updatePage(page, tool);

    }
}();

var updatePage = function(pageNo, toolPage){
    if (toolPage === "InterestCalc") {
        updateInterestCalcPage(pageNo);
    } else if (toolPage === "PerfinnIndex"){
        updatePerFinnPage(pageNo);
    }
}

var updatePerFinnPage = function(/*Integer*/pageNo){
    var pageString = convertNumToString(pageNo);
    changeDisplay(pageString, 'block');

    if (pageNo == 1) {
        changeForm();
    }
    if (pageNo == 2) {
        if (inputs["car"]){
            editCarFields("block");
        } else {
            editCarFields('none');
        }
    }
    if (pageNo == 5) {
        if (inputs["pet"]){
            editPetFields("block");
        } else {
            editPetFields('none');
        }
    }

    document.getElementById('pageNumDisplay').innerHTML = '<p>' + pageNo + ' / 5</p>';
    if (pageString == 'one') {
        changeDisplay('begin', 'none');
    } else if (pageString == 'five') {
        changeDisplay('end', 'none');
    }
}

var clearPage = function(pageNo, toolPage){
    var pageString = convertNumToString(pageNo);
    changeDisplay(pageString, 'none');
    if (pageString == 'one') {
        changeDisplay('begin', 'block');
    } else if (toolPage === 'PerfinnIndex' && pageString == 'five') {
        changeDisplay('end', 'block');
    } else if (toolPage === 'InterestCalc' && pageString == 'two') {
        changeDisplay('end', 'block');
    }
}
var convertNumToString = function(num) {
    if (num == 1){
        return 'one';
    } else if (num == 2){
        return 'two';
    } else if (num == 3){
        return 'three';
    } else if (num == 4){
        return 'four';
    } else if (num == 5){
        return 'five';
    } else {
        alert("Error: no such page");
    }

}
/**
 * Changes the display of all elements of a given class
 * @param classString
 * @param displayType
 */
var changeDisplay = function(classString, displayType){
    var array = document.getElementsByClassName(classString);
    len = array.length;
    for (var i = 0; i<len;i++) {
        array[i].style.display = displayType;
    }
}


function reset() {
    var i = 1;
    for (var input in inputs) {
        if (inputs.hasOwnProperty(input)){
            if (typeof inputs[input] === "number"){
                inputs[input] = 0;
                document.getElementById(input).value = '';
               // document.getElementById(input).placeho
            } else if (typeof input === "boolean") {
                inputs[input] = false;
            } else if (input == "property") {
                document.getElementById(input).value = "rent";
            }
            document.getElementById("petN").checked = true;
            document.getElementById("carN").checked = true;
            changeClassDisplay("car", 'none');
            changeClassDisplay("pet", 'none');
        }
    }
    document.getElementById("response").innerHTML = "Form has been reset";
    closeResetDialog();
}

function openResetDialog(){
    document.getElementById("introBox").style.display = 'block';
    document.getElementById("resetTextBox").style.display = 'block';
}

function closeResetDialog(){
    document.getElementById("introBox").style.display = 'none';
    document.getElementById("resetTextBox").style.display = 'none';
}

function showWelcome(){
    document.getElementById("introBox").style.display = 'block';
    document.getElementById("introText").style.display = 'block';
}

function closeWelcome(){
    document.getElementById("introBox").style.display = 'none';
    document.getElementById("introText").style.display = 'none';
}

function closeDialogs(){
    closeWelcome();
    closeResetDialog();
}

var updateInterestCalcPage = function(/*Integer*/pageNo){
    var pageString = convertNumToString(pageNo);
    changeDisplay(pageString, 'block');
    document.getElementById('pageNumDisplay').innerHTML = '<p>' + pageNo + ' / 2</p>';
    if (pageString == 'one') {
        changeDisplay('begin', 'none');
    } else if (pageString == 'two') {
        changeDisplay('end', 'none');
    }
}