((function(){
	
    const d = document,
    w = window;

    let breakpoint = w.matchMedia("(min-width: 768px)");

    const responsive = e => {
        
        if (e.matches) {
            d.getElementById("btn-menu").classList.remove("hidden")

        } else {
            d.getElementById("btn-menu").classList.add("hidden")

        }
        
        

    }

    breakpoint.addEventListener("change", responsive);
    responsive(breakpoint);

})());


