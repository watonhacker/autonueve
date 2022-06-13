(() => {
    
    let batteryLogo = document.getElementById("battery-logo")
    let filterLogo = document.getElementById("filter-logo")
    let aceiteLogo = document.getElementById("aceite-logo")
    let neumaticosLogo = document.getElementById("neumaticos-logo")
    


    batteryLogo.addEventListener('click', () => {
        window.location.href = "/categories/bateria"
    })

    filterLogo.addEventListener('click', () => {
        window.location.href = "/categories/filtro"
    })

    aceiteLogo.addEventListener('click', () => {
        window.location.href = "/categories/aceite"
    })

    neumaticosLogo.addEventListener('click', () => {
        window.location.href = "/categories/neumaticos"
    })


})()