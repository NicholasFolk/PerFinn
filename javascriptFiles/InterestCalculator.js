
var interestInputs = {
    initial: 0,
    contFrequency: "yearly",
    yearlyContValue: 0,
    monthlyContValue: 0,
    compounded: "simple",
    timeLength: 0,
    interestRate: 0
}

function updateInterestInputs(){
        for (var prop in interestInputs) {
            if (interestInputs.hasOwnProperty(prop)&& typeof interestInputs[prop] === "number" && document.getElementById(prop) != null){
                if (document.getElementById(prop).value) {
                    interestInputs[prop] = parseInput(document.getElementById(prop).value);
                } else {
                    interestInputs[prop] = 0;
                }
            }
        }
    interestInputs["compounded"] = document.getElementById("compounded").value;
    interestInputs["contFrequency"] = document.getElementById("contFrequency").value;

}

function updateResponseField(interest){
    document.getElementById("response").innerHTML  = "$" + interest.toFixed(2);
}

function interestYearlyContYearlyComp(init, cont,perc,years) {

    var interestCalc = function(cont,perc,years) {
        if (years === 0) {
            return cont;
        } else {
            return (cont * ((Math.pow(perc, years)))) + interestCalc(cont, perc, (years - 1));
        }
    }
    if (years === 0) return init;
    return (init * ((Math.pow(perc, years)))) + interestCalc(cont, perc, years-1);
}

function interestYearlyContMonthlyComp(init, cont,perc,years) {

    var interestCalcYM = function(cont,perc,years) {
        if (years === 0) {
            return cont;
        } else {
            var newPercent = (((perc-1)/12 )+1);
            return (cont * ((Math.pow(newPercent, years*12)))) + interestCalcYM(cont, perc, (years - 1));
        }
    }
    if (years === 0) return init;
    var newPercent = (((perc-1)/12 )+1);
    return (init * ((Math.pow(newPercent, years*12)))) + interestCalcYM(cont, perc, years-1);
}


function calculateYearlyContributionsInterest() {
    var init = interestInputs["initial"];
    var years = interestInputs["timeLength"];
    var percent = interestInputs["interestRate"]/100 + 1;
    var cont = interestInputs["yearlyContValue"];
    var result;
    if (interestInputs["compounded"] === "yearly") {
        result = interestYearlyContYearlyComp(init,cont, percent, years);
    } else if (interestInputs["compounded"] === "monthly"){
        result = interestYearlyContMonthlyComp(init,cont, percent, years);
    } else if (interestInputs["compounded"] === "simple"){
        result = calculateMonthlyContributionsInterest();
    }

    return result;
}
function calculateMonthlyContributionsInterest() {

}
function calculateNoContributionsInterest() {

}
function calculateInterest(){
    updateInterestInputs();
    var result;
    var frequency = interestInputs["contFrequency"];
    if (frequency === "yearly") {
        result = calculateYearlyContributionsInterest();
    } else if (frequency === "monthly"){
        result = calculateMonthlyContributionsInterest();
    } else if (frequency === "never"){
        result = calculateNoContributionsInterest();
    }
    updateResponseField(result);
}

function changeFrequency(){
    var frequency = document.getElementById("contFrequency");
    var valueOf = frequency.options[frequency.selectedIndex].value;
    if (valueOf == "yearly") {
        changeDisplay('frequency','block');
        changeDisplay('yearly','block');
        changeDisplay('monthly','none');
    }else if (valueOf == "monthly"){
        changeDisplay('frequency','block');
        changeDisplay('yearly','none');
        changeDisplay('monthly','block');

    } else if (valueOf == "never"){
        changeDisplay('frequency','none');
    }
}
