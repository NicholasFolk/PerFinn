
//= require common/library.js

//= require module/PerFinnApp.js

(function(){

    PerFinnApp.init();


    function setUp(){
        var jsonArray = JSON.parse(rawJsonArray.get_array());
        setUpQuestions(jsonArray);
        setUpPageButtons(jsonArray);
        createInputs();
    }

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
})();