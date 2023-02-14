const d = document

import { printModels } from "/js/spareSearcher/printModels.js"
import { getSubmodels } from "/js/spareSearcher/getSubmodels.js"
import { printSubmodels } from "/js/spareSearcher/printSubmodels.js"
import { printYears } from "/js/spareSearcher/printYears.js"
import { searchBtn } from "./spareSearcher/searchBtn.js"
import hamburgerMenu from "./hamburgerBtn.js";
import responsiveQueries from "./responsive.js";

const getFamilias = async () => {
    fetch('/api/marca').then(res => res.json()).then(data => {
        window.localStorage.setItem('marca', JSON.stringify(data))
    })
    fetch('/api/modelo').then(res => res.json()).then(data => {
        window.localStorage.setItem('modelo', JSON.stringify(data))
    })
    fetch('/api/submodelo').then(res => res.json()).then(data => {
        window.localStorage.setItem('submodelo', JSON.stringify(data))
    })
    fetch('/api/listasubmodelo').then(res => res.json()).then(data => {
        window.localStorage.setItem('listasubmodelo', JSON.stringify(data))
    })
    // fetch('/api/fabricacion').then(res => res.json()).then(data => {
    //     window.localStorage.setItem('fabricacion', JSON.stringify(data))
    // })
}

d.addEventListener("DOMContentLoaded", () => {

    responsiveQueries("btn-menu", "(min-width: 768px)", "hidden");
    hamburgerMenu(".nav-btn", ".nav-menu", ".nav-menu a", "active");
    getSubmodels()
    printSubmodels()
    printYears()
    printModels()
    searchBtn()
    getFamilias()



})


if (window.localStorage.getItem("listaproducto")) {
    setTimeout(() => {
        if (window.localStorage.getItem("listaproducto").split(",").length == 0 || window.localStorage.getItem("productos").split(",") == 0) {
    
            window.localStorage.removeItem("listaproducto")
            window.localStorage.removeItem("productos")
        }
    }, 100)
}

