const d = document;

export function searchBtn () {
    const $searchBtn = d.querySelector('#btnSearch')

    $searchBtn.disabled = true;

    $searchBtn.addEventListener("click", e => {
        alert("click")
    })


    var submodelsBox = document.getElementById("formYears");


    submodelsBox.addEventListener("input", function(e){
        var isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
        let $brandId = d.querySelector("#brand > option")
        let $modelId = d.querySelector("#model > option")
        let $submodelId = d.querySelector("#submodel > option")
        let $yearId = d.querySelector("#year > option")

        if(!isInputEvent)
            $brandId = $brandId.getAttribute("data-id")
            $modelId = $modelId.getAttribute("data-id")
            $submodelId = $submodelId.getAttribute("data-id")
            $yearId = $yearId.getAttribute("data-id")

            location.href = `/search?submodel=${$submodelId}&year=${$yearId}`

          

   
            
           
            
    }, false);


}