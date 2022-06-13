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

    pedidoForm.addEventListener("submit", e => {
        e.preventDefault()
        formDataPedido = new FormData(pedidoForm)
        let listaproducto = window.localStorage.getItem("listaproducto").split(",")
        let idProductos = window.localStorage.getItem("productos").split(",")
        let nuevoObjeto = {}
        formDataPedido.append("productos", listaproducto)
        formDataPedido.append("idproductos", idProductos)

        for (element of formDataPedido.keys()) {
            nuevoObjeto[element] = formDataPedido.get(element)
        }

        const mailObject = {
            message: "Este es un mensaje enviado desde autonueve.cl",
            mail: formDataPedido.get('email'),
            subject: "[Pedido desde Autonueve.cl]",
            html: `<div>
            <h1 style="color:orange">Felicidades, has generado exitosamente tu pedido</h1>
            <p>Estos son los datos de transferencia: </p>
            <p>Recuerda enviar un correo de confirmación con la foto de tu transferencia a <strong>ventas@autonueve.cl</strong></p>
            </div>`
        }


        Promise.all([
            fetch("/venta", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoObjeto)
            }),
            fetch("/mail/generar", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mailObject)

            })
        ])
        .catch(err => {console.log(err)})
        
        window.localStorage.removeItem('listaproducto')
        window.localStorage.removeItem('productos')
        window.location.href = '/success';
    })

})());