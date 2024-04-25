import mongoose from "mongoose";
try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Conexion con la DB OK")
} catch (error) {
    console.log("error de la conxion a la DB: "+error) 
}