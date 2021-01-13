// variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// eventos
eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}
// classes

class Presupuesto {
	constructor(presupuesto) {
		this.presupuesto = Number(presupuesto);
		this.restante = Number(presupuesto);
		this.gastos = [];
	}
}

class UI {
	insertarPresupuesto(cantidad) {
		const { presupuesto, restante } = cantidad;
		document.querySelector('#total').textContent = presupuesto;
		document.querySelector('#restante').textContent = restante;
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
