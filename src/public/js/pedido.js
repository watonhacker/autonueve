((function(){

 let datos = document.querySelectorAll("body > section.main > div.wrapperResults > table > tbody > tr")
 let total = 0
    datos.forEach(n => {
        num = parseInt(n.lastElementChild.innerHTML)
 
        if (num > 0) {
            console.log(num)
            total += num
        }
      


    })
    document.querySelector("#totalPrice").innerHTML = `<strong>${total}<strong>`

})());