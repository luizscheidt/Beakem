const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.post('/album', (req, res)=> {
    const {album} = req.params;
    res.send('album.ejs', {album})
})
 
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.listen(3100, ()=> {
    console.log('listening on port 3100');
})