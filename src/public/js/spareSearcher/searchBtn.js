const d = document;

export function searchBtn () {
    
    var submodelsBox = document.getElementById("formYears");


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
            $submodelId = $submodelId.getAttribute("data-id")



            location.href = `/search?submodel=${$submodelId}&year=${$yearId}&page=1`

          

   
            
           
            
    }, false);


}