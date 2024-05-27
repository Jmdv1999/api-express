import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Buscamos al usuario por correo
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };
    user = new User({ email, password });
    await user.save();
    //jwt token
    return res.status(201).json({ mensaje: "Usuario creado de forma exitosa" });
  } catch (error) {
    //Por defecto en moongose
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Ya existe un usuario con este correo" });
    }
    return res.status(500).json({ error: "Algo fallo en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(403)
        .json({ error: "No existe un usuario con este correo electronico" });
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "contraseña incorrecta" });
    //Generar JWT
    const token = jwt.sign({uid: user.id}, process.env.SECRET)

    return res.json({ token : token});
  } catch (error) {
    return res.status(500).json({ error: "Algo fallo en el servidor" });
  }
};
