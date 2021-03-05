module.exports = function usuariosHandler(usuarios) {
  return {
    get: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (usuarios[data.indice]) {
          return callback(200, usuarios[data.indice]);
        }
        return callback(404, { mensaje: "indice no encontrado" });
      }
      callback(200, usuarios);
    },
    post: (data, callback) => {
      usuarios.push(data.payload);
      callback(201, data.payload);
    },
    put: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (usuarios[data.indice]) {
          usuarios[data.indice] = data.payload;
          return callback(200, usuarios[data.indice]);
        }
        return callback(404, { mensaje: "indice no encontrado" });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
    delete: (data, callback) => {
      if (typeof data.indice !== "undefined") {
        if (usuarios[data.indice]) {
          usuarios = usuarios.filter(
            (_item, indice) => indice != data.indice
          ); // debe ser solo !=
          return callback(204, { mensaje: "elemento eliminado" });
        }
        return callback(404, { mensaje: "indice no encontrado" });
      }
      callback(400, { mensaje: "indice no enviado" });
    },
  };
};
