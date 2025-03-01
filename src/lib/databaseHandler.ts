import { sql } from "@vercel/postgres";

export default class DatabaseHandler {
  constructor(){  
  }
  async getUserByEmail(email: string | undefined | null) {
    try {
      if (!email) {
        throw new Error("El correo electrónico no está definido.");
      }

      const data = await sql `SELECT * FROM users WHERE email = ${email}`;
      return data.rows[0]
    } catch(error){
       console.error("Error en getUserByEmail:", error);
      throw error; // Propaga el error para que pueda ser manejado en el callback
    }
  }

  async createUser(email: any, name: any) {
    try {
      const data = await sql `
      INSERT INTO users (email, name) 
      VALUES (${email}, ${name}) 
      RETURNING id`;
      return data.rows[0].id
    } catch(error) {
      console.error("Error en createUser:", error);
      throw error; // Propaga el error para que pueda ser manejado en el callback
    }
  }
};
