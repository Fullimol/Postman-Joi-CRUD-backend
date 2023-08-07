//Creamos el esquema con lo que queres que se cumpla en el input

const Joi = require('joi');

const articuloSchema = Joi.object({
	name: Joi.string().trim().min(4).required(),
	price: Joi.string().trim().min(1).required(),
}).unknown(false); //esto en "true" permite agregar propiedades que no están en mi esquema.

module.exports = articuloSchema;
