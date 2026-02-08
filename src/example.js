const app=document.querySelector("#app")
const exemple=document.querySelector("#example")

const colors=["red", "yellow", "black"];
let i=0
setInterval(()=>{
    if(colors[i]==="black"){
      app.style.color="white"
    }
    app.style.background=colors[i];
    i++;
    if(i>colors.length){
      i=0
      app.style.color="black"
      app.style.background="white" //permet de changer des background à chaque une seconde
    }
},1000);

console.log({
    firstChild:exemple.firstElementChild, //prends l'enfant de exemple pour nous c'est h1
    firstparent:exemple.parentElement,// l'element parent de exemple pour nous c'est (body)
    nextSister:exemple.nextElementSibling, //suivant element de même egalité avec exemple dans body
    prevSister:exemple.previousElementSibling,//précédent element de même egalité avec exemple dans body
});
 //deconseillé
exemple.innerHTML=`
    <div>Salut</div>
    <h2>je suis là </h2>` //allows you to add a tag in example and drop what it's containt

const div=document.createElement("div") //pour créer un element et là tu peux le faire enfant,sister,parent de celui qui existe déjà

console.log({
  parent: div.parentElement, //l'élement n'a pas encore de parent, contenu,...
  contenue: div.innerHTML,
  sister: div.nextSister,
})


app.appendChild(div) //on dit alors à app de prendre div comme son enfant
const title=document.createElement("h1") //on crée un title qui n'a rien pour le moment
div.appendChild(title) //on dit à div de prendre title comme sn enfant 
title.innerText="salut je suis le fils"; //on ajoute du texte dans title

console.log({
  parent: div.parentElement,  //ici alors on l'a fait enfant de app, donc son parent est app
  contenue: div.innerHTML, //on a déjà ajouter des contenues
  sister: div.nextElementSibling, // lui n'a toujours pas des soeurs suivantes
  sisterPr:div.previousElementSibling //sa précédante siste est h1
})


const input=document.createElement("input")
exemple.appendChild(input)

input.className="exo" //ajoute une classe de input
input.classList.add("exo", "dindon")// même chose que précédent
input.classList.remove("exo") //supprime la class exo
input.style.display="hidden" //cacher l'input

setInterval(()=>{
  input.value +=""
},1000)
