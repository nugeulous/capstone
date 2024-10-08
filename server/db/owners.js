const { client } = require("./client.js");

async function createOwner({ email, password, fname, lname, address, phone, file, gender }) {
    try {
      const { rows: [owner] } = await client.query(`
        INSERT INTO owners(email, password, fname, lname, address, phone, file, gender, role) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
        [email, password, fname, lname, address, phone, file, gender, "owner"]
      );
      delete owner.password;
      return owner;
    } catch (error) {
      throw error;
    }
  }

async function updateOwner(ownerId, { email, password, fname, lname, address, phone, file, gender }) {

  try {
    const { rows: [updatedOwner] } = await client.query(`
        UPDATE owners
        SET email=$1, password=$2, fname=$3, lname=$4, address=$5, phone=$6, file=$7, gender=$8
        WHERE id=$9
        RETURNING *;
      `, Object.values(fields));
  
      return updatedOwner;
    } catch (error) {
      throw error;
    }
  }

async function getAllOwners() {
    try {
      const { rows: owners } = await client.query(`
        SELECT *
        FROM owners;
      `);
  
      return owners;
    } catch (error) {
      throw error;
    }
  }

  // TODO: duplicate function - confirm where this is used and remove
async function getOwner(email) {
    try {
    const { rows: [owner] } = await client.query(`
        SELECT *
        FROM owners
        WHERE email=$1
      `, [email]);
      return owner;
    } catch (error) {
      throw error;
    }
  }

  async function getOwnerById(id) {
    try {
      const { rows: [owner] } = await client.query(`
        SELECT id, email, fname, lname, phone, address, active, role
        FROM owners
        WHERE id=$1
      `, [id]);
  
      if (!owner) {
        throw {
          name: "OwnerNotFoundError",
          message: "An owner with that id does not exist"
        }
      }
    
      return owner;
    } catch (error) {
      throw error;
    }
  }  

async function getOwnerByEmail(email) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM owners
            WHERE email=$1
        `, [email]);

        if (!rows || !rows.length) {
          throw {
              name: "OwnerNotFoundError",
              message: "An owner with that email does not exist"
          };
      } 

        const [owner] = rows;
        delete owner.password;

        return owner;
    } catch (error) {
      console.error(error);
        throw error;
    }
}

module.exports = {
    getAllOwners,
    getOwnerByEmail,
    getOwnerById,
    getOwner,
    createOwner,
    updateOwner
}