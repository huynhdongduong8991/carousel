 // Init State Container
 const carouselContainer = document.querySelectorAll(".carousel-container");
  
 carouselContainer.forEach((container) => {
   // Init State
   const carousels = container.querySelector(".carousels");
   const prevBtn = container.querySelectorAll(".wrapper-btn button")[0];
   const nextBtn = container.querySelectorAll(".wrapper-btn button")[1];

   let currentXAxisValue = 101.9;
   let currentIndex = 1;
   const carouselsLength = carousels.children.length;

   prevBtn.setAttribute("data-nav", "prev");
   nextBtn.setAttribute("data-nav", "next");
   if (carouselsLength <= 2) {
     nextBtn.style.display = "none";
   }
   updateDirection(currentXAxisValue);

   // Event Listener
   nextBtn.addEventListener("click", () => {
     currentIndex++;
     if (currentIndex > 2 || currentIndex === 1) {
       currentIndex = 2;
     }
     nextBtn.disabled = true;
     updateDirection((currentXAxisValue += 101.9));
     handleTransition("next", (currentXAxisValue -= 101.9));
   });

   prevBtn.addEventListener("click", () => {
     currentIndex--;
     if (currentIndex <= 1) {
       currentIndex = 0;
     }
     prevBtn.disabled = true;
     updateDirection((currentXAxisValue -= 101.9));
     handleTransition("prev", (currentXAxisValue += 101.9));
   });

   function updateDirection(currentXAxisValue) {
     updateCarouselView(currentIndex);
     carousels.style.transform = `translateX(-${currentXAxisValue}%)`;
   }

   function updateCarouselView(currentIndex) {
     const captions = container.querySelectorAll(".caption");
     const carouselItem = container.querySelectorAll(".carousel-img");

     carouselItem.forEach((item, index) => {
       item.style.transform = currentIndex != index ? "scaleY(0.8)" : "";
     });

     captions.forEach((item, index) => {
       item.style.display = currentIndex != index ? "none" : "flex";
     });
   }

   function handleTransition(type, currentXAxisValue) {
     setTimeout(() => {
       carousels.style.transition = "none";
       carousels.style.transform = `translateX(-${currentXAxisValue}%)`;
       if (type === "next") {
         carousels.appendChild(carousels.firstElementChild);
       } else {
         carousels.prepend(carousels.lastElementChild);
       }
     }, 1000);

     setTimeout(() => {
       type === "next"
         ? nextBtn.disabled = false
         : prevBtn.disabled = false;
       carousels.style.transition = "all 1s";
     }, 1100);
   }
});