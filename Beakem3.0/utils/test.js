const albums = [
  {artist: "Kanye", rating: 10},
  {artist: "Kanye", rating: 8},
  {artist: "Eminem", rating: 11},
];

const artists = [];
for (a of albums) {
  artists.push(a.artist);
}

const counter = {};
artists.forEach((him) => {
  if (counter[him]) {
    counter[him] += 1;
  } else {
    counter[him] = 1;
  }
});

const novoLista = albums.reduce((soma, album) => {
  // guarda o nome atual e verifica se existe repetido
  let artist = album.artist;
  let repetido = soma.find((elem) => elem.artist === artist);
  // se for repetido soma, caso contrário adiciona o elemento ao novo array
  if (repetido) repetido.rating += album.rating;
  else soma.push(album);
  // retorna o elemento agrupado e somado
  return soma;
}, []);

// for artist of novolista
// if artist === artist
// rating / counter[artist]

console.log(novoLista);

console.log(counter);
