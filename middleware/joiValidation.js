// Creamos la función que estará ejecutando la validación de los datos con el esquema que creamos.
//Esto se puede reutilizar, se puede cambiar el esquema

const validation = (schema) => {
	let joidValidation = (req, res, next) => {
		//"next" es para que se ejecute el resto del codigo si todo va bien.
		let { error } = schema.validate(req.body);
		console.log(error);
		if (error) {
			let { message } = error;
			res.status(422).json({ message });
		} else {
			next(); //con esto hacemos que siga la función (o el resto de la peticón en donde se llame a esta función)
		}
	};
	return joidValidation;
};

module.exports = validation;
