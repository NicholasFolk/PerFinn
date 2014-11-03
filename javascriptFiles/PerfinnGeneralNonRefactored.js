var input = function(idVal,initVal,isValOrQuestion, isMonthly){
    var id = idVal,
        cost = initVal,
        isValOrQues = isValOrQuestion,
        monthly = isMonthly;

    return function(){

    }
}

var app = {
    inputs : {
        "preTaxSalary":0,
        "taxDeductibles":0,
        "averageTaxRate":0,
        "property":"rent",
        "rentCost":0,
        "mortgage":0,
        "propertyTax":0,
        "condoFees":0,
        "medInsurance":0,
        "medications": 0,
        "car": false,
        "carInsurance":0,
        "carPayments":0,
        "gas":0,
        "otherInsurance":0,
        "tuition":0,
        "studentLoans":0,
        "otherLoans":0,
        "cablePhoneInt":0,
        "utilities":0,
        "groceries":0,
        "dinners":0,
        "alcohol":0,
        "entertainment":0,
        "clothing": 0,
        "gifts":0,
        "pet": false,
        "petFood": 0,
        "vetBills": 0,
        "otherMonthly":0,
        "otherYearly":0
    },
}
var inputs = {
    "preTaxSalary":0,
    "taxDeductibles":0,
    "averageTaxRate":0,
    "property":"rent",
    "rentCost":0,
    "mortgage":0,
    "propertyTax":0,
    "condoFees":0,
    "medInsurance":0,
    "medications": 0,
    "car": false,
    "carInsurance":0,
    "carPayments":0,
    "gas":0,
    "otherInsurance":0,
    "tuition":0,
    "studentLoans":0,
    "otherLoans":0,
    "cablePhoneInt":0,
    "utilities":0,
    "groceries":0,
    "dinners":0,
    "alcohol":0,
    "entertainment":0,
    "clothing": 0,
    "gifts":0,
    "pet": false,
    "petFood": 0,
    "vetBills": 0,
    "otherMonthly":0,
    "otherYearly":0

}

var responses = {
    losing: function(sav){
        return "You are currently spending more than you are earning. You are" +
            " losing <span class='blueBolded'>$" + sav + "</span> per year. That works out" +
            " to be <span class='blueBolded'>$" + (sav/12).toFixed(2) + "</span> per month. " +
            "It is possible that you are being too ambitious about your retirement savings, but more" +
            " likely, you should look to find areas where you are overspending. <br/><br/> Perfinn" +
            " is currently working on building personal profiles to provide you with a more detailed" +
            " picture of how you are overspending and how you can invest your further. Keep checking" +
            " back!";
    },
    saving: function(sav){
        var rrsp = inputs['taxDeductibles'].toFixed(2);
        var hasRRSP = '';
        if (parseInt(rrsp,10) > 0) {
            hasRRSP = "Keep in mind, this is in addition to your retirement savings of " +
                "<span class='blueBolded'>$" + rrsp + "</span> per year. ";
        }
        return "You are currently saving <span class='blueBolded'>$" + sav + "</span> per year. That works out" +
            " to be <span class='blueBolded'>$" + (sav/12).toFixed(2) + "</span> per month. " +
            hasRRSP + "You can visit our " +
            "<a id='intCalcLink' href='InterestCalc.html'>interest calculator</a> to find out how much you can accrue" +
            " over a given amount of time. Also keep in mind that this is a general overview, and while we strive " +
            "to give you a closer view of your finances, there will always be rainy day situations and other unplanned" +
            " expenses for which you should be prepared.";
    },
    breakingEven: function(sav){
        return "You are breaking even. Are you sure you filled in the inputs? If you believe this is an error, " +
            "please let us know by <a id='intCalcLink' href='AboutUs.html'>messaging us</a>.";
    },
    respond: function(func, sav) {
        var additionalResponse = '';

        if(inputs["alcohol"] > 200) {
            additionalResponse += "It looks like you are spending <span class='redBolded'>$" +
                inputs["alcohol"]*12 + "</span> on alcohol every year.";
        }

        document.getElementById("response").innerHTML = responses[func](sav) + additionalResponse;
    }
}

function getResponse(){
    var savings = calculateSavings();
    if (savings > 0) {
        responses.respond("saving", savings.toFixed(2));
    } else if (savings < 0) {
        responses.respond("losing", savings.toFixed(2));
    } else if (savings == 0) {
        responses.respond("breakingEven", savings.toFixed(2));
    }
}

function updateInputs() {
    for (var prop in inputs) {
        if (inputs.hasOwnProperty(prop)&& typeof inputs[prop] === "number" && document.getElementById(prop) != null){
            if (document.getElementById(prop).value) {
                inputs[prop] = parseInput(document.getElementById(prop).value);
            } else {
                inputs[prop] = 0;
            }
        }
    }
    inputs["property"] = document.getElementById("property").options[document.getElementById("property").selectedIndex].value;

}
function calculateSavings(){
    /*
     for (var prop in inputs){

     }
     */

    var savings = 0;
    updateInputs();
    savings += inputs["preTaxSalary"];
    savings -= inputs["taxDeductibles"];
    savings *= (1-(inputs["averageTaxRate"] /100));
    if (inputs["property"] == "buy"){
        savings -= (12*inputs["mortgage"]);
        savings -= (12*inputs["condoFees"]);
        savings -= (inputs["propertyTax"]);
    } else {
        savings -= (12*inputs["rentCost"]);
    }
    if (inputs["car"]) {
        savings -= 12 * (inputs["carInsurance"] +
            inputs["carPayments"] +
            inputs["gas"]);
    }
    savings -=
        12*(inputs["otherLoans"] +
        inputs["studentLoans"] +
        inputs["otherInsurance"] +
        inputs["utilities"] +
        inputs["medInsurance"] +
        inputs["cablePhoneInt"] +
        inputs["groceries"] +
        inputs["dinners"] +
        inputs["alcohol"] +
        inputs["gifts"] +
        inputs["clothing"] +
        inputs["medications"] +
        inputs["entertainment"] +
        inputs["otherMonthly"]) +
        inputs["otherYearly"];
    if (inputs["pet"]) {
        savings -= 12 * (inputs["vetBills"] +
            inputs["petFood"]);
    }
    savings -= inputs["tuition"];

    return savings;
}

function estimateTaxRate(){
    updateInputs();
    var afterTaxSalary = inputs["preTaxSalary"] - inputs["taxDeductibles"];
    console.log(afterTaxSalary);
    if (afterTaxSalary >= 300000) {
        inputs["averageTaxRate"] = 40;
    } else if (afterTaxSalary >= 200000) {
        inputs["averageTaxRate"] = 35;
    } else if (afterTaxSalary >= 136000) {
        inputs["averageTaxRate"] = 30;
    } else if (afterTaxSalary <= 10000) {
        inputs["averageTaxRate"] = 1;
    } else if (afterTaxSalary <= 20000) {
        inputs["averageTaxRate"] = (((afterTaxSalary - 10000)/10000))*0.1*100;
    } else {
        inputs["averageTaxRate"] = (((afterTaxSalary - 40000)/10000)*0.015 + 0.16)*100;
    }
    document.getElementById("averageTaxRate").value = inputs["averageTaxRate"].toFixed(0);
}

function changeForm(){
    var rentOrBuy = document.getElementById("property");
    var valueOf = rentOrBuy.options[rentOrBuy.selectedIndex].value;
    var eltArray;
    var len;
    if (valueOf == "rent"){
        eltArray = document.getElementsByClassName("buy");
        len = eltArray.length;
        for (var i = 0; i<len;i++) {
            eltArray[i].style.display = "none";
        }
        eltArray = document.getElementsByClassName("rent");
        len = eltArray.length;
        for (var i = 0; i<len;i++) {
            eltArray[i].style.display = "block";
        }
    } else if (valueOf == "buy") {
        eltArray = document.getElementsByClassName("buy");
        len = eltArray.length;
        for (var i = 0; i<len;i++) {
            eltArray[i].style.display = "block";
        }
        eltArray = document.getElementsByClassName("rent");
        len = eltArray.length;
        for (var i = 0; i<len;i++) {
            eltArray[i].style.display = "none";
        }
    } else {
        console.log("error");
    }
}

function changeClassDisplay(cssClass, display){
    var eltArray;
    eltArray = document.getElementsByClassName(cssClass);
    len = eltArray.length;
    for (var i = 0; i<len;i++) {
        eltArray[i].style.display = display;
    }
    if (display == "none") {
        inputs[cssClass] = false;
    } else {
        inputs[cssClass] = true;
    }
}

function editCarFields(display){
    var eltArray;
    eltArray = document.getElementsByClassName("car");
    len = eltArray.length;
    for (var i = 0; i<len;i++) {
        eltArray[i].style.display = display;
    }
    if (display == "none") {
        inputs["car"] = false;
    } else {
        inputs["car"] = true;
    }
}
function editPetFields(display){
    var eltArray;
    eltArray = document.getElementsByClassName("pet");
    len = eltArray.length;
    for (var i = 0; i<len;i++) {
        eltArray[i].style.display = display;
    }
    if (display == "none") {
        inputs["pet"] = false;
    } else {
        inputs["pet"] = true;
    }
}



