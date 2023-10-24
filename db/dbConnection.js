import mongoose from "mongoose";

let dbConnection =async (db) => {
    try {
        await mongoose.connect(db).then((result) => {
            console.log('connected to database')
        }).catch((err) => {
            console.log('error while connecting to database', err);
        });

    } catch (error) {
        console.log(error);
    }
}

export default dbConnection