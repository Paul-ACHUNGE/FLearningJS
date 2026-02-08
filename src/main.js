import './style.css'
const startButton=document.querySelector("#button")
const app=document.querySelector("#app")
// startButton.addEventListener("click",()=>{
//   const element=document.createElement("span")
//    element.innerText="Start ?"
//   app.appendChild(element)
// })
let i=0
let styleBackground=["blue", "red", "yellow","black"]

// app.addEventListener("click",()=>{
//   alert("je suis le div")
// })
//en cliquant sur l'enfant on a cliqué sur le parent, si addEventListener alors l'enfant repond en premier, puis le parent, puis le grand-parent
//car par defaut on fait buble,(donc on clique sur l'enfant, puis il dit au parent, puis au grand parent)
//si on veut la marche contraire, on change en useCapture en ajoute true à la fin

const Button=document.querySelector("#button")
Button.addEventListener("click",()=>{
  if(styleBackground[i]==="black"){
      app.style.color="white"
    }else{
     app.style.color="black" 
    }
    app.style.background=styleBackground[i]
    i++;
    if(i>styleBackground.length-1){
      i=0
    }
    
})

