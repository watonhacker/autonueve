((function(){




    
    let listaProducto = window.localStorage.getItem("listaproducto")
    let productos = window.localStorage.getItem("productos")
    productos = productos.split(",")
    listaProducto = listaProducto.split(",")
    let objeto = {}
    let objetoFetch = {}
    let primerNumero = ""
    let segundoNumero = ""
    let contadorPar = 0
    let arrayProductos = window.localStorage.getItem("productos").split(",")

    let indiceObjeto = ""
    let cantidadObjeto = ""

    /* variables para eliminado */

    let $tableResults = document.querySelector(".tableResults")
    let $deletedProduct = ""


    /* Elementos del DOM */

    let wrapperResults = document.querySelector(".wrapperResults")
    let actualProduct;

    /* Start */

    let shoppingCart = document.querySelector("#shopping-cart")
    if (listaProducto != null) {
        let listaProductoLength = listaProducto.length
        shoppingCart.innerHTML = listaProductoLength

    } else {
        shoppingCart.innerHTML = 0
    }
    
    setTimeout(() => {
        if (window.localStorage.getItem("listaproducto").length == 0 || window.localStorage.getItem("productos") == 0) {
    
            window.localStorage.removeItem("listaproducto")
            window.localStorage.removeItem("productos")
        }
    }, 100)



    listaProducto.forEach((par) => {
        primerNumero = ""
        segundoNumero = ""
        for (element of par) {
            
            if (element != ":") {
                primerNumero += element
            } else {

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

        
                break
            }
        }

        objeto[primerNumero] = segundoNumero

        actualProduct = document.querySelector(`[data-number='${primerNumero}']`)
        actualProduct.childNodes[7].firstElementChild.value = segundoNumero


    })



    document.querySelector(".wrapperResults").addEventListener("click", e => {
        e.preventDefault()

        if (e.target.href != undefined) {
            e.preventDefault()

        }
        if (e.target.parentElement.href != undefined) {

            e.preventDefault()
            $deletedProduct = e.target.parentElement.parentElement.parentElement.dataset.number
            contadorPar = -1
       
            
            listaProducto.forEach((par) => {

                primerNumero = ""
                segundoNumero = ""
                for (element of par) {
                    
                    if (element != ":") {
                        primerNumero += element
        
                    } else {
                        contadorPar++
                        if (primerNumero == $deletedProduct) {
  
                            listaProducto.splice(contadorPar, 1)
                            window.localStorage.removeItem("listaproducto")
                            window.localStorage.setItem("listaproducto", listaProducto.join(","))
                            for (producto in arrayProductos) {

                                if (arrayProductos[producto] == primerNumero) {
                                    arrayProductos.splice(producto, 1)
                                    window.localStorage.removeItem("productos")
                                    window.localStorage.setItem("productos", arrayProductos)
                                    document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-dual-ring'></div>"

                                    objetoFetch = {}
    
                       
                            
                            
                                    window.localStorage.getItem("listaproducto").split(",").forEach((par) => {
                                        indiceObjeto = "";
                                        cantidadObjeto = "";
                                        for (element of par) {
                                            
                                            if (element != ":") {
                                                indiceObjeto += element
                                            } else {
                                                break
                                            }
                                        }
                                        
                                        let newString = "";
                                        for (let i = par.length - 1; i >= 0; i--) {
                                            newString += par[i];
                                        }
                                    
                                    
                                        for (element of newString) {
                                            if (element != ":") {
                                                cantidadObjeto += element
                                            } else {
                            
                                                break
                                            }
                                        }
                                        objetoFetch[indiceObjeto] = cantidadObjeto
                            
                                    }) 

                             
    

                                    if (window.localStorage.getItem("productos").split(",") == "") {
             
                                        document.querySelector("body > section.main > div").outerHTML = "<h2>No tiene productos en el carrito</h2>"
                                        setTimeout(() => {

                                            document.querySelector("#shopping-cart").innerHTML = 0
                                        }, 100)

                                        setTimeout(() => {
                                            window.location.href = "/"
                                        }, 200)
                                    } else {

                                        fetch("/checkout/update", {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(objetoFetch)
                                        })
                                        .then(res => res.json())
                                        .then(data => {
                     
    
                                            updatedTable = `
                                            <table class="tableResults">
                                                <thead>
                                                    <th>Eliminar</th>
                                                    <th>Producto</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th>Subtotal</th>
                                                </thead>
                                                <tbody>
                                            `
    
                                            data.test.forEach(e => {
                    
                                                updatedTable +=
                
                                                `
                                                <tr data-number="${e['id']}">
                                                <td data-label="Eliminar"><a href="${e['id']}"><i class="far fa-trash-alt"></i></a></td>
                                                <td data-label="Producto"="">${e['nombre']}</td>
                                                <td data-label="Precio">${e['precio']}</td>
                                                <td data-label="Cantidad">
                                                    <input type="number" class="number" min="1" value="${e['cantidad']}" max="20">
                                                </td>
                                                <td data-label="Subtotal">${e['precio']}</td>
                                                </tr>
                                                
                                                `
                            
                                            })
    
                                            updatedTable += `
                                            </tbody>
                                            </table>
                                            `
                                            document.querySelector("body > section.main > div").innerHTML = ""
                                            document.querySelector("body > section.main > div").innerHTML = updatedTable
                      
    
    
                                        })
                                    }
                                            

                                }
                            }
        
                            contadorPar = 0
                            break
                        }
                        
                        break
                    }
                       
                }
        
  

            })

    

        } 



            shoppingCart.innerHTML = window.localStorage.getItem("productos").split(",").length
  




    })

    $tableResults.addEventListener("click", e => {
        if (e.target.href != undefined) {
            e.preventDefault()

        }
        if (e.target.parentElement.href != undefined && window.localStorage.getItem("productos").length > 0) {

            
            e.preventDefault()
            $deletedProduct = e.target.parentElement.parentElement.parentElement.dataset.number
            contadorPar = -1
       
            
            listaProducto.forEach((par) => {

                primerNumero = ""
                segundoNumero = ""
                for (element of par) {
                    
                    if (element != ":") {
                        primerNumero += element
        
                    } else {
                        contadorPar++
                        if (primerNumero == $deletedProduct) {
                 
                            listaProducto.splice(contadorPar, 1)
                            window.localStorage.removeItem("listaproducto")
                            window.localStorage.setItem("listaproducto", listaProducto.join(","))
                            for (producto in arrayProductos) {

                                if (arrayProductos[producto] == primerNumero) {
                                    arrayProductos.splice(producto, 1)
                                    window.localStorage.removeItem("productos")
                                    window.localStorage.setItem("productos", arrayProductos)
                                    document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-dual-ring'></div>"

                                    objetoFetch = {}
    
                       
                            
                            
                                    window.localStorage.getItem("listaproducto").split(",").forEach((par) => {
                                        indiceObjeto = "";
                                        cantidadObjeto = "";
                                        for (element of par) {
                                            
                                            if (element != ":") {
                                                indiceObjeto += element
                                            } else {
                                                break
                                            }
                                        }
                                        
                                        let newString = "";
                                        for (let i = par.length - 1; i >= 0; i--) {
                                            newString += par[i];
                                        }
                                    
                                    
                                        for (element of newString) {
                                            if (element != ":") {
                                                cantidadObjeto += element
                                            } else {
                            
                                                break
                                            }
                                        }
                                        objetoFetch[indiceObjeto] = cantidadObjeto
                            
                                    }) 
                                                                               

                                    fetch("/checkout/update", {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(objetoFetch)
                                    })
                                    .then(res => res.json())
                                    .then(data => {


                                        updatedTable = `
                                        <table class="tableResults">
                                            <thead>
                                                <th>Eliminar</th>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Cantidad</th>
                                                <th>Subtotal</th>
                                            </thead>
                                            <tbody>
                                        `

                                        data.test.forEach(e => {
        
                                            updatedTable +=
            
                                            `
                                            <tr data-number="${e['id']}">
                                            <td data-label="Eliminar"><a href="${e['id']}"><i class="far fa-trash-alt"></i></a></td>
                                            <td data-label="Producto"="">${e['nombre']}</td>
                                            <td data-label="Precio">${e['precio']}</td>
                                            <td data-label="Cantidad">
                                                <input type="number" class="number" min="1" value="${e['cantidad']}" max="20">
                                            </td>
                                            <td data-label="Subtotal">${e['precio']}</td>
                                            </tr>
                                            
                                            `
                        
                                        })

                                        updatedTable += `
                                        </tbody>
                                        </table>
                                        `
                                        document.querySelector("body > section.main > div").innerHTML = ""
                                        document.querySelector("body > section.main > div").innerHTML = updatedTable
                                        shoppingCart.innerHTML = window.localStorage.getItem("productos").split(",").length

                                        setTimeout(() => {

                                                shoppingCart.innerHTML = window.localStorage.getItem("productos").split(",").length
                           
                          
                                        }, 100)

                 /*                        <table class="tableResults">
                                        <thead>
                                            {{!-- <tr class="firstColumn"><td></td><td>Producto</td><td>Precio</td></tr> --}}
                                            <th>Eliminar</th>
                                            <th>Producto</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </thead>
                                        
                                        <tbody>
                                            {{#each listaProductos}}    
                                                    <tr data-number="{{id}}">
                                                        <td data-label="Eliminar"><a href="{{id}}"><i class="far fa-trash-alt"></i></a></td>
                                                        <td data-label="Producto"="">{{nombre}}</td>
                                                        <td data-label="Precio">{{ precio }}</td>
                                                        <td data-label="Cantidad">
                                                            <input type="number" class="number" min="1" value="1" max="20">
                                                        </td>
                                                        <td data-label="Subtotal">{{{price precio cantidad}}}</td>
                                                    
                                                    </tr>
                                            {{/each}}
                                        </tbody>
                                    
                                        </table> */
                                    })
                                }
                            }
        
                            contadorPar = 0
                            break
                        }
                        
                        break
                    }
                       
                }
        
  

            })

    

        } 
    })



        
})());


