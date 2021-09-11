const d = document;
const $btnSubmit = d.querySelector('#formBrand')
const $indexForms = d.querySelector('.index-forms')
const body = document.body
export function getSubmodels () {
    

    d.addEventListener("submit", e => {
        e.preventDefault()

        if (e.target == $btnSubmit) {
            let url = `/brands`
            fetch(url)
            .then(res => res.json())
            .then(data => {
                let newForm = d.createElement("form")
                newForm.setAttribute("method", "POST")
                newForm.setAttribute("action", "/year" )

                body.appendChild(newForm)
                let formDatalist = `<input list="submodel" name="submodel">
                                    <datalist id="submodel">
                                    `
                data.forEach((n) => {
                    let txt = `<option value=${n.nombre} data-id=${n.id_producto}></option>`
                    formDatalist+= txt
                })

                newForm.insertAdjacentHTML("beforeend", formDatalist)
                newForm.insertAdjacentHTML("beforeend", '<input type="submit" value=">>" id="btnSubmodels">')  
                $indexForms.appendChild(newForm)
            })
        }
    })




    
    return true
}