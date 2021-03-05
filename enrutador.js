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
                return callback(404, {mensaje: 'indice no encontrado'});
            }
            callback(200, global.recursos.usuarios);
        },
        post: (data, callback) => {
            global.recursos.usuarios.push(data.payload);
            callback(201, data.payload);
        },
        put: (data, callback) => {
            if(typeof data.indice !== "undefined") {
                if(global.recursos.usuarios[data.indice]) {
                    global.recursos.usuarios[data.indice] = data.payload;
                    return callback(200, global.recursos.usuarios[data.indice]);
                }
                return callback(404, {mensaje: 'indice no encontrado'});
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
        delete: (data, callback) => {
            if(typeof data.indice !== "undefined") {
                if(global.recursos.usuarios[data.indice]) {
                    global.recursos.usuarios = global.recursos.usuarios.filter(
                        (_item, indice)=>indice != data.indice); // debe ser solo !=
                    return callback(204, {mensaje: 'elemento eliminado'});
                }
                return callback(404, {mensaje: 'indice no encontrado'});
            }
            callback(400, {mensaje: 'indice no enviado'});
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}