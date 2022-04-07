(() => {
    
    let batteryLogo = document.getElementById("battery-logo")
    let filterLogo = document.getElementById("filter-logo")


    batteryLogo.addEventListener('click', () => {
        alert("bateria")
        window.location.href = "/categories/neumaticos"
    })

    filterLogo.addEventListener('click', () => {
        window.location.href = "/categories/filtro"
    })


})()