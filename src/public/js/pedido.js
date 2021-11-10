((function(){

    /* document.querySelector("#pedidoForm > div.wrapperResults > table > tbody > tr") */
    let datos = document.querySelectorAll("#pedidoForm > div.wrapperResults > table > tbody > tr")
    let total = 0
    let shoppingCart = document.querySelector(".shopping-cart")
    let productosLen = window.localStorage.getItem("productos").split(",").length
    let inputEmpresa = document.querySelector("#inputEmpresa")
    let esEmpresa;


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



  
/*     inputEmpresa.addEventListener("click", e => {
        
        esEmpresa = true;
     
        document.querySelector(".client-data").outerHTML = "<div class='client-data'><div class='lds-ring'><div></div><div></div><div></div><div></div></div></div>"

        

            document.querySelector(".client-data").outerHTML = 
            `
            <div class="client-data">
            <h3>Detalles de Facturación</h3>
            <h4>Datos Empresa</h2>
            <div class="wrap-empresa">
            <label for="empresa">¿Es cliente particular?</label>
            <input type="radio" name="empresa" id="inputParticular">
            </div>
    
            <div class="wrap-name">
                <div class="name">
                    <label for="nombre">Empresa<span style="color:red; margin-left:5px;">*</span></label>
                    <input type="text" name="nombre" id="inputNombre">
                </div>
                <div class="surname">
                    <label for="giro">Giro empresa<span style="color:red; margin-left:5px;">*</span></label>
                    <input type="text" name="giro" id="inputApellido">
                </div>
    
    
            </div>
            
    
            <label for="email">Email<span style="color:red; margin-left:5px;">*</span></label>
            <input type="email" name="email">
            <label for="phone">Teléfono<span style="color:red; margin-left:5px;">*</span></label>
            <input type="text" name="phone">
            <label for="rut">Rut<span style="color:red; margin-left:5px;">*</span></label>
            <input type="text" name="rut">
        </div>
            
            `
            if (esEmpresa){
                let inputParticular = document.querySelector("#inputParticular")
                
                inputParticular.addEventListener("click", e =>{
                    document.querySelector(".client-data").outerHTML = 
                    `
                    <div class="client-data">
                    <h3>Detalles de Facturación</h3>
                    <h4>Datos cliente</h2>
                    <div class="wrap-empresa">
                                <label for="empresa">¿Es cliente empresa?</label>
                    <input type="radio" name="empresa" id="inputEmpresa">
                    </div>
            
                    <div class="wrap-name">
                        <div class="name">
                            <label for="nombre">Nombre<span style="color:red; margin-left:5px;">*</span></label>
                            <input type="text" name="nombre" id="inputNombre">
                        </div>
                        <div class="surname">
                            <label for="apellido">Apellido<span style="color:red; margin-left:5px;">*</span></label>
                            <input type="text" name="apellido" id="inputApellido">
                        </div>
            
            
                    </div>
                    
            
                    <label for="email">Email<span style="color:red; margin-left:5px;">*</span></label>
                    <input type="email" name="email">
                    <label for="phone">Teléfono<span style="color:red; margin-left:5px;">*</span></label>
                    <input type="text" name="phone">
                    <label for="rut">Rut<span style="color:red; margin-left:5px;">*</span></label>
                    <input type="text" name="rut">
                </div>
                    `
                })

                esEmpresa = false;
        
            }     
    }) */







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



})());