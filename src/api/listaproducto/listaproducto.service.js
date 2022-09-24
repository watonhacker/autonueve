const listaProductoStorageService = require('./listaproducto.storageService');


exports.getAllListaProducto = () => {
    return listaProductoStorageService.getAllListaProducto();
}

exports.createListaProducto = (listaProducto) => {
    return listaProductoStorageService.createListaProducto(listaProducto);  
}

exports.getListaProductoById = (id) => {
    return listaProductoStorageService.getListaProductoById(id);
}

exports.updateListaProducto = (listaproducto) => {
    return listaProductoStorageService.updateListaProducto(listaproducto);  
}
