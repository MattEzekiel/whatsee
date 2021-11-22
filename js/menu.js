const menuToggle = document.querySelector('.toggle');
const list = document.querySelectorAll('.list');
const navigcation = document.querySelector('.navigation')

menuToggle.onclick = function () {
    menuToggle.classList.toggle('active');
    navigcation.classList.toggle('active');
}

for (let i = 0; i < list.length; i++){
    list[i].onclick = function () {
        let j = 0;
        while (j < list.length){
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
}