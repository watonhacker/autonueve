const fabricacionStorageService = require('./fabricacion.storageService');


exports.getAllFabricacion = () => {
    return fabricacionStorageService.getAllFabricacion();
}

exports.createFabricacion = (data) => {
    return fabricacionStorageService.createFabricacion(data);   
}

exports.getFabricacionById = (id) => {
    return fabricacionStorageService.getFabricacionById(id); 
}

