const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/customers');

const app = express();
app.use(bodyParser.json());

app.get("/api/customers", query.getAllCustomers)
app.get("/api/customers/:id", query.getCustomerById);
app.post("/api/customers", query.addCustomer);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});