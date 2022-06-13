((function(){


    let asideCart = document.querySelector(".btnCart > p")
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
        asideCart.innerHTML = listaProductoLength



    } else {
        shoppingCart.innerHTML = 0
        asideCart.innerHTML = 0

    }
    if (window.localStorage.getItem("listaproducto")) {
        setTimeout(() => {
            if (window.localStorage.getItem("listaproducto").length == 0 || window.localStorage.getItem("productos") == 0) {
                window.localStorage.removeItem('listaproducto');
                window.localStorage.removeItem('productos');
                shoppingCart.innerHTML = 0
                asideCart.innerHTML = 0
    
            }
        }, 100)
    }



    productsWrapper.addEventListener("click", e => {

        try {

        } catch (err) {
            console.log(err)
        }
        if (e.target.href != undefined) {
            e.preventDefault()

            let selectedProduct = undefined;

            
                if (myStorage.getItem("listaproducto") == null) {


/*                     if(e.target.dataset.type === 'single') {
                        selectedProduct = document.querySelector(`#product-${e.target.dataset.id} > div > div > div > a`)
                    } else {
                        selectedProduct = document.querySelector(`#product-${e.target.dataset.id}> div > a`)
                    } */

                    selectedProduct = document.querySelector(`#product-${e.target.dataset.id} input`)

                    selectedProductAmount = selectedProduct.value
        
                    myStorage.setItem("productos", e.target.dataset.id)
                    myStorage.setItem("listaproducto", `${e.target.dataset.id}:${selectedProductAmount}`)
        
                    
                    productList = myStorage.getItem("listaproducto")
        
                    shoppingCartAmount = productList.split(',').length
                    shoppingCart.innerHTML = shoppingCartAmount   
                    asideCart.innerHTML = shoppingCartAmount
     
                    
        
                } else {
                    esIgual = false;
    
                    productList = myStorage.getItem("listaproducto")
                    idList = myStorage.getItem("productos")
        
        
                    productoActual = e.target.dataset.id  
                    productArray = idList.split(',')
        
                    productArray.forEach(e => {
            
                        if (e == productoActual) {
                            esIgual = true
    
                        } 
                       
                    })
        
                    if (esIgual == false) {
        
                        /* Añadiendo cantidad */
/*                         if(e.target.dataset.type === 'single') {
                            selectedProduct = document.querySelector(`#product-${e.target.dataset.id} input`)
                        } else {
                            selectedProduct = document.querySelector(`#product-${e.target.dataset.id} input`)
                        } */
                        
                        selectedProduct = document.querySelector(`#product-${e.target.dataset.id} input`)
                        selectedProductAmount = selectedProduct.value
        
                        if (firstTime == false) {
                            productList += `,${productoActual}:${selectedProductAmount}`
                            idList += `,${productoActual}`
                            firstTime = true;
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
                        asideCart.innerHTML = shoppingCartAmount
    
                    } 
        
                }
        
            
            
         
    
        }
    })

})());