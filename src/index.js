// Archivo index.js
// Este es el punto de entrada para la aplicación Node.js. Aquí es donde se crea una instancia de Express, se configura el puerto en el que la aplicación escuchará y se define las rutas de la aplicación.

import express from "express"; // Importa la biblioteca Express, que se utiliza para crear y configurar la aplicación web.
import morgan from "morgan"; // Importa la biblioteca Morgan, que es un middleware de registro de solicitudes HTTP. Registra solicitudes en la consola.
import {router} from "./routes.js"; // Importa el enrutador que has definido en el archivo "routes.js".

const app = express(); // Acá se crea una instancia de Express llamada app y se la configura para escuchar en el puerto 3000.

app.set('port', 3000);

app.use(morgan('dev')); // Se configura el middleware morgan para registrar las solicitudes entrantes.
app.use(express.json()); // Se habilita el análisis de datos JSON con express.json().
app.use(router); // Se usa el enrutador router para manejar las solicitudes entrantes y comienza a escuchar en el puerto especificado.

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
}) // Se utiliza el método app.listen() para iniciar el servidor web que escuchará en el puerto especificado por app.get('port'), que en este caso se establece en 3000 mediante app.set('port', 3000).

// El callback definido (() => {...}) se ejecutará una vez que el servidor esté en funcionamiento. En este caso, simplemente imprime un mensaje en la consola que indica en qué puerto está escuchando el servidor. Esto sirve para saber a qué dirección acceder para interactuar con la aplicación web.

// En resumen, esta sección del código es la que pone en marcha el servidor Express y muestra en la consola el puerto en el que está escuchando. Cuando se ejecuta la aplicación, este mensaje se mostrará en la consola de Git Bash o en cualquier otro entorno donde se ejecute la aplicación.