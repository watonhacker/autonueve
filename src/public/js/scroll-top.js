





    



((function(){

const d = document;
const w = window;
let $btnCart = d.querySelector(".btnCart")


    w.addEventListener("scroll", e => {
    scrollTop = w.pageYOffset || d.documentElement.scrollTop;

    /*    console.log(scrollTop) */
       
       if(scrollTop > 1000) {
            $btnCart.style.visibility = "visible"
            $btnCart.style.display = "block"
       } else {
        
        $btnCart.style.visibility = "hidden"
            $btnCart.style.display = "none"


           
       }

   })
   



/*    d.addEventListener("click", e => {
       if (e.target == $btn || e.target == $btn.firstChild){

   

           w.scrollTo({
               behavior:"smooth",
               top:0,
           })

       }
   })
 */


    
})());


