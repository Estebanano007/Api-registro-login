// se crea las constantes
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

exports.registro = async (req, res) => {
  const { usuario, contraseña } = req.body;
// mensajes informativos
  try {
    const existe = await Usuario.findOne({ usuario });
    if (existe) return res.status(400).json({ mensaje: 'Usuario ya existe' });
// estructura BD
    const hash = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = new Usuario({ usuario, contraseña: hash });
    await nuevoUsuario.save();
//Se define formato para el CRUD
    res.json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;
// mensajes informativos
  try {
    const encontrado = await Usuario.findOne({ usuario });
    if (!encontrado) return res.status(401).json({ mensaje: 'Autenticación fallida' });

    const valido = await bcrypt.compare(contraseña, encontrado.contraseña);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

    res.json({ mensaje: 'Autenticación satisfactoria' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
