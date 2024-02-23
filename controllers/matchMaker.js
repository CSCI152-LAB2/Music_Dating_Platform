const User = require('../models/User');
require('dotenv').config();

/*const getUsers = async (req, res) => {
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
}*/

const getUsers = async (req, res) => {
    const verified_jwt = jwt.verify(req.cookies.token, process.env.SECRET_STR)
    if (!verified_jwt) {
        return res.redirect('/login');
    }
    const { username } = verified_jwt;
    var usersTopGenre = await User.findOne(
        { username }
    )
    usersTopGenre = usersTopGenre.topGenre;
    const getTotalUsers = await db.users.find(
        { "topGenre": usersTopGenre }, { "username": 1, "firstname": 1, "dob": 1, "location": 1, "sex": 1, "sexualPreference": 1, "topGenre": 1 }       //returns a pointer to the first element that matches the first parameter
    );                                                                                                                                                  //in the "find" query. The second parameter are options of what should be                                                                                                                                                  
    const similarUsers = getTotalUsers.toArray();                                                                                                       //returned in the response
    console.log(similarUsers);
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