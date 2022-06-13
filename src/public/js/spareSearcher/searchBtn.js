const d = document;

export function searchBtn () {
    
    let submodelsBox = document.getElementById("formYears");
    let modelsBox = document.getElementById("formSubmodels");
    const searchBtn = document.getElementById("search-btn")
    const searchInput = document.getElementById("search-input")

    const searchRequest = async (search) => {
        window.location.href = `/search/${search}/1`
    }

    searchInput.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter" && event.target.value != "" && event.target.value != undefined) {
          // Cancel the default action, if needed
          event.preventDefault();
          searchRequest(event.target.value)
          // Trigger the button element with a click
          document.getElementById("myBtn").click();
        }
      });

    searchBtn.addEventListener("click", e => {
        if (e.target.value != undefined) {
            searchRequest(searchInput.value);   
        }
    })


    if (submodelsBox) {
        submodelsBox.addEventListener("input", function(e){
            var isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
            var isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
            let $brandId;
            let $modelId;
            let $submodelId; 
            let $yearId;
    
    
            $brandId = d.querySelector("#brand > option")
            $modelId = d.querySelector("#model > option")
            $submodelId = d.querySelector("#submodel > option")
            $yearId = e.target.value
                
    
            if(!isInputEvent)
                $brandId = $brandId.getAttribute("data-id")
                $modelId = $modelId.getAttribute("data-id")
                $submodelId = window.localStorage.getItem("submodel")
    
                location.href = `/search/${$submodelId}/${$yearId}/1`
    
              
    
       
                
               
                
        }, false);
    }
    


}