let left_button = document.querySelector(".left_button")
let center_button = document.querySelector(".center_button")
let right_button = document.querySelector(".right_button")

let left_img = document.querySelector(".left");
let right_img = document.querySelector(".right");

const clear = (index) => {
    let mas = [left_img, 0, right_img]
    let mainSide = mas[index + 1];
    let oppositeSide = mas[-index + 1];
    mainSide.classList.remove("center");
    oppositeSide.classList.remove("center");
    mainSide.classList.remove("hide")
    mainSide.style.zIndex = 200;
    oppositeSide.style.zIndex = 100;
    oppositeSide.classList.add("hide")
}

left_button.addEventListener('click', () => clear(-1))

center_button.addEventListener('click', e => {
    left_img.classList.remove("hide")
    right_img.classList.remove("hide")
    left_img.classList.add("center")
    right_img.classList.add("center")
})

right_button.addEventListener('click', () => clear(1))