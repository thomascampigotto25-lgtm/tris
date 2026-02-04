// Stato del gioco
const cella = Array.from(document.querySelectorAll('.cella')); // Seleziona tutte le celle della scacchiera e le mette in un array
var scacchiera = new Array(9).fill(''); // Array che rappresenta lo stato della scacchiera, inizialmente vuota. Ogni indice corrisponde a una cella.
var currentPlayer = 'O'; // Il giocatore corrente, inizia con 'O'
const combinazioniVincita = [ // Tutte le combinazioni vincenti (righe, colonne, diagonali)
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// Funzione per gestire il click su una cella
function clickGiocatore(event){
    const id = event.target.id; // Ottiene l'id della cella cliccata, che corrisponde all'indice nell'array scacchiera
    if(scacchiera[id] == ''){ // Se la casella è vuota aggiorna il testo della cella con il simbolo del giocatore corrente
        scacchiera[id] = currentPlayer;
        event.target.textContent = currentPlayer; 
        const winner = checkWin(); // Controlla se c'è un vincitore dopo la mossa
        if(winner){
            setTimeout(function() { // Attende un breve momento prima di mostrare l'alert per permettere al browser di aggiornare la visualizzazione dell'ultima mossa
            alert(`Giocatore ${winner} ha vinto!`);
            resetGame();
            }, 10);
            return;
        }else if (!scacchiera.includes('')){ // Se non ci sono più celle vuote e nessun vincitore, è un pareggio
            setTimeout(function() {
                alert("Pareggio!");
                resetGame();
            }, 10);
        }else { // Cambia il giocatore corrente
            if (currentPlayer == 'O'){
                currentPlayer = 'X';
            } else {
                currentPlayer = 'O';
            }
        }
    }
}

function checkWin(){
    for (var i = 0; i < combinazioniVincita.length; i++) { // Controlla ogni combinazione vincente (righe, colonne, diagonali)
        const combo = combinazioniVincita[i];
        const a = combo[0], b = combo[1], c = combo[2];
        // Verifica che la prima casella non sia vuota e sia uguale alle altre due
        if (scacchiera[a] != '' && scacchiera[a] == scacchiera[b] && scacchiera[a] == scacchiera[c]) {
            return scacchiera[a]; // ritorna 'O' o 'X'
        }
    }
    return null; // nessun vincitore
}
function resetGame(){
    scacchiera.fill(''); // Resetta lo stato della scacchiera
    cella.forEach(c => c.textContent = '');
    currentPlayer = 'O'; // Riparte con il giocatore O
}
cella.forEach(c => c.addEventListener('click', clickGiocatore)); // Ogni cella chiama la funzione clickGiocatore quando viene cliccata