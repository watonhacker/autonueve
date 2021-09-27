/* let lista = [3,2,3,4,5,1]
let contador = 0;
let contadorPagina = 1
let lenLista = lista.length

lista.forEach(element => {
    contador++
    if (contadorPagina == 1){
        if (contador == 11) {
            contadorPagina += 1
            contador = 0
        }
    } else {
        if (contador == 10) {
            contadorPagina += 1
            contador = 0
        }
    }
 
})

console.log(lenLista)
console.log(contadorPagina) */

let listaObjetos = [{1:1},{2:2},{3:3},{4:4},{5:5},{6:6},{7:7},{8:8},{9:9},{10:10},{11:11},{12:12},{13:13},{14:14},{15:15},{16:16},{17:17},{18:18},{19:19},{20:20}, {21:21}, {22:22}]
let lenListaObjetos = listaObjetos.length
let listaNueva = []
let listaLocal = []
let contadorVuelta = 0
let contadorItem = 0

let resto = lenListaObjetos % 10
let listaResto = []

listaObjetos.forEach(n => {
    
    listaLocal.push(n)
    contadorItem += 1
    contadorVuelta += 1


    console.log(`Resto = ${resto}, listaObj ${lenListaObjetos} - contadorItem ${contadorItem} == ${lenListaObjetos - contadorItem}`)

    if (contadorVuelta == 10) {
        listaNueva.push(listaLocal)
        contadorVuelta = 0
        listaLocal = []
    }

    if (lenListaObjetos - contadorItem < resto) {
        console.log("entramos en los últimos")
        listaResto.push(n)
    }
    
})

if (listaResto[0]) {
listaNueva.push(listaResto)
}


console.log(contadorItem, "contadorVuelta")
console.log(lenListaObjetos, "cantidadTotal")


console.log(listaNueva)
