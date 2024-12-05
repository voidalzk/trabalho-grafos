const grafo = {
    A: { B: 4, C: 2, D: 7 },
    B: { A: 4, C: 1, E: 1 },
    C: { A: 2, B: 1, D: 3, E: 3 },
    D: { A: 7, C: 3, E: 2 },
    E: { B: 1, C: 3, D: 2 }
};

function dijkstra(grafo, inicio) {
    const distancias = {};
    const anteriores = {};
    const naoVisitados = new Set(Object.keys(grafo));

    for (const vertice of naoVisitados) {
        distancias[vertice] = vertice === inicio ? 0 : Infinity;
        anteriores[vertice] = null;
    }

    while (naoVisitados.size > 0) {
        let atual = null;
        let menorDistancia = Infinity;
        for (const vertice of naoVisitados) {
            if (distancias[vertice] < menorDistancia) {
                menorDistancia = distancias[vertice];
                atual = vertice;
            }
        }

        if (atual === null) break;

        for (const [vizinho, peso] of Object.entries(grafo[atual])) {
            if (naoVisitados.has(vizinho)) {
                const novaDistancia = distancias[atual] + peso;
                if (novaDistancia < distancias[vizinho]) {
                    distancias[vizinho] = novaDistancia;
                    anteriores[vizinho] = atual;
                }
            }
        }

        naoVisitados.delete(atual);
    }

    return { distancias, anteriores };
}

function reconstruirCaminho(anteriores, destino) {
    const caminho = [];
    let atual = destino;
    while (atual !== null) {
        caminho.unshift(atual);
        atual = anteriores[atual];
    }
    return caminho.join(' → ');
}

const resultado = dijkstra(grafo, 'A');

console.log("**Qual é o menor tempo para chegar de A até E?**");
console.log(`${resultado.distancias['E']} horas\n`);

console.log("**Liste o caminho completo que deve ser seguido para chegar de A até E.**");
console.log(`${reconstruirCaminho(resultado.anteriores, 'E')}\n`);

console.log("**Qual é o menor tempo para chegar de A até D?**");
console.log(`${resultado.distancias['D']} horas\n`);

console.log("**Liste o caminho completo que deve ser seguido para chegar de A até D.**");
console.log(`${reconstruirCaminho(resultado.anteriores, 'D')}`);