// El código de este archivo routes.js, define rutas que se utilizan para realizar operaciones en la entidad "libros", como obtener, agregar, eliminar y actualizar libros en la base de datos.
// Las rutas se asocian a métodos específicos en el objeto "libro" que se importa desde "controller.js".
// Las rutas incluyen rutas HTTP GET, POST, DELETE y PUT, lo que permite realizar diferentes operaciones CRUD en la entidad "libros".
// Estas rutas son utilizadas por la aplicación Express para enrutar y gestionar las solicitudes HTTP relacionadas con los libros en la aplicación.

import { Router } from "express"; // Importa la clase Router de Express, que permite definir rutas.
import { libro } from "./controller.js"; // Importa el objeto 'libro' desde el archivo 'controller.js'.

export const router = Router(); // Crea una nueva instancia de Router y la asigna a la variable 'router'.

router.get('/libros', libro.getAll); // Ruta HTTP GET, que llama al método getAll en el objeto libro, para obtener todos los libros.
router.post('/libros', libro.add); // Ruta HTTP POST, que llama al método add en el objeto libro, para agregar un libro.
router.delete('/libros/:id', libro.deleteId); // Ruta HTTP DELETE, que llama al método deleteId en el objeto libro, para eliminar un libro a través de su id.
router.delete('/libros/ISBN/:ISBN', libro.deleteISBN); // Ruta HTTP DELETE, que llama al método deleteISBN en el objeto libro, para eliminar un libro a través de su ISBN.
router.put('/libros/actualizar/:id', libro.update); // Ruta HTTP PUT, que llama al método update en el objeto libro, para actualizar un libro.
router.get('/libros/:id', libro.getOne); // Ruta HTTP GET, que llama al método getOne en el objeto libro, para obtener un libro a través su ID.