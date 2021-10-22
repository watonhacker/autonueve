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
    let url;

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
                myStorage.setItem("listaproducto", `{${e.target.dataset.id}:${selectedProductAmount}}`)

            
                productList = myStorage.getItem("listaproducto")
                shoppingCartAmount = productList.split(',').length
                shoppingCart.innerHTML = shoppingCartAmount

                firstTime = true;


                
    
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

                    if (firstTime == true) {
                        productList = productList.slice(0, -1)
                        productList += `,${productoActual}:${selectedProductAmount}}`
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
    

    let myObject = {
        1:3,
        2:1
    }

    console.log(myObject)

    let myObjectStringify = JSON.stringify(myObject)

    console.log(myObjectStringify)
    console.log(JSON.parse(myObjectStringify))

    const sendLocalStorage = () => {
        
    }

    document.querySelectorAll("[href='/checkout']")[0].addEventListener("click", e => {
        e.preventDefault()
        alert("click")

        url = "/checkout"
        
        fetch(url, {
            method: 'POST',
            body: 'asd', // The data
            headers: {
                'Content-type': 'Content-Type: text/html; charset=utf-8' 
            }
        })

    })
    document.querySelectorAll("[href='/checkout']")[1].addEventListener("click", e => {
        e.preventDefault()
        alert("click")
        url = "/checkout"

        let inputData = window.localStorage.getItem("listaproducto")
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData) // The data
        })
    })
    
    
})());


