const d = document;

export function printModels () {
    var textbox = document.getElementById("formBrand");
    textbox.addEventListener("input", function(e){
        var isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
        let $modelDatalist = d.createElement("datalist")
        const $formModel = d.querySelector("#formModels")
        const $inputModel = d.querySelector("#inputModel")
        const $inputBrand = d.querySelector("#inputBrand")
        let selectedBrand = e.target.value
        let url = `/models?brand=${selectedBrand}`
        if(!isInputEvent)

            fetch(url)
            .then(res => res.json())
            .then(data => {
      
                $modelDatalist.setAttribute("id", "model")
                $formModel.insertAdjacentElement("beforeend", $modelDatalist)

                data.results.forEach(element => {
                    let txt = `<option value='${element.nombre}' data-id=${element.id}>${element.nombre}</option>`
                    $modelDatalist.insertAdjacentHTML("beforeend", txt)
                })

                $inputModel.disabled = false;
                $inputBrand.disabled = true;
            
            })


        }, false);
}