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

app.put('/api/articulos/:id', (req, res) => {
	const id = req.params.id;
	const { name, price } = req.body;
	const aModificar = articulos.modificar(id, { name, price });

	res.status(200).json(aModificar);
});

//Ejercicio 2 MODULO 3
app.get('/api/reportes/:id', (req, res) => {
	const numeroReporte = req.params.id;
	const resultado = articulos.buscarReportes(numeroReporte);

	res.status(200).json(resultado);
});

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Escuchando el puerto ${PORT}`);
});
