import { User } from "../models/User.js";

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
export const login = (req, res) => {
  res.json({ ok: "login" });
};
