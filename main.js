const typesOfFigures = {
    "Квадрат" : "rect",
    "Треугольник" : "triangle",
    "Круг" : "circle"
}

let selectedTargets = null;

const getRandomNum = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

const addFiguresInHtml = (type, count) => {
    let body = document.querySelector('body');

    let size = getRandomNum(30, 300);

    for(let i = 0; i < count; i++){
        let figure = document.createElement("div");
        figure.classList.add(type);

        figure.style.width = size + "px";
        figure.style.height = size + "px";

        let position = [getRandomNum(100, 1000),getRandomNum(200, 700)]
        figure.style.left = position[0] + "px";
        figure.style.top = position[1] + "px";

        figure.addEventListener('click', e => {
            if(selectedTargets) selectedTargets.target.style.background = "";
            
            selectedTargets = {
                target: e.target,
                type
            }
            if(type === "triangle") e.target.style.background = "linear-gradient(to right bottom, transparent 50%, yellow 50%) left / 50% 100% no-repeat, linear-gradient(to left bottom, transparent 50%, yellow 50%) right / 50% 100% no-repeat";
            else e.target.style.background = "yellow"
        })

        figure.addEventListener('dblclick', e => e.target.remove())

        body.append(figure);
    }
}

document.querySelectorAll('button').forEach(b => 
    b.addEventListener('click',(e) => {
        let count = document.querySelector('input').value;
        let type = typesOfFigures[e.target.outerText];
        
        addFiguresInHtml(type, count);
    })
)