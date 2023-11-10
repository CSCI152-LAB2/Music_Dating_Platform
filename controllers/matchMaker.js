const User = require('../models/User');
require('dotenv').config();

const getUsers = async (req, res) => {
    const uri = process.env.DATABASE_URI;
    const databaseName = 'CadenceDB';

    const client = new MongoClient(uri, { useNewUrlPrser: true, useUnifiedTopology: true });
    client.connect();
    console.log('Mongo connected from matchMaker') //used for debugging purposes

    const getTotalUsers = async () => {
        const database = client.db(databaseName);
        const usersCollection = database.collection('users');
        const totalUsers = await usersCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * totalUsers);
        const randomUser = await usersCollection.findOne({}, { skip: randomIndex }); //returns random user

        return randomUser;
    }

    const randomUser = await getTotalUsers();
    res.json({ "retrieved-user": randomUser });
}

const postLikeDislike = async (req, res) => {

}

module.exports = { getUsers, postLikeDislike };