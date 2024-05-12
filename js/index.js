const pop = document.querySelector(".pop");
const open_pop = document.querySelector("#open-pop");
const close_pop = document.querySelector(".exit");
const overlay = document.querySelector(".overlay");

const close =function(e){
    e.preventDefault();
    pop.classList.add("hidden");
    overlay.classList.add("hidden");
}

open_pop.addEventListener("click",function(e){
    e.preventDefault();
    pop.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

close_pop.addEventListener("click",function(e){
    close(e);
})
overlay.addEventListener("click",function(e){
close(e);
})