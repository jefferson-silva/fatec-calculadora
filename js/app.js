$("document").ready(function() {
	$("#form").submit(function (event) {
		event.preventDefault();

		$("#results tr").remove();

		var peso1 = Number($("#peso_1").val());
		var peso2 = Number($("#peso_2").val());
		var enem = Number($("#enem").val());

		var escolaPublica = $("#escolaridade").is(":checked") ? 0.10 : 0;
		var afrodescendencia = $("#afrodescendencia").is(":checked") ? 0.03 : 0;

		for (var redacao = 10; redacao <= 100; redacao += 10) {
			var nota = notaFatec(peso1, peso2, redacao, enem, escolaPublica, afrodescendencia);
			$("#results-table tbody").append("<tr><td>" + redacao + "</td><td>" + nota + "</td></tr>");
		}

		$("#results").fadeIn();
	});
});


// Fórmula de cálculo da nota final do vestibular
function notaFatec (peso1, peso2, redacao, enem, escolaPublica, afro) {
	// nota ponderada das questões
	var NPC = peso1 + 2 * peso2;

	// nota das questões objetivas
	var P = 100 * NPC / 64;

	// nota final das questões objetivas
	var N;
	if (enem != undefined && typeof enem == "number" && enem > P)
		N = (4 * P + 1 * enem) / 5;
	else
		N = P;

	// nota final
	var NF = (8 * N + 2 * redacao) / 10;

	// nota final com pontuação acrescida
	if (escolaPublica || afro) {
		var NFA = NF * (1 + afro + escolaPublica);
		return Math.min(NFA.toFixed(3), 100);
	}

	return Math.min(NF.toFixed(3), 100);
}