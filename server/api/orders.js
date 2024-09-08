const express = require('express');
const ordersRouter = express.Router();

const {  
    createOrder, getAllOrders, getOrdersByOwnerId
} = require('../db/index');

//  GET All Orders \
ordersRouter.get('/', async (req, res, next) => {
    try {
      const orders = await getAllOrders();
      res.send(orders);
    } catch (error) {
      res.send(JSON.stringify(error))
    } 
  });

//  GET All Orders by owner ID/email

ordersRouter.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const orders = await getOrdersByOwnerId(id);
      if (!orders) {
        return res.status(404).send({ error: "No Orders found" });
      }
      res.send(orders);
    } catch (error) {
      next(error); // Forward error to error handling middleware
    }
  });

  // book a service
ordersRouter.post('/bookService', async (req, res, next) => {
  try {
    const { service_type, start_date, end_date, start_time, end_time, pet_type, petsitter_fname, price, paid } = req.body;

    const order = await createOrder({ service_type, start_date, end_date, start_time, end_time, pet_type, petsitter_fname, price, paid });

    res.send({ order });
  } catch (error) {
    next(error);
  }
})

module.exports = ordersRouter;
