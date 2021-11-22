const main = document.querySelector('main');
const logo = document.querySelector('.logo');
const FPS = 60;

main.style.height = window.innerHeight + 'px';
main.style.width = window.innerWidth + 'px';

//Velocidad del logo
let xPosition = 10;
let yPosition = 10;
let xSpeed = 3;
let ySpeed = 3;

function update() {
    logo.style.left = xPosition + 'px';
    logo.style.top = yPosition + 'px';
}

function randomColor() {
    let color = "#";
    color += Math.random().toString(16).slice(2,8).toUpperCase();
    return color;
}

setInterval(() => {
    if(xPosition + logo.clientWidth >= window.innerWidth || xPosition <= 0){
        xSpeed = -xSpeed;
        logo.style.fill = randomColor();
    }
    if(yPosition + logo.clientHeight >= window.innerHeight || yPosition <= 0){
        ySpeed = -ySpeed;
        logo.style.fill = randomColor();
    }
    xPosition += xSpeed;
    yPosition += ySpeed;
    update();
},1000/FPS)

window.addEventListener('resize', () => {
    main.style.height = window.innerHeight + 'px';
    main.style.width = window.innerWidth + 'px';
})