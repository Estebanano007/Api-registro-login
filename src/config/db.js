// Conexion de base de datos
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' Conectado a MongoDB');
  } catch (err) {
    console.error(' Error al conectar a MongoDB', err);
    process.exit(1);
  }
};
// exportar la conexion
module.exports = connectDB;
