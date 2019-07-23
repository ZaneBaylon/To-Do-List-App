// select the elements (define variables)
const clear = document.querySelector(".clear"); // selects the clear button
const dateElement = document.getElementById("date"); // will show today's date
const list = document.getElementById("list"); // where our item lives
const input = document.getElementById("input"); // gets what user puts in the field

// classes names
const CHECK = "fa-check-circle" // for the bottom check button
const UNCHECK = "fa-circle-thin" // for the uncheck button
const LINE_THROUGH = "lineThrough"; // for the line throught the text

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// show today's date
const options = {weekday : "long", month : "short", day : "numeric"}; // defines the options for the date
const today = new Date(); // defines the constant "today"

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// add to do function

function addToDo(toDo, id, done, trash){
   
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    // this is from the HTML file, defines each part of the list-row (good example of iterating elements)
    const item = `<li class="item"> 
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
              `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

let ListeningStateChangedEvent = [];

// add an item to the list user the enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){ // 13 = "enter" key on keyboard
        const toDo = input.value;

        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);

            ListeningStateChangedEvent.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            // add item to local storage ( this code must be added where the LIST array is updated )
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do for when the user clicks the complete button
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode); 

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // retrun the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to local storage ( this code must be added where the LIST array is updated )
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
