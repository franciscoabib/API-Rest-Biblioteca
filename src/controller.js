// Este código define un controlador llamado LibroController que contiene varios métodos para realizar operaciones CRUD en libros en la base de datos llamada biblioteca.
// Se importa la variable pool que contiene una conexión a la base de datos desde el módulo "database.js".
// Cada método en LibroController maneja una operación específica, como obtener todos los libros, obtener un libro por ID, agregar un nuevo libro, eliminar un libro por ID o ISBN, y actualizar un libro.
// Cada método está diseñado para capturar errores (a través de bloques try...catch) y responder a las solicitudes HTTP con respuestas JSON y códigos de estado apropiados.
// Se exporta una instancia de LibroController llamada libro, que puede utilizarse en otros módulos para manejar solicitudes relacionadas con libros en una aplicación.

import { pool } from "./database.js"; // Importa el objeto 'pool' de 'database.js', que contiene la conexión a la base de datos.

class LibroController {
    async getAll(req, res) {
        try {
            // Intenta obtener todos los libros desde la base de datos
            const [result] = await pool.query('SELECT * FROM libros'); // Realiza una consulta SQL para seleccionar todos los libros en la base de datos.
            
            if (result.length === 0) {
                // Si no se encuentran libros en la base de datos, responde con un mensaje de éxito, pero vacío.
                return res.json({ message: 'No se encontraron libros.' });
            }
    
            res.json(result); // Responde con los resultados de la consulta en formato JSON.
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error); // Registra el error en la consola.
            res.status(500).json({ error: 'Error al obtener todos los libros' }); // Responde con un mensaje de error y un código de estado 500 (Error del servidor).
        }
    }    

    async getOne(req, res) {
        try {
            const libroId = req.params.id; // Obtiene el ID del libro desde los parámetros de la URL.
            // Intenta obtener un libro por su ID.
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [libroId]); // Realiza una consulta SQL para seleccionar un libro por su ID.

            if (result.length === 0) {
                // Si no se encuentra un libro con ese ID, devuelve un error 404.
                return res.status(404).json({ error: 'Libro no encontrado' }); // Responde con un mensaje de error y un código de estado 404 (No encontrado).
            }

            res.json(result[0]); // Responde con el libro encontrado en formato JSON.
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error); // Registra el error en la consola.
            res.status(500).json({ error: 'Error al obtener un libro' }); // Responde con un mensaje de error y un código de estado 500 (Error del servidor).
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
    
            // Validación de atributos requeridos
            if (!libro.nombre || !libro.autor || !libro.ISBN || !/^\d{13}$/.test(libro.ISBN)) {
                return res.status(400).json({ error: 'Datos de libro incorrectos' });
            }
    
            // Verificar si el libro ya existe en la base de datos por ISBN
            const [existingBook] = await pool.query('SELECT id FROM libros WHERE ISBN = ?', [libro.ISBN]);
            if (existingBook.length > 0) {
                return res.status(400).json({ error: 'Este libro ya existe en la base de datos' });
            }
    
            // Intenta agregar un nuevo libro a la base de datos
            const [result] = await pool.query(
                "INSERT INTO libros(nombre, autor, categoria, `año-publicacion`, ISBN) VALUES (?, ?, ?, ?, ?)",
                [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN]
            );
    
            if (result.affectedRows === 1) {
                res.json({ "Id insertado": result.insertId });
            } else {
                res.status(500).json({ error: 'Error al agregar un libro' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar un libro' });
        }
    }

    async deleteId(req, res) {
        try {
            const libro = req.body;
    
            if (!libro.id) {
                return res.status(400).json({ error: 'Se requiere un ID para eliminar un libro' });
            }
    
            const [result] = await pool.query("DELETE FROM libros WHERE id=?", [libro.id]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'No se encontró un libro con ese ID' });
            }
    
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar un libro por ID' });
        }
    }

    async deleteISBN(req, res) {
        const libroISBN = req.params.ISBN; // Obtiene el ISBN desde los parámetros de la URL
    
        if (!/^\d{13}$/.test(libroISBN)) {
            // Si el ISBN no tiene 13 dígitos, responde con un mensaje de error y un código de estado 400 (Solicitud incorrecta).
            return res.status(400).json({ error: 'Número de ISBN incorrecto. Debe contener 13 dígitos.' });
        }
    
        try {
            // Realiza una consulta SQL para eliminar un libro por su ISBN.
            const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [libroISBN]);
    
            if (result.affectedRows === 0) {
                // Si no se eliminó ningún registro, significa que el libro no se encontró en la base de datos.
                return res.status(404).json({ error: 'Libro con este ISBN no encontrado en la base de datos.' });
            }
    
            // Se eliminó al menos un registro, lo que indica que el libro se eliminó correctamente.
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error); // Registra el error en la consola.
            res.status(500).json({ error: 'Error al eliminar un libro por ISBN' }); // Responde con un mensaje de error y un código de estado 500 (Error del servidor).
        }
    }    
    
    async update(req, res) {
        try {
            const libro = req.body; // Obtiene los datos del libro a actualizar, lo hace a través de la id del cuerpo de la solicitud.
    
            // Verifica si el ISBN proporcionado tiene exactamente 13 dígitos antes de realizar cualquier actualización.
            if (!/^\d{13}$/.test(libro.ISBN)) {
                // Si el ISBN no tiene 13 dígitos, responde con un mensaje de error y un código de estado 400 (Solicitud incorrecta).
                return res.status(400).json({ error: 'Número de ISBN incorrecto. Debe contener 13 dígitos.' });
            }
    
            // Intenta actualizar un libro en la base de datos.
            const [result] = await pool.query(
                "UPDATE libros SET nombre=?, autor=?, categoria=?, `año-publicacion`=?, ISBN=? WHERE id=?",
                [libro.nombre, libro.autor, libro.categoria, libro['año-publicacion'], libro.ISBN, libro.id]
            );
    
            if (result.changedRows === 0) {
                // Si no se realizó ninguna actualización, significa que el libro con ese ID no se encontró.
                return res.status(404).json({ error: 'Libro con este ID no encontrado en la base de datos' });
            }
    
            // Se realizaron actualizaciones con éxito.
            res.json({ "Registros actualizados": result.changedRows });
        } catch (error) {
            // En caso de un error, registra el error y responde con un error 500
            console.error(error); // Registra el error en la consola.
            res.status(500).json({ error: 'Error al actualizar un libro' }); // Responde con un mensaje de error y un código de estado 500 (Error del servidor).
        }
    }    
}

export const libro = new LibroController(); // Exporta una instancia de la clase LibroController como 'libro'.