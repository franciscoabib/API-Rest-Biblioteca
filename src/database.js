// Este código configura una conexión a una base de datos MySQL utilizando un pool de conexiones, lo que facilita la gestión de la comunicación con la base de datos de la aplicación. Todas las propiedades (properties) define la información necesaria para establecer una conexión válida con la base de datos, como el host, el usuario y la contraseña.

import mysqlConnection from 'mysql2/promise'; // Importa el módulo 'mysql2/promise' para interactuar con la base de datos MySQL utilizando promesas en lugar de callbacks.

const properties = {
    host: 'localhost', // Configuración del host de la base de datos (generalmente, 'localhost' se refiere a la misma máquina).
    user: 'root', // Configuración del usuario de la base de datos.
    password: '', // Contraseña para acceder a la base de datos.
    database: 'biblioteca' // Nombre de la base de datos a la que se conectará la aplicación.
};

export const pool = mysqlConnection.createPool(properties); // Crea un conjunto de conexiones (pool) a la base de datos utilizando la configuración 'properties' y lo almacena en la variable 'pool'.