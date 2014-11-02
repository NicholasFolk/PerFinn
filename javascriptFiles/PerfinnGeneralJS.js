
(function closure(){
    document.onload(setUp());


    function setUp(){
        var jsonArray = JSON.parse(rawJsonArray.get_array());
        setUpQuestions(jsonArray);
        setUpPageButtons(jsonArray);
        createInputs();
    }

//    var inputs = {};
//
//    function createInputs(){
//        inputs.preTaxSalary = createInput(0, false, 1, true, "Salary (before taxes):");
//        inputs.taxDeductibles = createInput(0, false, 1, true, "Tax-Free Retirement Contributions:");
//        inputs.averageTaxRate = createInput(0, false, 1, true, "Average Tax Rate:");
//        inputs.property = createInput(0, "rentOrOwn", 1, true, "Do you own or do you rent your property?");
//        inputs.rentOrMortgage = createInput(0, false, 1, true, "Monthly Mortgage Payments:");
//        inputs.propertyTax = createInput(0, false, 1, true, "buy", "Condo or Strata fees:");
//        inputs.condoFees = createInput(0, false, 1, true, "buy", "");
//        inputs.medInsurance = createInput(0, false, 2, true, "");
//        inputs.car = createInput(0, "car", 2, true, "");
//        inputs.carInsurance = createInput(0, false, 2, true, "");
//        inputs.carPayments = createInput(0, false, 2, true, "");
//        inputs.gas = createInput(0, false, 2, true, "");
//        inputs.otherLoans = createInput(0, false, 2, true, "");
//        inputs.cablePhoneInt = createInput(0, false, 3, true, "");
//        inputs.utilities = createInput(0, false, 3, true, "");
//        inputs.groceries = createInput(0, false, 4, true, "");
//        inputs.dinners = createInput(0, false, 4, true, "");
//        inputs.alcohol = createInput(0, false, 4, true, "");
//        inputs.gifts = createInput(0, false, 4, true, "");
//        inputs.clothes = createInput(0, false, 4, true, "");
//        inputs.other = createInput(0, false, 4, true, "");
//    }

//    function createInput(val, isNonValueQuestion, pageNum, isVisible, ques, className) {
//        var input = {
//            value: val,
//            specialQuestion: isNonValueQuestion || '',
//            pageNumber: pageNum,
//            visible: isVisible,
//            classOption: className,
//            question: ques
//
//        };
//        return input;
//    }

    function setUpQuestions(questions){
        var len = questions.length;
        for (var i = 0; i < len ; i += 1) {
            var question = document.createElement('div');
            question.className = "question " + questions[i].page;
            if (questions[i].addQuestionClass) {
                question.className += " " + questions[i].addQuestionClass;
            }
            var quesTextDiv = getQuesTextDiv(questions[i]);
            question.appendChild(quesTextDiv);
            var userAnswerDiv = getUserAnswerDiv(questions[i]);


        }
    }

    function getQuesTextDiv(question){
        var quesText = document.createElement('div');
        quesText.className = "quesText";
        if (question.addQuestionTextClass) {
            questText.className += " " + question.addQuestionTextClass;
        }
        if (question.addQuestionTextId) {
            questText.id = question.addQuestionTextId;
        }
        var paragraph = document.createElement('p');
        paragraph.createTextNode(question.questionText);
        if (question.questionText.length > 28) {
            paragraph.style.paddingTop = "0px";
        } else {
            paragraph.style.paddingTop = "8px";
        }
        quesText.appendChild(paragraph);
        return quesText;
    }

    function getUserAnswerDiv(question){
        var userAnswer = document.createElement('div');
        userAnswer.className = "userAnswer";
        var paragraph = document.createElement('p');
        paragraph.className = "dollar";
        addSymbol(paragraph, question)
        var options;
        if (question.form){
            addForm(paragraph,question);
        } else {
            addInput(paragraph,question);
        }

    }

    function addSymbol(paragraph, question){
        var sym = question.symbol;
        if (sym) {
           paragraph.appendChild(document.createTextNode(sym))
        }
    }
    function setUpPageButtons(jsonArray){
        var element = document.createElement('p');
        element.createTextNode('1 / ' + getMaxPages(jsonArray));
        document.getElementById('pageNumDisplay').addChild(element);
    }

    function getMaxPages(jsonArray) {
        var len = jsonArray.length;
        var pageNum = jsonArray[len].page;
    }
}())