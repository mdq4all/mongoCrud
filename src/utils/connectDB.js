import { connect, connection } from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error("MONGODB_URI must be defined");

const conn = {
    isConnected: false
}

export const connectDB = async () => {
    if (conn.isConnected) return

    const db = await connect(MONGODB_URI);
    //console.log(db.connection.db.databaseName)
    conn.isConnected = db.connections[0].readyState
};
connection.on('connected', () => {
    console.log('Mongo DB is connected')
})
connection.on('erro', () => {
    console.log('Mongoose connection error', error)
})