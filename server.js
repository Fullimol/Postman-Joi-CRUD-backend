const express = require('express');
const validation = require('./middleware/joiValidation');
const JoiEsquema = require('./schema/JoiEsquema');
const app = express();
const articulos = require('./src/articulos');

app.use(express.json()); // Middleware para parsear el cuerpo de la solicitud como JSON

app.get('/', (req, res) => {
	res.send('Hola mundo, este sería el HOME');
});

app.get('/api/articulos', (req, res) => {
	res.json(articulos.buscarTodos());
});

app.get('/api/articulos/:id', (req, res) => {
	const articulo = req.params.id;
	res.json(articulos.buscarUno(articulo));
});

app.post('/api/articulos', validation(JoiEsquema), (req, res) => {
	let articulo = req.body;
	let nuevoArticulo = articulos.agregrUno(articulo);

	res.status(200).json(nuevoArticulo);
});

app.delete('/api/articulos/:id', (req, res) => {
	const articulo = req.params.id;
	articulos.borrarUno(articulo);

	res.send('Se ha eliminado');
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Escuchando el puerto ${PORT}`);
});
