((function(){

    /* document.querySelector("#pedidoForm > div.wrapperResults > table > tbody > tr") */
    let datos = document.querySelectorAll("#pedidoForm > div.wrapperResults > table > tbody > tr")
    let total = 0
    let shoppingCart = document.querySelector(".shopping-cart")
    let productosLen = window.localStorage.getItem("productos").split(",").length
    let formDataPedido;
    let pedidoForm = document.querySelector("#pedidoForm")


    shoppingCart.innerHTML = productosLen
    datos.forEach(n => {
        num = parseInt(n.lastElementChild.innerHTML)
 
        if (num > 0) {
            console.log(num, total)
            total += num
        }
      


    })
    
    document.querySelector("#totalPrice").innerHTML = `<strong>${total}<strong>`
    /* document.querySelector("#totalPrice > input[type=text]").value = `<strong>${total}<strong>` */



    document.querySelector("#pedidoForm > div.client-data > div.wrap-empresa > div > input[type=radio]:nth-child(1)").addEventListener("click", e => {
        document.querySelector(".name").outerHTML = 
        `
        <div class="name">
        <label for="nombre">Empresa<span style="color:red; margin-left:5px;">*</span></label>
        <input type="text" name="nombre" id="inputNombre" required>
        </div>
         `
        document.querySelector(".surname").outerHTML = 
        `
        <div class="surname">
            <label for="giro">Giro empresa<span style="color:red; margin-left:5px;">*</span></label>
            <input type="text" name="giro" id="inputApellido" required>
        </div>
        `
    })

    document.querySelector("#pedidoForm > div.client-data > div.wrap-empresa > div > input[type=radio]:nth-child(3)").addEventListener("click", e => {
        document.querySelector(".name").outerHTML = 
        `
        <div class="name">
        <label for="nombre">Nombre<span style="color:red; margin-left:5px;">*</span></label>
        <input type="text" name="nombre" id="inputNombre" required>
        </div>
         `
        document.querySelector(".surname").outerHTML = 
        `
        
        <div class="surname">
        <label for="apellido">Apellido<span style="color:red; margin-left:5px;">*</span></label>
        <input type="text" name="apellido" id="inputApellido" required>
        </div>
        `

    })

/*     pedidoForm.addEventListener("submit", e => {
        alert("ok")
        e.preventDefault()
        formDataPedido = new FormData(pedidoForm)
        console.log(formDataPedido.get("direccion"))




    }) */

})());