const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/dbconfig');

const app = express();
app.use(bodyParser.json());

// Get all customers
app.get("/api/customers", (req, res) => {
  db.query('SELECT * FROM customers', (err, result) => {
    if (err)
      console.error(err);
    else
      res.json(result.rows)
  })
})

// Get customer by id
app.get("/api/customers/:id", (req, res) => {
  const query = {
    text: 'SELECT * FROM customers WHERE id = $1',
    values: [req.params.id],
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    else {
      if (result.rows.length > 0)
        res.json(result.rows);
      else
        res.status(404).end();
    }
  })

})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});