const express = require('express');
const productRouter = require('./routes/productRouter');
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(express.json()); //req.body = {...}

app.use('/products', productRouter);
app.use('/books', bookRouter)


const port = process.env.PORT || 5000;
app.listen(5000, ()=>console.log('listen on 5000'));