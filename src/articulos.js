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

//Ejercicio 2 MODULO 3
const buscarReportes = (id) => {
	let todos = buscarTodos();
	if (id == 121) {
		let resultado = [];
		for (let i = 0; i < todos.length; i++) {
			let articulo = todos[i];
			let articuloPrice = articulo.price;
			let articuloPriceInt = parseInt(articuloPrice);

			if (articuloPriceInt > 500) {
				resultado.push(articulo);
			}
		}
		return resultado;
	} else if (id == 122) {
		let sumaPrecios = 0;
		for (let i = 0; i < todos.length; i++) {
			const precios = parseFloat(todos[i].price); //convierto los precios a "number"
			sumaPrecios = sumaPrecios + precios; // tambien se puede usar "sumaPrecios += precioArticulo;"
		}
		const resultado = sumaPrecios / todos.length; //promedio
		return resultado;
	}
};

module.exports = {
	buscarTodos,
	buscarUno,
	agregrUno,
	borrarUno,
	buscarReportes,
};
