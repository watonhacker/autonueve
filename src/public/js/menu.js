((function(){
	
    const d = document;
    const $menuLink = d.getElementById('link-submenu')
    const $submenu = d.querySelector(".submenu")
    const $nav = d.querySelector(".nav")
    const w = window;

    d.addEventListener("mouseover", e => {

        if (e.target == $menuLink || e.target == $submenu) {
        
            $submenu.classList.toggle("visible")
        }
    })
    
    
    $nav.addEventListener("mouseleave", () => {
    
    
        $submenu.classList.remove("visible")
    })

})());


