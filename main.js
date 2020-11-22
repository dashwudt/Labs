const buttonSymbols = ["&#8593;", "&#8595;", "&#215;"];

let data;

const loadDataFromStorage = () => {
    data = JSON.parse(sessionStorage.getItem("data")) || [];
    render();
}
const saveDataInStorage = () => {
    sessionStorage.setItem("data", JSON.stringify(data));
    let span = document.createElement("span");
    span.innerHTML = JSON.stringify(data)
	
    document.querySelector("body").append(span)
}




const upRow = (id, position) => {
    if(!position) return;

    let a = data.findIndex(el => el.id === id);
    let b = data.findIndex(el => el.position === position - 1)
	
    let temp = data[a].position;
    data[a].position = data[b].position;
    data[b].position = temp;

    render();
}

const downRow = (id, position) => {
    if(position === Math.max(...data.map(d => d.position))) return;

    let a =  data.findIndex(el => el.id === id);
    let b =  data.findIndex(el => el.position === position + 1);

    let temp = data[a].position;
    data[a].position = data[b].position;
    data[b].position = temp;

    render();
}

const deleteRow = (id, position) => {
    data = data.filter(el => el.id !== id);

	let index = -1;
	for(let i=0; i < data.length - 1; i++){
		if(data[i].position != (data[i + 1].position - 1)){
			data[i + 1].position--;
		}
	}
	
    render();
}


const eventsHandlers = [upRow, downRow, deleteRow]


 
const addRow = () => {
    let key = document.querySelector('.input_key').value;
    let value = document.querySelector('.input_value').value;

    let id;
    if(!data.length) id = 1;
    else id = Math.max(...data.map(d => d.id)) + 1;
    
    let position;
    if(!data.length) position = 0;
    else position = Math.max(...data.map(d => d.position)) + 1;
    
    data.push({
	id,	
        key,
        value,
        position
    })

    render();
}

const render = () => {
    let storageHtml = document.querySelector('.storage');
    storageHtml.innerHTML = "";

    data.sort((a,b) => a.position - b.position);

    data.forEach(el => {
        let div = document.createElement("div");
        div.classList.add("data_row");
        div.dataset.id = el.id;
    
        for(let i = 0; i < 2; i++) {
            let input = document.createElement("input");
            i ? input.value = el.value : input.value = el.key
            div.append(input);
        }
    
        for(let i = 0; i < 3; i++) {
            let button = document.createElement("button");
            button.innerHTML = buttonSymbols[i];
            button.addEventListener('click',() => eventsHandlers[i](el.id, el.position))
            div.append(button);
        }
        
        storageHtml.append(div);
    })
}

document.querySelector('.add_button').addEventListener('click', addRow)
document.querySelector('.save_button').addEventListener('click', saveDataInStorage)

loadDataFromStorage();