const fs = require('fs');
const path = require('path');

const buscarTodos = () => {
	// busco el archivo de mi computadora. los '..' quiere decir que voy una carpeta atras.
	const ubicacionArchivo = path.join(__dirname, '..', 'articulos.json');
	const datos = fs.readFileSync(ubicacionArchivo, { encoding: 'utf-8' });
	const resultado = JSON.parse(datos);

	console.log('la ubicacion es: ', ubicacionArchivo);

	return resultado;
};

const buscarUno = (id) => {
	return buscarTodos().find((item) => item.id === id);
};

const agregrUno = (nuevo) => {
	let todos = buscarTodos();
	nuevo.createdAt = new Date();
	nuevo.id = nuevoID(todos);
	todos.push(nuevo);
	fs.writeFileSync('articulos.json', JSON.stringify(todos));
	return nuevo;
};

const nuevoID = (articulos) => {
	let id = 0;
	for (let i = 0; i < articulos.length; i++) {
		let articulo = articulos[i];
		let articuloId = articulo.id;
		let articuloIdInt = parseInt(articuloId);
		if (articuloIdInt > id) {
			id = articuloIdInt;
		}
	}
	id++;
	return id.toString();
};

const borrarUno = (id) => {
	let todos = buscarTodos();
	const filterTodos = todos.filter((item) => item.id !== id);
	todos = filterTodos;
	fs.writeFileSync('articulos.json', JSON.stringify(todos));

	return filterTodos;
};

module.exports = {
	buscarTodos,
	buscarUno,
	agregrUno,
	borrarUno,
};
