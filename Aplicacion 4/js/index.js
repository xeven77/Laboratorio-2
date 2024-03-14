function generarCartas(numeroCartas) {
    let cartas = [];
    for (let i = 1; i <= numeroCartas / 2; i++) {
        cartas.push(i);
        cartas.push(i);
    }
    cartas.sort(() => Math.random() - 0.5);
    return cartas;
}
function jugarMemorama() {
    const numCartas = document.getElementById("numCartas").value;
    const board = document.getElementById("board");
    board.innerHTML = "";
    let cartas = generarCartas(numCartas);
    cartas.forEach((numero, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = numero;
        cardElement.onclick = function() {
            console.log("Carta seleccionada:", numero);
        };
        setTimeout(()=>{
        
        cardElement.textContent="";
        cardElement.style.backgroundColor="#ccc";
        board.appendChild(cardElement);
    }, 1000);
    });
}
