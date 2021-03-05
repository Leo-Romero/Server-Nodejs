module.exports = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es /ruta'});
    },
    usuarios: {
        get: (data, callback) => {
            if(typeof data.indice !== "undefined") {
                if(global.recursos.usuarios[data.indice]) {
                    return callback(200, global.recursos.usuarios[data.indice]);
                }
                return callback(404, {mensaje: 'no encontrado'});
            }
            callback(200, global.recursos.usuarios);
        },
        post: (data, callback) => {
            global.recursos.usuarios.push(data.payload);
            callback(201, data.payload);
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}