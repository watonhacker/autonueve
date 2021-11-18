const d = document;

export function printSubmodels () {



    document.getElementById('inputModel').addEventListener('input', function () {
        console.log('changed'); 
        var selectedModel = document.getElementById("inputModel").value;
        let $submodelDatalist = d.createElement("datalist")
        const $formSubmodel = d.querySelector("#formSubmodels")
        const $inputSubmodel = d.querySelector("#inputSubmodel")
        const $inputModel = d.querySelector("#inputModel")
        let url = `/submodels?model=${selectedModel}`
        
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
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



/*     var textbox = document.getElementById("formModels");
    textbox.addEventListener("input", function(e){
        var isInputEvent = (Object.prototype.toString.call(e).indexOf("InputEvent") > -1);
        let $submodelDatalist = d.createElement("datalist")
        const $formSubmodel = d.querySelector("#formSubmodels")
        const $inputSubmodel = d.querySelector("#inputSubmodel")
        const $inputModel = d.querySelector("#inputModel")
        let selectedModel = e.target.value
        let url = `/submodels?model=${selectedModel}`
        if(!isInputEvent)

            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data.results)
                $submodelDatalist.setAttribute("id", "submodel")
                $formSubmodel.insertAdjacentElement("beforeend", $submodelDatalist)

                data.results.forEach(element => {
                    let txt = `<option value='${element.nombre}' data-id=${element.id}>${element.nombre}</option>`
                    $submodelDatalist.insertAdjacentHTML("beforeend", txt)
                })

                $inputSubmodel.disabled = false;
                $inputModel.disabled = true;
            
            })


        }, false); */
}