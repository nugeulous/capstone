const { client } = require("./client.js");

async function createOrder({   
    service_type,
    start_date,
    end_date,
    start_time,
    end_time, 
    pet_type,
    petsitter_fname,
    price, 
    paid,
    order_owner_id }) {
    try {
      const { rows: [order] } = await client.query(`
        INSERT INTO orders(    
            service_type,
            start_date,
            end_date,
            start_time,
            end_time, 
            pet_type,
            petsitter_fname,
            price, 
            paid,
            order_owner_id ) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *;
      `,
        [    
            service_type,
            start_date,
            end_date,
            start_time,
            end_time, 
            pet_type,
            petsitter_fname,
            price, 
            paid,
            order_owner_id ]
      );
      return order;
    } catch (error) {
      throw error;
    }
  }

//   GET All Orders

async function getAllOrders() {
    try {
      const { rows: orders } = await client.query(`
        SELECT *
        FROM orders;
      `);
  
      return orders;
    } catch (error) {
      throw error;
    }
  }

//   GET All Orders by Owner id / email

async function getOrdersByOwnerId(id) {
    try {
      const { rows:  order  } = await client.query(`
        SELECT *
        FROM orders
        WHERE order_owner_id=$1
      `, [id]);
  
      if (!order) {
        throw {
          name: "OrderNotFoundError",
          message: "An order with that owner id does not exist"
        }
      }
    
      return order;
    } catch (error) {
      throw error;
    }
  }


module.exports = { createOrder, getAllOrders,  getOrdersByOwnerId }