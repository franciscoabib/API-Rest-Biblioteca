import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get('/libros', libro.getAll); // Ruta para obtener todos los libros
router.post('/libros', libro.add); // Ruta para agregar un libro
router.delete('/libros', libro.delete); // Ruta para eliminar un libro
router.put('/libros', libro.update); // Ruta para actualizar un libro
router.get('/libros/:id', libro.getOne); // Ruta para obtener un libro por su ID