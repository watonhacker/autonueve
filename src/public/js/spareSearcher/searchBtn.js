const d = document;

export function searchBtn () {
    
    let submodelsBox = document.getElementById("formYears");
    let modelsBox = document.getElementById("formSubmodels");



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
        
        console.log(d.querySelector("#year > option"))
    

        if(!isInputEvent)
            $brandId = $brandId.getAttribute("data-id")
            $modelId = $modelId.getAttribute("data-id")
            $submodelId = window.localStorage.getItem("submodel")

            location.href = `/search?submodel=${$submodelId}&year=${$yearId}&page=1`

          

   
            
           
            
    }, false);


}