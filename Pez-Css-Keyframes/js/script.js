let OpenNav = document.querySelector("#open_nav")
let CloseNav = document.querySelector("#close_nav")
let Nav = document.querySelector(".res-menu")

OpenNav.addEventListener("click", function(){
    Nav.style.height = "50vh";
})

CloseNav.addEventListener("click", function(){
    document.querySelector(".res-menu").style.height = "0";
})

