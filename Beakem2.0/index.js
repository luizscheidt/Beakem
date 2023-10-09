const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const albums = [
    {
        album: 'Rumours',
        rate: 10
    },
    {
        album: 'The Marhsall Mathers LP',
        rate: 10
    },
    {
        album: 'Pet Sounds',
        rate: 9.7
    },
    {
        album: 'The Blueprint',
        rate: 9.6
    },
    {
        album: 'DAMN',
        rate: 9.4
    },
    {
        album: 'A Day At The Races',
        rate: 9.2
    },
]

app.get('/albums', (req, res) => {
    res.render('albums/index', {albums})
})

app.get('/albums/new', (req, res)=>{
    res.render('albums/new')
})

app.post('/albums', (req, res)=>{
    const {album, rate} = req.body;
    albums.push({album, rate})
    res.send('Deu boa fml')
})


// app.post('/album', (req, res)=>{
//     const {album, rating} = req.body;
//     if(rating>= 70){
//         res.send(`Great, you gave ${album} a ${rating} rating`)
//     }else if(rating<= 40){
//         res.send(`Damn, you gave ${album} a ${rating} rating`)
//     }else{
//         res.send(`Meh, you gave ${album} a ${rating} rating`)
// }
// })

app.listen(2000, ()=>{
    console.log('lsitening on port 2000')
})