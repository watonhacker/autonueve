const d = document;

export function printModels () {

    if (document.getElementById('inputBrand')) {
        document.getElementById('inputBrand').addEventListener('input', function () {

            var val = document.getElementById("inputBrand").value;
            let selectedBrand = val;
            let $modelDatalist = d.createElement("datalist")
            const $formModel = d.querySelector("#formModels")
            const $inputModel = d.querySelector("#inputModel")
            const $inputBrand = d.querySelector("#inputBrand")
            let url = `/models?brand=${selectedBrand}`
    
    
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
            .catch(err => {
                throw err;
            })
        });
    }
    
}