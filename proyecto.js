//////////   OBJETO BARAJA   \\\\\\\\\\
var Baraja = {
	cartas: []
}

Baraja.crearCartas = function() {
	var palos = ["C", "D", "P", "T"]
	for(var i = 0; i<palos.length; i++) {
		for(var j = 1; j<=13; j++) {
			var carta = {palo: palos[i], valor: j};
			this.cartas[this.cartas.length] = carta;
		}
	}
	return Baraja.cartas;
}


//////////   OBJETO CRUPIER \\\\\\\\\\
var Crupier = {
	nombre: "Crupier",
	mano: [],
	puntos: 0
}

Crupier.abrirJuego = function () {
	console.log("          ***************     BLACKJACK     *************** ");
	Baraja.cartas = [];
	Crupier.mano= [];
	Jugador.mano = [];
	Crupier.puntos = 0;
	Jugador.puntos = 0;
	Jugador.pasar = false;
}

Crupier.barajar = function () {
	console.log("Barajando...")
	Baraja.cartas.sort(function() {return Math.random() - 0.5});
	console.log(Baraja.cartas);
}

Crupier.repartir = function () {
	for(var i = 0; i<2; i++){
	Jugador.mano[Jugador.mano.length] = Baraja.cartas.shift();
	};
	for(var j = 0; j<2; j++) {
	Crupier.mano[Crupier.mano.length] = Baraja.cartas.shift();
	};
	console.log("Cartas para el jugador \n Carta 1: ", Jugador.mano[0], ", Carta 2: ", Jugador.mano[1], "\nCartas para el crupier \n Carta 1: Boca abajo, ", "Carta 2: ", Crupier.mano[1]);
	Crupier.puntuar(Jugador);
	Crupier.puntuar(Crupier);
}

Crupier.puntuar = function (persona) {
	persona.puntos = 0;
	for (var i = 0; i < persona.mano.length; i++) {
		if(persona.mano[i].valor === 1) {
			persona.puntos += 11;
		} else if (persona.mano[i].valor === 11 || persona.mano[i].valor === 12 || persona.mano[i].valor === 13) {
			persona.puntos += 10;
		} else {
			persona.puntos +=persona.mano[i].valor;
		}
	}
	if (persona.puntos > 21) {
		console.log(persona.nombre + " pierde, ha superado 21 puntos.");
	}
}

Crupier.anunciarGanador = function () {
	console.log(Jugador.nombre+" tiene "+Jugador.puntos+" puntos.");
	console.log(Crupier.nombre+" tiene "+Crupier.puntos+" puntos.");
	if (Jugador.puntos > Crupier.puntos && Jugador.puntos <= 21 || Crupier.puntos > 21) {
		console.log("**********     JUGADOR GANA     **********");
	} else if (Crupier.puntos > Jugador.puntos || Jugador.puntos > 21) {
		console.log("**********     CRUPIER GANA     **********");
	} else {
		console.log("**********     EMPATE     **********");
	}
	console.log("Fin del juego");
}


//////////   OBJETO JUGADOR \\\\\\\\\\
var Jugador = {
	nombre: "Jugador",
	mano: [],
	puntos: 0,
	pasar: false
}

Jugador.decidir = function () {
	var decision = prompt("Tienes "+Jugador.puntos+" puntos. \n ¿Qué deseas hacer? \n Pedir carta (pulsa 1) \n Pasar (pulsa 2");
	if (decision == 2) {
		Jugador.pasar = true;
		console.log("El jugador pasa");
	}
}

Jugador.pedirCarta = function () {
	console.log("Su carta, gracias");
	Jugador.mano[Jugador.mano.length] = Baraja.cartas.shift();
	for(var i = 0; i < Jugador.mano.length; i++) {
		console.log(Jugador.mano[i]);
	}
}

////////// PROGRAMA \\\\\\\\\\
function blackjack () {
	Crupier.abrirJuego();
	Baraja.crearCartas();
	Crupier.barajar();
	Crupier.repartir();
	while (!Jugador.pasar && Jugador.puntos < 21 && Crupier.puntos < 21) {
		Jugador.decidir();
		if (Jugador.pasar == false) {
		Jugador.pedirCarta();
		Crupier.puntuar(Jugador);
		}
	}
	Crupier.anunciarGanador();
}

blackjack();