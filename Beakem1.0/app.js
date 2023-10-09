const form = document.querySelector("form")
const input = document.querySelector("#album")
const lista = document.querySelector("#lista")
const num = document.querySelector("#nota")

form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    const album = input.value;
    const nota = num.value;
    const newLI = document.createElement('li');
    newLI.innerHTML = `${album} ${nota}`;
    lista.append(newLI)
});

lista.addEventListener ('click', function(evt){
    evt.target.nodeName === 'LI' && evt.target.remove();
})