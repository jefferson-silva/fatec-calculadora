// Calcula a nota final da Fatec
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
		return NFA;
	}

	return NF;
}