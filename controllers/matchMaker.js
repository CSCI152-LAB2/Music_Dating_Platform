const User = require('../models/User');
const jwt = require('jsonwebtoken');
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
    console.log('getUsers running in backend');
    try {
        //let similarUsers = [];
        console.log('getUsers running');
        const verified_jwt = jwt.verify(req.cookies.token, process.env.SECRET_STR);
        console.log('jwt was verified successfully');
        if (!verified_jwt) {
            return res.redirect('/login');
        }
        const { username } = verified_jwt;
        let currentUser = await User.findOne(
            { username }
        );
        let usersTopGenre = currentUser.topGenre;
        const getTotalUsers = await User.find(
            { "topGenre": usersTopGenre }
        )
        // FIX ME
        let removedCurrUserArray = "";
        console.log('\n\n------------getTotalUsers------------\n', getTotalUsers);
        for (let foundUsers in getTotalUsers) { // probably would be more efficient to do this step wehn actually getting the users on line 44 but I'm not sure how to do that. Will do later if there is time
            if (foundUsers.username === username) {
                removedCurrUserArray = getTotalUsers.splice(getTotalUsers.indexOf(foundUsers), 1); // removes the signed in user from their queue of potential 
                console.log('\n\n------------getTotalUsers after splicing------------\n', removedCurrUserArray);
            }
            if (foundUsers.username in currentUser.likedUsers || foundUsers.username in currentUser.dislikedUsers) {
                removedCurrUserArray = removedCurrUserArray.splice(removedCurrUserArray.indexOf(foundUsers), 1);
            }
        }
        console.log('\n\n------------getTotalUsers after checking if a user exists in liked users------------\n', getTotalUsers);
        res.send(removedCurrUserArray);
        //
    } catch (err) {
        console.log(err.message)
    }
}

const postLikeDislike = async (req, res) => {
    console.log('postLikeDislike function run');
    const { otherUserUsername, likedUser } = req.body;
    console.log(`otherUserUsername is ${otherUserUsername} and likedUser is equal to ${likedUser}`); // for debugging
    const token = req.cookies.token;
    console.log(token);     // for debugging
    const { username } = jwt.verify(token, process.env.SECRET_STR);
    console.log(username);  // for debugging
    if (likedUser == true) {
        const currentUser = await User.findOneAndUpdate(
            { username },
            { $push: { likedUsers: otherUserUsername } }
            //{ new: true }
        )
        console.log(`\n\n\nUpdated user: ${currentUser}`);
        res.status(200).json({ "message": `${otherUserUsername} added to liked users for ${username}!` })
    } else if (likedUser == false) {
        const currentUser = await User.findOneAndUpdate(
            { username },
            { $push: { dislikedUsers: otherUserUsername } }
        )
        res.status(200).json({ "message": `${otherUserUsername} added to disliked users for ${username}!` })
    } else {
        res.status(400).json({ "message": "Error editing user on backend" });
    }
}

module.exports = { getUsers, postLikeDislike };