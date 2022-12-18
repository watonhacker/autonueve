const d = document;

export function printYears () {
    const $searchBtn = d.querySelector('#btnSearch')

    if (document.getElementById('inputSubmodel')) {

        document.getElementById('inputSubmodel').addEventListener('input', function () {

            var selectedSubmodel = document.getElementById("inputSubmodel").value;
            let $yearDatalist = d.createElement("datalist")
            let $yearForm = d.querySelector("#formYears")
            let $inputYear = d.querySelector("#inputYear")
            let $inputSubmodel = d.querySelector("#inputSubmodel")
            let url = `/years?submodel=${selectedSubmodel}`
    
            fetch(url)
            .then(res => res.json())
            .then(data => {

                debugger;
    
                $yearDatalist.setAttribute("id", "year")
    
                data.results.forEach(n => {
                    let txt = `<option value=${n.fecha} data-id=${n.id}>${n.fecha}</option>`
    
                    $yearDatalist.insertAdjacentHTML("beforeend", txt)
                })
                $inputYear.disabled = false;
                $yearForm.insertAdjacentElement("beforeend", $yearDatalist)

        
                if (window.localStorage.getItem("submodel") != undefined) {
                    window.localStorage.removeItem("submodel")
                    window.localStorage.setItem("submodel", data.SubmodelId)
                } else {
                    window.localStorage.setItem("submodel", data.SubmodelId)
                }
                
               
            })
            .catch(err => {
                throw err;
            })
    
            $inputSubmodel.disabled = true;
        });
        

    }

}