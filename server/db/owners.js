const { client } = require("./client.js");

async function createOwner({ email, password, fname, lname, phone, image, gender }) {
    try {
      const { rows: [owner] } = await client.query(`
        INSERT INTO owners(email, password, fname, lname, location, phone, image, gender) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        ON CONFLICT (email) DO NOTHING 
        RETURNING *;
      `,
        [email, password, fname, lname, phone, image, gender]
      );
      delete owner.password;
      return owner;
    } catch (error) {
      throw error;
    }
  }

async function updateOwner(ownerId, { email, password, fname, lname, location, phone, image, gender }) {

  try {
    const { rows: [updatedOwner] } = await client.query(`
        UPDATE owners
        SET email=$1, password=$2, fname=$3, lname=$4, location=$5, phone=$6, image=$7, gender=$8
        WHERE id=$9
        RETURNING *;
      `, Object.values(fields));
  
      return owner;
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

async function getOwner(email) {
    console.log(email);
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
      const { rows: [ owner ] } = await client.query(`
        SELECT id, email, fname, lname, phone, location, active
        FROM owners
        WHERE id=$1
      `, [id]);
  
      if (!owner) {
        throw {
          name: "OwnerNotFoundError",
          message: "A owner with that id does not exist"
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

        if (!rows || !rows.length) return null; 

        const [owner] = rows;
        delete owner.password;

        return owner;
    } catch (error) {
      console.error(error);
        throw error;
    }
}


async function getOwnerByEmail(email) {
    try {
        const { rows: [owner] } = await client.query(`
            SELECT id, email, fname, lname, location, active
            FROM owners
            WHERE email=$1
        `, [email]);

        if (!owner) {
            throw {
                name: "OwnerNotFoundError",
                message: "An owner with that email does not exist"
            };
        }

        return owner;
    } catch (error) {
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