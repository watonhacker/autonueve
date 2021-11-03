((function(){


    let shoppingCart = document.querySelector("#shopping-cart") 

    let myStorage = window.localStorage
    
    let listaProducto = myStorage.getItem("listaproducto")

    shoppingCart.innerHTML = 0
    setTimeout(() => {
        if (listaProducto != null) {
            let listaProductoLength = listaProducto.split(',').length
            shoppingCart.innerHTML = listaProductoLength
    
        } else {
            shoppingCart.innerHTML = 0
        }
    

    }, 300)




 
    

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

                objeto[primerNumero] = segundoNumero.split("").reverse().join("")
            
    
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


