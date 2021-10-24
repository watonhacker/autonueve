((function(){

    let productsWrapper = document.querySelector(".products")
    let shoppingCart = document.querySelector("#shopping-cart")
    console.log(shoppingCart.innerHTML)
    

    let myStorage = window.localStorage
    
    let listaProducto = myStorage.getItem("listaproducto")
    let idProductos = myStorage.getItem("productos")

    let selectedProduct;
    let selectedProductAmount;

    /* Esto es para que no elimine el valor, en lugar de '}' en primera vuelta. */
    let firstTime;

    let idList;
    let productList;

    let productoActual;
    let productArray;

    if (listaProducto != null) {
        let listaProductoLength = listaProducto.split(',').length
        shoppingCart.innerHTML = listaProductoLength

    } else {
        shoppingCart.innerHTML = 0
    }

    productsWrapper.addEventListener("click", e => {
        if (e.target.href != undefined) {
            e.preventDefault()
            if (myStorage.getItem("listaproducto") == null) {
              
                selectedProduct = document.querySelector(`#product-${e.target.dataset.id}> div > a`)

                selectedProductAmount = selectedProduct.previousElementSibling.value

                myStorage.setItem("productos", e.target.dataset.id)
                myStorage.setItem("listaproducto", `${e.target.dataset.id}:${selectedProductAmount}`)

                
                productList = myStorage.getItem("listaproducto")

                shoppingCartAmount = productList.split(',').length
                shoppingCart.innerHTML = shoppingCartAmount            
                
    
            } else {
                esIgual = false;

                productList = myStorage.getItem("listaproducto")
                idList = myStorage.getItem("productos")


                productoActual = e.target.dataset.id  
                productArray = idList.split(',')

                productArray.forEach(e => {
        
                    if (e == productoActual) {
                        esIgual = true
                        console.log(e)
                    } 
                   
                })

                if (esIgual == false) {

                    /* Añadiendo cantidad */
                    
                    selectedProduct = document.querySelector(`#product-${e.target.dataset.id}> div > a`)
                    selectedProductAmount = selectedProduct.previousElementSibling.value

                    if (firstTime == false) {
                        productList += `,${productoActual}:${selectedProductAmount}`
                        idList += `,${productoActual}`
                        firstTime = true;
                        alert("first time, no recortamos el ultimo")
                    } else {
                        /* productList = productList.slice(0, -1) */
                        productList += `,${productoActual}:${selectedProductAmount}`
                        idList += `,${productoActual}`
                    }
      
                    myStorage.removeItem("productos")
                    myStorage.setItem("productos",idList )
                
                    myStorage.removeItem("listaproducto")
                    myStorage.setItem("listaproducto", productList)
                    shoppingCartAmount = productList.split(',').length
                    shoppingCart.innerHTML = shoppingCartAmount
                } 

            }

  
        }
    })
    

    document.querySelectorAll("[href='/checkout']")[0].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let inputData = {id: "abc123", text: "sometext"}
        let product_list = myStorage.getItem("listaproducto")
        
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
            
                objeto[primerNumero] = segundoNumero
            
    
            })
    
            
    
            fetch(url, {
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
                    window.location.href = "/checkout"
                } 
            })
        }


    })
    document.querySelectorAll("[href='/checkout']")[1].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let inputData = {id: "abc123", text: "sometext"}
        let product_list = myStorage.getItem("listaproducto")
        
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
            
                objeto[primerNumero] = segundoNumero
            
    
            })
    
            
    
            fetch(url, {
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
                    window.location.href = "/checkout"
                } 
            })
        }

    })
    
    
})());


