const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRouter = require('./routes/productos.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});