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

    let shoppingCart = document.querySelector(".shopping-cart")
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

    /* Variables para actualización de cantidad "actualizar carrit" */

    let datosPedido;
    let updatedListaProducto;
    let updatedProductos;
    let contadorPedido;
    let objetoPedido = {};



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
        if (actualProduct.childNodes[7]) {
            actualProduct.childNodes[7].firstElementChild.value = segundoNumero.split("").reverse().join("")
        }
        


    })


/*     document.querySelector(".main > .wrapperResults").addEventListener("click", e => {
        
        if (e.target.parentElement.href != undefined) {alert("clickazo")}
    }) */


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
                                    document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"

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
                                        objetoFetch[indiceObjeto] = cantidadObjeto.split("").reverse().join("")
                            
                                    }) 

                             
    

                                    if (window.localStorage.getItem("productos").split(",") == "") {
             
                                        document.querySelector("body > section.main > div").outerHTML = "<h2>No tiene productos en el carrito</h2>"
                                        setTimeout(() => {

                                            document.querySelector(".shopping-cart").innerHTML = 0
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

            shoppingCart.innerHTML = window.localStorage.getItem("productos").split(",").length
     

        } 

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
                                    document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"

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
                                        objetoFetch[indiceObjeto] = cantidadObjeto.split("").reverse().join("")
                            
                                    }) 

                                    if (objetoFetch) {

                                        console.log(objetoFetch, "aca")
                                        
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
                                    
                                        console.log(data.test)


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
                                            <td data-label="Subtotal">${e['precio'] * e['cantidad']}</td>
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
    })


    function actualizarCarrito (pedido) {

        updatedProductos =""
    updatedListaProducto =""
    contadorPedido = 1;
    datosPedido = document.querySelectorAll("body > section.main > div > table > tbody > tr > td")
    datosPedido.forEach(n => {
        if (n.dataset.label == "Cantidad") {
 
            if (document.querySelectorAll("body > section.main > div > table > tbody > tr").length == contadorPedido) {
                updatedListaProducto += `${n.parentElement.dataset.number}:${n.firstElementChild.valueAsNumber}`
                updatedProductos += n.parentElement.dataset.number
            } else {
                updatedProductos += n.parentElement.dataset.number + ","
                updatedListaProducto += `${n.parentElement.dataset.number}:${n.firstElementChild.valueAsNumber},`
            }
            

            
            contadorPedido++
        }
    })

    /* Comienza a cargar los cambios */

    if (!pedido) {
        document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"
    }


    /* Se cambian los datos a nivel localStorage */
    window.localStorage.removeItem("listaproducto")
    window.localStorage.removeItem("productos")
    window.localStorage.setItem("listaproducto", updatedListaProducto)
    window.localStorage.setItem("productos", updatedProductos)

    updatedListaProducto = updatedListaProducto.split(",")
    console.log(updatedListaProducto)

    primerNumero = ""
    segundoNumero = ""
    objetoPedido = {}

    updatedListaProducto.forEach((par) => {
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
    
        objetoPedido[primerNumero] = segundoNumero.split("").reverse().join("")
    

    })

    /* Se traen los productos nuevamente, con sus cantidades actualizadas */

    fetch("/checkout/update", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoPedido)
    })
    .then(res => res.json())
    .then(data => {
    

        console.log(data.test)

        if(!pedido) {
            
        data.test.forEach(n => {
            
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
                <td data-label="Subtotal">${e['precio'] * e['cantidad']}</td>
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
                    if (window.localStorage.getItem("productos").split(",").length) {
                        shoppingCart.innerHTML = window.localStorage.getItem("productos").split(",").length

                    }
            }, 300)

        
        })
        }


    })
  
    }


    if (document.querySelector("#buttonPedido")) {
        document.querySelector("#buttonPedido").addEventListener("click", e => {
            actualizarCarrito(false)        
        })
    }




/* Enviar datos a pedido */

if (document.querySelector("#buttonComprar")) {
    document.querySelector("#buttonComprar").addEventListener("click", e => {

        actualizarCarrito(true)
        document.querySelector("body > section.main > div > table").outerHTML = "<div class='lds-ring'><div></div><div></div><div></div><div></div></div>"
        document.querySelector("body > section.main > div.checkout-buttons").outerHTML = ""
        e.preventDefault()
        url = "/checkout"
    
        let product_list = window.localStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            alert("No tiene productos agregados a su carrito")
        } else {
            product_list = product_list.split(",")
    
            let objeto = {}
    
    
            let primerNumero ="";
            let segundoNumero ="";
    
    
            product_list.forEach((par) => {
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
    
                objeto[primerNumero] = segundoNumero.split("").reverse().join("")
            
    
            })


    
    
            fetch("/pedido", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objeto)
            })
            .then(res => res.json())
            .then(data => {
    
                if (data.length == product_list.length) {
                    window.location.href = "/pedido"
                } 
            })
        }
    
    })
}



  
})());


