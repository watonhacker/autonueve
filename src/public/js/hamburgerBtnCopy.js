((function(){
    const d = document;

    d.addEventListener("click", e => {


        if (e.target.matches(".nav-btn") || (e.target.matches(`${".nav-btn"} *`)) ) {
        
            d.querySelector(".nav-menu").classList.add("active")
        }

        if (e.target.matches(`${".nav-menu"} *`) || e.target.matches(".nav-menu a") || e.target.matches(".nav-menu.active")){

            d.querySelector(".nav-menu").classList.remove("active");
        }

  

    })

})());



