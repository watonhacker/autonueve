((function(){



    let shoppingCart = document.querySelector(".shopping-cart") 

    let myStorage = window.localStorage
    
    let listaProducto = myStorage.getItem("listaproducto")


    document.querySelector(".btnCart").addEventListener("click", e => {


        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
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
    
            const selectedProducts = Object.keys(objeto);
            const selectedAmounts = Object.values(objeto);
            
     
            window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

        }
    })

    if (listaProducto != null) {
        let listaProductoLength = listaProducto.split(',').length
        shoppingCart.innerHTML = listaProductoLength

        

    } else {
        shoppingCart.innerHTML = 0

    }



 
    

    document.querySelectorAll("[href='/checkout']")[0].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let inputData = {id: "abc123", text: "sometext"}
        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
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
    
            
    
    
            const selectedProducts = Object.keys(objeto);
            const selectedAmounts = Object.values(objeto);
            
    
            window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

        }


    })
    document.querySelectorAll("[href='/checkout']")[1].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
        } else {

            try {
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
                
      
    
                const selectedProducts = Object.keys(objeto);
                const selectedAmounts = Object.values(objeto);
            

                window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

    
            
            } catch(err) {
                console.log(err)
            }
            
        }

    })
    document.querySelectorAll("[href='/checkout']")[2].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
        } else {

            try {
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
                
      
    
                const selectedProducts = Object.keys(objeto);
                const selectedAmounts = Object.values(objeto);
            
       
                window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

    
            
            } catch(err) {
                console.log(err)
            }
            
        }

    })
    document.querySelectorAll("[href='/checkout']")[3].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
        } else {

            try {
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
                
      
    
                const selectedProducts = Object.keys(objeto);
                const selectedAmounts = Object.values(objeto);

                window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

    
            
            } catch(err) {
                console.log(err)
            }
            
        }

    })
    document.querySelectorAll("[href='/checkout']")[4].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
        } else {

            try {
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
                
      
    
                const selectedProducts = Object.keys(objeto);
                const selectedAmounts = Object.values(objeto);

                window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

    
            
            } catch(err) {
                console.log(err)
            }
            
        }

    })
    document.querySelectorAll("[href='/checkout']")[5].addEventListener("click", e => {
        e.preventDefault()
        url = "/checkout"

        let product_list = myStorage.getItem("listaproducto")
        
        if (product_list == undefined ){ 
            Swal.fire("No tiene productos agregados a su carrito")
        } else {

            try {
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
                
      
    
                const selectedProducts = Object.keys(objeto);
                const selectedAmounts = Object.values(objeto);

                window.location.href = `/checkout?items=[${selectedProducts}]&amounts=[${selectedAmounts}]`

    
            
            } catch(err) {
                console.log(err)
            }
            
        }

    })

    
    
    
})());


