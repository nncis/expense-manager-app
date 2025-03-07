import { sql } from "@vercel/postgres";

export default class DatabaseHandler {
  constructor(){  
  }
  async getUserByEmail(email: string | undefined | null) {
    console.log(email)
    try {
      if (!email) {
        throw new Error("El correo electrónico no está definido.");
      }

      const data = await sql `SELECT * FROM "User" WHERE "email" = ${email}`;
      
      if(!data.rows[0]){
        return false;
      }else {
        return data.rows[0]
      }
    } catch(error){
       console.error("Error en getUserByEmail:", error);
      throw error; // Propaga el error para que pueda ser manejado en el callback
    }
  }

  async createUser(email: any, name: any, image: any) {
    try {
      const data = await sql `
      INSERT INTO "User" (id, name , "email" , "emailVerified", image)
      VALUES (gen_random_uuid(), ${name}, ${email}, NOW(), ${image})
      RETURNING id`;
      return data.rows[0].id
    } catch(error) {
      console.error("Error en createUser:", error);
      throw error; // Propaga el error para que pueda ser manejado en el callback
    }
  }
};
