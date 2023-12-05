const User = require('../models/User');
require('dotenv').config();

const getUsers = async (req, res) => {
    const { username, topGenre } = req.body;
    const uri = process.env.DATABASE_URI;
    const databaseName = 'CadenceDB';

    const client = new MongoClient(uri, { useNewUrlPrser: true, useUnifiedTopology: true });
    client.connect();
    console.log('Mongo connected from matchMaker') //used for debugging purposes

    const getTotalUsers = async () => {
        const database = client.db(databaseName);
        const usersCollection = database.collection('users');
        const totalUsers = await usersCollection.find({ topGenre }).toArray();
        //const randomIndex = Math.floor(Math.random() * totalUsers);
        //const randomUser = await usersCollection.findOne({}, { skip: randomIndex }); //returns random user

        return totalUsers;  //array of users
    }

    const usersWithSameGenre = await getTotalUsers();
    const randomIndex = Math.floor(Math.random() * usersWithSameGenre.length);
    res.json({ "retrieved-user": usersWithSameGenre[randomIndex] });
}

const postLikeDislike = async (req, res) => {
    const { username, liked, disliked } = req.body; //username is the username of the user that is currently signed in, while
    if (liked instanceof User) {                    // liked and dislike are the usernames of the users who the user has liked
        const currentUser = await User.findOneAndUpdate(
            { username: username },
            { $push: { likedUsers: liked } },
            { new: true }
        )
        res.status(200).json({ "message": `${liked} added to liked users for ${username}!` })
    } else if (disliked instanceof User) {
        const currentUser = await User.findOneAndUpdate(
            { username: username },
            { $push: { dislikedUsers: disliked } },
            { new: true }
        )
        res.status(200).json({ "message": `${disliked} added to disliked users for ${username}!` })
    } else {
        res.status(400).json({ "message": "Error editing user on backend" });
    }
}

module.exports = { getUsers, postLikeDislike };