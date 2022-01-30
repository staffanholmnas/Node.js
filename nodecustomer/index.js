// open exercise 5_1
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

let customers = [
  { id: '1588323375416', firstName: 'John', lastName: 'Johnson', email: 'john@johnson.com', phone: '8233243' },
  { id: '1588323375417', firstName: 'Mary', lastName: 'Smith', email: 'mary@smith.com', phone: '6654113' },
  { id: '1588323375418', firstName: 'Peter', lastName: 'North', email: 'peter@north.com', phone: '901176' },
]

// Get all customers
app.get("/api/customers", (req, res) => {
  res.json(customers);
})

// Get a customer by their id
app.get("/api/customers/:id", (req, res) => {
  const customerId = req.params.id;
  const customer = customers.filter(customer => customer.id === customerId);

  if (customer.length > 0)
    res.json(customer);
  else
    res.status(404).end();
})

// Add a new customer
app.post("/api/customers", (req, res) => {
  const newCustomer = { 'id': `${Date.now()}`, ...req.body };

  customers = [...customers, newCustomer];
  res.json(newCustomer);
});

// Delete a customer
app.delete("/api/customers/:id", (req, res) => {
  const id = req.params.id;

  customers = customers.filter(customer => customer.id !== id);
  res.status(204).end();
})

// Update a customer
app.put("/api/customers/:id", (req, res) => {
  const id = req.params.id;
  const updatedCustomer = { 'id': id, ...req.body };
  const index = customers.findIndex(customer => customer.id === id);

  customers.splice(index, 1, updatedCustomer);
  res.json(updatedCustomer);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
