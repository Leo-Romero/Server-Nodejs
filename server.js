const http = require('http');       // servidor http
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let recursos = {
    usuarios: [
        {nombre: 'usuario 1'},
        {nombre: 'usuario 2'},
    ],
};

const server = http.createServer((req, res) => {
    // obtener url desde el objeto request
    const urlActual = req.url;
    const urlParseada = url.parse(urlActual, true);
    const ruta = urlParseada.pathname;

    // quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g,'');

    // obtener el metodo http
    const metodo = req.method.toLowerCase()

    // obtener variables del query url
    const { query = {} } = urlParseada;     // si es vacia no de error

    // obtener headers
    const { headers } = req;

    // obtener payloads si hay
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (datos) => {      // cada vez que el evento 'data' ocurra en el request se
        buffer += decoder.write(datos); // ejecutara este callback, y concatena los datos en
    });                                 // el buffer

    // este evento sucede cuando finaliza, es asincrono
    // por lo que las respuestas (res) deben estar dentro
    req.on('end', () => {      // cuando el request termina (evento end), termina de recibir datos
        buffer += decoder.end(); // y cierro el decoder

        if(headers["content-type"] === 'application/json') {
            buffer = JSON.parse(buffer);
        }

        // ordenar la data del request
        const data = {
            ruta: rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };

        console.log({ data });
        console.log('----------------');

        // elegir el manejador dependiendo de la ruta
        // y asignarle la funcion que el enrutador tiene
        let handler;
        if(rutaLimpia && enrutador[rutaLimpia] && enrutador[rutaLimpia][metodo]) {   // aca handler es function
            handler = enrutador[rutaLimpia][metodo];
        }
        else {
            handler = enrutador.noEncontrado;       // aca no es function
        }

        // ejecutar el handler para enviar la respuesta
        if(typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type","application/json");   //
                res.writeHead(statusCode);
                // linea donde realmente ya estamos respondiendo a la aplicación cliente
                res.end(respuesta);
            });
        }
    });    
});

const enrutador = {
    ruta: (data, callback) => {
        callback(200, {mensaje: 'esta es /ruta'});
    },
    usuarios: {
        get: (data, callback) => {
            callback(200, recursos.usuarios);
        },
        post: (data, callback) => {
            recursos.usuarios.push(data.payload);
            callback(201, data.payload);
        },
    },
    noEncontrado: (data, callback) => {
        callback(404, {mensaje: 'no encontrado'});
    }
}

server.on('client error', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(5000,() => {
    console.log('el servidor está escuchando en http://localhost:5000/')
});
