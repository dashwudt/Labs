const calcOptions = {
    numbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."],
    actions: [
        ["/", "*", "-", "+"],
        ["C", "<-", "="]
    ]
}

let sum = "";
let resulted = false;

const createCalc = (options) =>{
    let calc = document.createElement('div');
    calc.classList.add("calc");

    let display = document.createElement('div');
    display.classList.add("display");

    let span1 = document.createElement('span');
    span1.classList.add("display_text_1", "hide");
    span1.innerHTML = "";

    let span2 = document.createElement('span');
    span2.classList.add("display_text_2");
    span2.innerHTML = "0";

    display.append(span2)
    display.append(span1)
    
    let buttons = document.createElement('div');
    buttons.classList.add("buttons");

    let buttons_numbers = document.createElement('div');
    buttons_numbers.classList.add("buttons_numbers");

    const clear = () => {
        sum = "";
        span1.classList.remove('grey')
        span1.classList.add('hide')
        span2.innerHTML = "0";
        span1.innerHTML = "";
        resulted = false;
    }

    options.numbers.forEach(num => {
        let button = document.createElement('button');
        button.classList.add("button");
        button.innerHTML = num;

        button.style.width = 70 + "px";  
        button.style.height = 70 + "px";
        if(num == 0) button.style.width = 150 + "px";
    
        button.onclick = () => {
            if(span2.innerHTML == 0 || resulted ) {
                span2.innerHTML = "";
                resulted = false;
            }
            span2.innerHTML += num;
        }

        buttons_numbers.append(button);
    })

    buttons.append(buttons_numbers);


    let buttons_actions = document.createElement('div');
    buttons_actions.classList.add("buttons_actions");

    options.actions.forEach(actionColumn => {
        let action_column = document.createElement('div');
        action_column.classList.add('action_column');

        actionColumn.forEach(action => {
            let button = document.createElement('button');
            button.classList.add("button");
            button.innerHTML = action;
            
            button.style.width = 70 + "px";  
            button.style.height = 70 + "px";
            if(action === "=") button.style.height = 150 + "px";

            button.onclick = () => {
                if(options.actions[0].includes(action)){
                    span1.classList.remove('hide')
                    span1.classList.add('grey');
                   
                    if(span1.innerHTML !== "0") sum = eval(span1.innerHTML + span2.innerHTML)
                    else sum = parseFloat(span2.innerHTML)

                    span2.innerHTML = "0";
                    span1.innerHTML = sum + " " + action + " ";
                }else if(action === "C") clear();
                 else if(action === "<-"){
                    if(span2.innerHTML.length === 1 || resulted) span2.innerHTML = "0";
                    else span2.innerHTML = span2.innerHTML.slice(0, -1);
                }else if(action === "="){
                    let result = eval(span1.innerHTML + span2.innerHTML);
                    clear();
                    resulted = true;
                    span2.innerHTML = result
                }
                
            }


            action_column.append(button);
        }) 
        buttons_actions.append(action_column);
    })

    buttons.append(buttons_actions);

    calc.append(display, buttons);
    
    document.querySelector('body').append(calc);
}

createCalc(calcOptions)
