import mongodb from 'mongoose'

export const db = async () => {
    await mongodb.connect(process.env.MONGODB_URI, {

    }).then(() => { console.log("databse connected ✅ "); }).catch((err) => console.log("error to connect❌", err))
    mongodb.connection.on('error', err => {
        console.error('❌ Mongoose connection error:', err);
    })
    mongodb.connection.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB❌');
    });
}

