const express = require('express');
const path=require('path')
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userAuthenticationRoute=require("./routes/userAuthenticationRoute")
const cors=require('cors')

const app = express();

app.use(express.static(path.join(__dirname, './public')))
app.use(express.json());
app.use(cors())
app.use('/products', productRouter);
app.use('/carts', cartRouter);
app.use('/login', userAuthenticationRoute); 



app.listen(3000, () => console.log('listen on 3000'));
