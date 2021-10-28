((function(){

    let listaProducto = window.localStorage.getItem("listaproducto")
    listaProducto = listaProducto.split(",")
    let objeto = {}
    let primerNumero = ""
    let segundoNumero = ""


    /* Elementos del DOM */

    let wrapperResults = document.querySelector(".wrapperResults")
    let actualProduct;


    listaProducto.forEach((par) => {
        primerNumero = ""
        segundoNumero = ""
        for (element of par) {
            
            if (element != ":") {
                primerNumero += element
            } else {
                console.log(primerNumero)
                break
            }
        }
        
        let newString = "";
        for (let i = par.length - 1; i >= 0; i--) {
            newString += par[i];
        }


        for (element of newString) {
            if (element != ":") {
                segundoNumero += element
            } else {
                console.log(segundoNumero)
        
                break
            }
        }

        objeto[primerNumero] = segundoNumero

        actualProduct = document.querySelector(`[data-number='${primerNumero}']`)
        actualProduct.childNodes[7].firstElementChild.value = segundoNumero

        console.log("---")
    })

    console.log(objeto)



        
})());


