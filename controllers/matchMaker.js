const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
        console.log('current user = ', currentUser);
        let removedCurrUserArray = [];
        console.log('\n\n------------getTotalUsers------------\n', getTotalUsers);
        for (let foundUser of getTotalUsers) {
            /*if (!currentUser.likedUsers.includes(foundUser.username) &&       leave this code commented while testing because there arent very many users and thus, an error will occur because the array could be empty
                !currentUser.dislikedUsers.includes(foundUser.username) &&
                foundUser.username !== username) {*/
            removedCurrUserArray.push(foundUser);
            //}
        }

        console.log('\n\n------------getTotalUsers after checking if a user exists in liked/disliked users and checking for current user in response------------\n', removedCurrUserArray);
        res.send(removedCurrUserArray);

    } catch (err) {
        console.log(err.message)
    }
}

const postLikeDislike = async (req, res) => {
    console.log('postLikeDislike function run');
    const { otherUserUsername, likedUser } = req.body;
    console.log(`otherUserUsername is ${otherUserUsername} and likedUser is equal to ${likedUser}`); // for debugging
    const token = req.cookies.token;
    const { username } = jwt.verify(token, process.env.SECRET_STR);
    console.log('username is equal to =', username);
    if (likedUser == true) {
        const currentUser = await User.findOneAndUpdate(
            { username },
            { $push: { likedUsers: otherUserUsername } }
            //{ new: true }
        )
        console.log(`\n\n\nUpdated user: ${currentUser}`);
        const findLikedUserObj = await User.findOne(
            { username: otherUserUsername }
        )
        console.log("\n-----------findLikedUserObj has run-----------\n", findLikedUserObj);
        if (findLikedUserObj.likedUsers.length !== 0 && findLikedUserObj.likedUsers.includes(username) && !findLikedUserObj.matchedUsers.includes(username)) {
            console.log(`\n\n ----- updated user for ${username} and ${otherUserUsername} respectively, shown below -----`);
            let updateMatchArrayUser = await User.findOneAndUpdate({ username }, { $push: { matchedUsers: otherUserUsername } });
            let updateMatchArrayOtherUser = await User.findOneAndUpdate({ username: otherUserUsername }, { $push: { matchedUsers: username } });
            console.log(updateMatchArrayUser, updateMatchArrayOtherUser);
            //res.status(200).json({ "message": `${username} and ${otherUserUsername} have matched!` })
        }
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