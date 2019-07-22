// select the elements (define variables)
const clear = document.querySelector(".clear"); // selects the clear button
const dateElement = document.getElementById("date"); // will show today's date
const list = document.getElementById("list"); // where our item lives
const input = document.getElementById("input"); // gets what user puts in the field

// classes names
const CHECK = "fa-check-circle" // for the bottom check button
const UNCHECK = "fa-circle-thin" // for the uncheck button
const LINE_THROUGH = "lineThrough"; // for the line throught the text

// show today's date
const options = {weekday : "long", month : "short", day : "numeric"}; // defines the options for the date
const today = new Date(); // defines the constant "today"

dateElement.innerHTML = today.toLocaleDateString("en-US", options)

// add to do function

function addToDo(toDo, id, done, trash){
    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_THROUGH : "";

    // this is from the HTML file, defines each part of the list-row
    const item = `<li class="item"> 
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
              `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){ // 13 = "enter" key on keyboard
        const toDo = input.value;

        // if the input isn't empty
        if(toDo){
            addToDo(toDo);
        }
        input.value = "";
    }
});
addToDo("coffee", 1, true, false)