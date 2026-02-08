import './style.css'
import { Questions } from './questions'
const app=document.querySelector("#app")
const start=document.querySelector("#button")
// let i=0
// start.addEventListener("click", ()=>{
//     const question=document.querySelector("#question")?? document.createElement("p")
//     question.id="question";
//     question.innerText=Questions[i].question;
//     app.insertBefore(question, start)
//     i++;
//     if(i>Questions.length - 1){
//         question.remove();
//         i=0
//     }
// })
start.addEventListener("click",startQuiz)
//e.preventDefault() s'il est appelé il va annuler tout ce qui se passait sur e 
function startQuiz(event){
    event.stopPropagation() //pour arrêter la propagation 
    let currentQuestion=0;
    let score=0;
    
    displayQuestion(currentQuestion)
    function clean(){
        while(app.firstElementChild){
            app.firstElementChild.remove();
        }
        const progress=displayProgresseBar(Questions.length, currentQuestion)
            app.appendChild(progress)
    }
    
    function displayQuestion(index){
        clean();
        const question=Questions[index];
        if(!question){
            displayFinishMessage()
            return;
        }
        const title=getTitleElement(question.question)
        app.appendChild(title)
        const answersDiv= createAnswers(question.answers)
        app.appendChild(answersDiv)
        const submitButton=getSubmitButton();
        submitButton.addEventListener("click", submit)
        app.appendChild(submitButton)
    }
    function displayFinishMessage(){
        const h1=document.createElement("h1")
        h1.innerText="Bravo!!! le quiz est terminé"
        const p=document.createElement("p")
        p.innerText=`voici votre score ${score}/${Questions.length}`
        app.appendChild(h1)
        app.appendChild(p)
    }
    function submit(){
        const selectedAnswer=app.querySelector('input[name="answer"]:checked')
        disaibleAllAnswers(); 
        const value=selectedAnswer.value
        const question=Questions[currentQuestion]
        const isCorrect=question.correct===value
        if(isCorrect){
            score++;
        }
        showFeedback(isCorrect, question.correct, value)
        const feedback=getFeedbackMessage(isCorrect, question.correct);
        app.appendChild(feedback)
        displayNextQuestion();
    }
    function displayNextQuestion(){
        const timeout=3000
        let remainingTimeout=3000;

        app.querySelector("button").remove();
        const nextButton=document.createElement("button")
        nextButton.innerText=`Next (${remainingTimeout/1000}s)`

        app.appendChild(nextButton)
        const interval=setInterval(()=>{
            remainingTimeout-=1000;
            nextButton.innerText=`Next (${remainingTimeout/1000}s)`
        },1000)
        const handleNextQuestion=()=>{
            currentQuestion++
            clearInterval(interval)
            clearTimeout(timeoutClick)
            displayQuestion(currentQuestion)
        }

        let timeoutClick=setTimeout(()=>{
            handleNextQuestion()
        },timeout)
        nextButton.addEventListener("click",()=>{
            handleNextQuestion()
        })
    }
    function showFeedback(isCorrect, correct, answer){
        const correctAnswerId=formatId(correct);
        const correctElement=document.querySelector(`label[for='${correctAnswerId}'`)

        const selectedAnswerId=formatId(answer);
        const selectedElement=document.querySelector(`label[for='${selectedAnswerId}'`)

        correctElement.classList.add("correct")
    
        selectedElement.classList.add(isCorrect?"correct":"incorrect")
        

        
    }
    function getFeedbackMessage(isCorrect, correct){
        const paragraph=document.createElement("p")
        paragraph.innerText=isCorrect?"Bravo !!!" :`Désolé cher(e) ami(e), "${correct}" est la bonne réponse`
        return paragraph;
        
    }
    function createAnswers(answers){
        const answersDiv=document.createElement("div")
        answersDiv.classList.add("answers");
        for (const answer of answers){
            const label=getAnswerElement(answer)
            answersDiv.appendChild(label)
        }
        return answersDiv;
    }
}
function formatId(text){
    return text.replaceAll(" ", "-").toLowerCase();
}

function getTitleElement(text){
    const title=document.createElement("h3");
    title.innerText=text;
    return title;
}
function getAnswerElement(text){
    const label=document.createElement("label")
    label.innerText=text
    const input=document.createElement("input")

    const id=formatId(text);
    input.id=id
    label.htmlFor=id
    input.setAttribute("type", "radio")
    input.setAttribute("name","answer")
    input.setAttribute("value", text)

    label.appendChild(input)
    return label;
}

function getSubmitButton(){
        const submitButton=document.createElement("button")
        submitButton.innerText="Submit"
        return submitButton
}

function displayProgresseBar(max,value ){
        const progress=document.createElement("progress")
        progress.setAttribute("max", max)
        progress.setAttribute("value", value);
        return progress
    }

function disaibleAllAnswers(){
    const radioInput=document.querySelectorAll('input[type="radio"]')
    for(const radio of radioInput){
        radio.disabled=true;
    }
}