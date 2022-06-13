const d = document;

export function printSubmodels () {

    if (document.getElementById('inputModel')) {
        document.getElementById('inputModel').addEventListener('input', function () {

            var selectedModel = document.getElementById("inputModel").value;
            let $submodelDatalist = d.createElement("datalist")
            const $formSubmodel = d.querySelector("#formSubmodels")
            const $inputSubmodel = d.querySelector("#inputSubmodel")
            const $inputModel = d.querySelector("#inputModel")
            let url = `/submodels?model=${selectedModel}`
            
            fetch(url)
            .then(res => res.json())
            .then(data => {
    
                $submodelDatalist.setAttribute("id", "submodel")
                $formSubmodel.insertAdjacentElement("beforeend", $submodelDatalist)
    
                data.results.forEach(element => {
                    let txt = `<option value='${element.nombre}' data-id=${element.id}>${element.nombre}</option>`
                    $submodelDatalist.insertAdjacentHTML("beforeend", txt)
                })
    
                $inputSubmodel.disabled = false;
                $inputModel.disabled = true;
            
            })
            .catch(err => {
                throw err;
            })
        });
    

    }

   


}