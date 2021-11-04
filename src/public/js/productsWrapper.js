((function(){
	let myStorage = window.localStorage
    let listaProducto = myStorage.getItem("listaproducto")
    let shoppingCart = document.querySelector(".shopping-cart")
    let productsWrapper = document.querySelector(".products")
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
    setTimeout(() => {
        if (window.localStorage.getItem("listaproducto").length == 0 || window.localStorage.getItem("productos") == 0) {
            shoppingCart.innerHTML = 0
        }
    }, 100)


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

})());