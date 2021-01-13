// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
	formulario.addEventListener('submit', agregarGasto);
}
// classes

class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
		this.gastos = [];
	}
	nuevoGasto(gasto) {
		this.gastos = [...this.gastos, gasto];
	}
}

class UI {
	insertarPresupuesto(cantidad) {
		const { presupuesto, restante } = cantidad;
		document.querySelector('#total').textContent = presupuesto;
		document.querySelector('#restante').textContent = restante;
	}
	imprimirAlerta(mensaje, tipo) {
		//crear el div mensaje
		const divMensaje = document.createElement('div');
		divMensaje.classList.add('text-center', 'alert');
		if (tipo === 'error') {
			divMensaje.classList.add('alert-danger');
		} else {
			divMensaje.classList.add('alert-success');
		}
		divMensaje.textContent = mensaje;

		document.querySelector('.primario').insertBefore(divMensaje, formulario);

		setTimeout(() => {
			divMensaje.remove();
		}, 3000);
	}
}

const ui = new UI();

let presupuesto;

// funciones

function preguntarPresupuesto() {
	const presupuestoUsuario = prompt('Escribe tu presupuesto');
	if (
		presupuestoUsuario === '' ||
		presupuestoUsuario === null ||
		isNaN(presupuestoUsuario) ||
		presupuestoUsuario <= 0
	) {
		window.location.reload();
	}
	//presupuesto valido
	presupuesto = new Presupuesto(presupuestoUsuario);
	ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
	e.preventDefault();
	// leer los campos
	const nombre = document.querySelector('#gasto').value;
	const cantidad = Number(document.querySelector('#cantidad').value);

	//validad
	if (nombre === '' || cantidad === '') {
		ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
		return;
	} else if (cantidad <= 0 || isNaN(cantidad)) {
		ui.imprimirAlerta('Cantidad no valida', 'error');
		return;
	}

	//objeto gasto
	const gasto = { nombre, cantidad, id: Date.now() };

	presupuesto.nuevoGasto(gasto);

	ui.imprimirAlerta('Gasto agregado correctamente');

	formulario.reset();

	/* const lista = document.querySelector('.list-group');
	const gasto = document.createElement('li');
	gasto.textContent = nombre + cantidad;
	lista.appendChild(gasto); */
}
