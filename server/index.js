const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

connectToMongo();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Available Routes for use

app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/score', require('./routes/overallScore'))
<<<<<<< HEAD
app.use('/api/cart', require('./routes/cart'))
=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751

// app.use('/api/nflt', require('./routes/nflt'));



app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
})


