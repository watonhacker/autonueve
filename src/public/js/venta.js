((function(){

    let shoppingCart = document.querySelector(".shopping-cart")
    const d = document;
    let formPedido = d.querySelector("#pedidoForm")
    let inputPedido = d.querySelector("#pedidoSubmit")
    let btnStorage = d.querySelector("#btnStorage")
    let myStorage = window.localStorage
    let productWrapper = d.querySelector('.product-wrapper')
    let productList = ""
    let esIgual;
    let shoppingCartAmount;

    
    productWrapper.addEventListener("click", e => {

        alert("clickazo")
        
        if (e.target.type == "submit") {

            if (myStorage.getItem("listaproducto") == null) {
                myStorage.setItem("listaproducto", e.target.value)
            } else {
                esIgual = false;

                productList = myStorage.getItem("listaproducto")

                let productoActual = e.target.value    
                let productArray = productList.split(',')

                productArray.forEach(e => {
        
                    if (e == productoActual) {
                        esIgual = true
                    } 
                   
                })

                if (esIgual == false) {
                    productList += `,${productoActual}`
                    myStorage.removeItem("listaproducto")
                    myStorage.setItem("listaproducto", productList)
                } 

            }

            shoppingCartAmount = productList.split(',').length
            shoppingCart.innerHTML = shoppingCartAmount
 

        }

        
    })


  
    formPedido.addEventListener("click", (e) => {

        let formDataPedido = new FormData(formPedido)

    })







    
})());