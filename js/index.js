const pop = document.querySelector(".pop");
const open_pop = document.querySelector("#open-pop");
const close_pop = document.querySelector(".exit");
const overlay = document.querySelector(".overlay");
const colors = document.querySelectorAll(".slider-nav .des");
const setting = document.querySelector(".fa-gear");
const slider_img = document.querySelector(".slider-img");
const optional_btn = document.querySelectorAll(".optional");

// pop images
const images = document.querySelectorAll(".section-6 img");
const pop_images = document.querySelector(".pop-img");
const arrowLeft = document.querySelector(".fa-chevron-left");
const arrowRight = document.querySelector(".fa-chevron-right");

// slider nav

const slider = ["slide-1.jpg", "slide-2.jpg", "slide-3.jpg", "slider-4.jpg"];
let sliderIndex = 0;
let clearInt;
let optional = JSON.parse(localStorage.getItem("optional_bg")) ?? true;
console.log(optional);
slide();

function slide() {
  if (optional == true) {
    clearInt = setInterval(function () {
      sliderIndex += 1;

      if (sliderIndex == slider.length) {
        sliderIndex = 0;
      }
      slider_img.style.cssText = `
                height: 100vh;
                  background-image: url(assets/slide/${slider[sliderIndex]});
                  background-size: cover;
                `;
    }, 1000);
  }
}

optional_btn.forEach((btn) => {
  btn.addEventListener(`click`, function (e) {
    e.target
      .closest(".bg-optional")
      .querySelectorAll(".optional")
      .forEach((btn) => {
        btn.classList.remove("optional-active");
      });
    e.target.classList.add("optional-active");
    if (e.target.dataset.value == "true") {
      optional = true;
      slide();
      localStorage.setItem("optional_bg", optional);
    } else {
      optional = false;
      clearInterval(clearInt);
      localStorage.setItem("optional_bg", optional);
      slide();
    }
  });
});

if (JSON.parse(localStorage.getItem("optional_bg"))) {
  optional_btn[0].classList.add("optional-active");
  optional_btn[1].classList.remove("optional-active");
} else {
  optional_btn[1].classList.add("optional-active");
  optional_btn[0].classList.remove("optional-active");
}

// main color

let main = localStorage.getItem("color");
document.documentElement.style.setProperty("--btn-color", main);

if (main == null) {
  colors[0].classList.add("active-color");
}
colors.forEach((el) => {
  if (el.dataset.color == main) {
    console.log(main);
    el.classList.add("active-color");
  }
});
if (localStorage.getItem("color") == null) {
}

colors.forEach((color) => {
  color.addEventListener(`click`, function (e) {
    e.preventDefault();
    main = e.target.dataset.color;
    document.documentElement.style.setProperty("--btn-color", main);

    e.target
      .closest(".slider-nav")
      .querySelectorAll(".des")
      .forEach((el) => el.classList.remove("active-color"));
    e.target.classList.add("active-color");
    localStorage.setItem("color", main);
  });
});

setting.addEventListener(`click`, function (e) {
  e.preventDefault();
  document.querySelector(".slider-nav").classList.toggle("side");
  setting.classList.toggle("fa-spin");
});

const close = function (e) {
  e.preventDefault();
  pop.classList.add("hidden");
  overlay.classList.add("hidden");
  pop_images.classList.add("d-none");
};

open_pop.addEventListener("click", function (e) {
  e.preventDefault();
  pop.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

close_pop.addEventListener("click", function (e) {
  close(e);
});
overlay.addEventListener("click", function (e) {
  close(e);
});

// img pop
let arrayImage = [];
let indexImageArray;
images.forEach((image,index) => {
  arrayImage.push(image.src);
  image.addEventListener(`click`, function (e) {
    let img = pop_images.querySelector("img");
    img.src = e.target.src;
    indexImageArray =index;
    
    pop_images.classList.remove("d-none");
    overlay.classList.remove("hidden");
  });
});

arrowLeft.addEventListener(`click`, function (e) {
  if (indexImageArray == 0){
    indexImageArray=arrayImage.length-1;
  }else{
    indexImageArray =indexImageArray-1;
  }
  let img = e.target.closest(".img").querySelector("img");
  img.src =arrayImage[indexImageArray]
  console.log(img,indexImageArray);
});
arrowRight.addEventListener(`click`, function (e) {
  if (indexImageArray == arrayImage.length-1){
    indexImageArray=0;
  }else{
    indexImageArray =indexImageArray+1;
  }
  let img = e.target.closest(".img").querySelector("img");
  img.src =arrayImage[indexImageArray]
});
