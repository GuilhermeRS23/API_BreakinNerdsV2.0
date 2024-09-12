import mongoose from "mongoose";

const connectionDatabase = () => {
    console.log("Aguarde, estabelecendo cenexão com Banco de Dados...");

    mongoose.connect(process.env.URL_MOOGODB)
        .then(() => console.log("Banco MongoDB Atlas conectado."))
        .catch((e) => console.log(e));

}

export default connectionDatabase;
