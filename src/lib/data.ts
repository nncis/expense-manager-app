import { getSession } from "next-auth/react";

export default class DatabaseHandler {

  session: any;

  constructor() {
    this.session = null; // Inicializa la sesión como null
  }
  
  async initialize() {
    this.session = await getSession(); // Obtiene la sesión del usuario
    console.log(this.session)
    return this.session
  }

}