const path = require('path')
const express = require('express');
const app = express();
const usersRouter = require("./router/userRouter");
const productsRouter = require("./router/productRouter");


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'))
})

app.use('/users',usersRouter);
app.use('/products',productsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listenining to server running on port ${port}`));