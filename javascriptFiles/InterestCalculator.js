/**
 *
 */
var interestInputs = {
    initial: 0,
    contFrequency: "yearly",
    yearlyContValue: 0,
    monthlyContValue: 0,
    compounded: yearlyCont,
    timeLength: 0,
    interestRate: 0
}

function calculateInterest(){
    updateInterestInputs();
    var init = interestInputs["initial"];
    var years = Math.floor(interestInputs["timeLength"]);
    var percent = interestInputs["interestRate"]/100 + 1;
    var cont;
    var result;
    var frequency = interestInputs["contFrequency"];
    if (frequency === "yearly") {
        cont = interestInputs["yearlyContValue"];
        result = calculateCompoundInterest(init,cont, percent, years, yearlyCont);
    } else if (frequency === "monthly"){
        cont = interestInputs["monthlyContValue"];
        result = calculateCompoundInterest(init,cont, percent, years*12, monthlyCont);
    } else if (frequency === "never"){
        cont = 0;
        result = calculateCompoundInterest(init,cont, percent, years, neverCont);
    }
    updateResponseField(result);
}

function calculateCompoundInterest(init,cont, percent, time, freqObj) {
    var result;
    var compounded = interestInputs["compounded"];
    if (compounded === "yearly") {
        result = freqObj.yearlyComp(init, cont, percent, time);
    } else if (compounded === "monthly"){
        result = freqObj.monthlyComp(init, cont, percent, time);
    } else if (compounded === "simple"){
        result = freqObj.simple(init, cont, percent, time);
    }
    return result;
}

var yearlyCont = {
    yearlyComp: function(init, cont,perc,years) {
        var interestCalc = function(cont,perc,years) {
            if (years === 0) {
                return cont;
            } else {
                return (cont * ((Math.pow(perc, years)))) + interestCalc(cont, perc, (years - 1));
            }
        }
        if (years === 0) return init;
        return (init * ((Math.pow(perc, years)))) + interestCalc(cont, perc, years-1);
    },

    monthlyComp: function(init, cont,perc,years) {
        var interestCalcYM = function(cont,perc,years) {
            if (years === 0) {
                return cont;
            } else {
                return (cont * ((Math.pow(perc, years*12)))) + interestCalcYM(cont, perc, (years - 1));
            }
        }
        if (years === 0) return init;
        var newPercent = (((perc-1)/12 )+1);
        return (init * ((Math.pow(newPercent, years*12)))) + interestCalcYM(cont, newPercent, years-1);
    },


    simple: function(init,cont, percent, years) {
        var rawPercent = percent - 1;
        var result = (init + (init * rawPercent * years));
        years--;
        while (years >= 0) {
            result += (cont + (cont * rawPercent * years));
            years--;
        }
        return result;
    }
}

var monthlyCont = {
    yearlyComp: function(init, cont,perc,months) {
        var interestCalc = function(cont,perc,months) {
            if (months === 0) {
                return cont;
            } else {
                return (cont * ((Math.pow(perc, months/12)))) + interestCalc(cont, perc, (months - 1));
            }
        }
        if (months === 0) return init;
        return (init * ((Math.pow(perc, months/12)))) + interestCalc(cont, perc, months-1);
    },

    monthlyComp: function(init, cont,perc,months) {
        var interestCalcYM = function(cont,perc,months) {
            if (months === 0) {
                return cont;
            } else {
                return (cont * ((Math.pow(perc, months)))) + interestCalcYM(cont, perc, (months - 1));
            }
        }
        if (months === 0) return init;
        var newPercent = (((perc-1)/12 )+1);
        return (init * ((Math.pow(newPercent, months)))) + interestCalcYM(cont, newPercent, months-1);
    },

    simple: function(init,cont, percent, months) {
        var rawPercent = (percent - 1)/12;
        var result = (init + (init * rawPercent * months));
        months--;
        while (months >= 0) {
            result += (cont + (cont * rawPercent * months));
            months--;
        }
        return result;
    }
}

var neverCont = {
    yearlyComp: function(init, cont,perc,years) {
        return (init * ((Math.pow(perc, years))));
    },

    monthlyComp: function(init, cont,perc,years) {
        var newPercent = (((perc-1)/12 )+1);
        return (init * ((Math.pow(newPercent, years*12))));
    },

    simple: function(init,cont, percent, years) {
        var rawPercent = percent - 1;
        var result = (init + (init * rawPercent * years));
        return result;
    }
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

function updateResponseField(interest){
    document.getElementById("response").innerHTML  = "The total amount accrued over " + interestInputs['timeLength'] + " years would be " +
        "<span class='blueBolded'>$" + interest.toFixed(2) + "</span>. Note that this value " +
        "includes your final contribution.";
}

function getFrequencyObject(){
    var frequencyString = document.getElementById("contFrequency").value;
    if (frequencyString === "yearly"){
        return yearlyCont;
    } else if (frequencyString === "monthly"){
        return monthlyCont;
    } if (frequencyString === "never"){
        return neverCont;
    }
}