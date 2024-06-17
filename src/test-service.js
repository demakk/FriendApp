class FriendsService {
    /**
     * Adds a friend to the user's list.
     * @param {Object} friendDetails - An object containing the friend's name and status.
     */
    addFriend(friendDetails) {
        // Assuming friendDetails is structured as follows:
        // { name: 'John Doe', status: 'not confirmed' }
        try {
            const whereClause = `name = '${friendDetails.name}'`;
            const queryBuilder = Backendless.DataQueryBuilder.create().setWhereClause(whereClause);
            const friend = Backendless.Data.of('Users').find(queryBuilder)[0]; // Simplified for demonstration

            if (!friend) {
                throw new Error('Friend not found');
            }

            const userFriends = Backendless.Data.of('Users').find({ objectId: friendDetails.userId })['friends']; // Simplified for demonstration
            userFriends.push({
                "name": friend.name,
                "status": friendDetails.status,
                "friendId": friend.objectId
            });

            Backendless.Data.of('Users').save({
                objectId: friendDetails.userId,
                friends: userFriends
            });

            return { status: 'success', message: 'Friend added successfully.' };
        } catch (err) {
            console.error('Error adding friend:', err);
            throw err;
        }
    }

    /**
     * Removes a friend from the user's list.
     * @param {Object} friendToRemove - An object containing the friend's ID to be removed.
     */
    removeFriend(friendToRemove) {
        try {
            const userFriends = Backendless.Data.of('Users').find({ objectId: friendToRemove.userId })['friends']; // Simplified for demonstration
            const updatedFriends = userFriends.filter(friend => friend.friendId!== friendToRemove.friendId);

            Backendless.Data.of('Users').save({
                objectId: friendToRemove.userId,
                friends: updatedFriends
            });

            return { status: 'success', message: 'Friend removed successfully.' };
        } catch (err) {
            console.error('Error removing friend:', err);
            throw err;
        }
    }

    /**
     * Retrieves the list of friends for a given user.
     * @param {String} userId - The ID of the user whose friends list to retrieve.
     * @returns {Array} A list of friends.
     */
    getFriends(userId) {
        try {
            const queryBuilder = Backendless.DataQueryBuilder.create()
              .where('userId = "' + userId + '"')
              .orderBy('createdAt DESC'); // Optional: Order by creation date
            const friends = Backendless.Data.of('Users').find(queryBuilder);
            return friends;
        } catch (err) {
            console.error('Error fetching friends:', err);
            throw err;
        }
    }

    /**
     * Calculates the total number of friends for a given user.
     * @param {String} userId - The ID of the user whose friends count to calculate.
     * @returns {Number} The total number of friends.
     */
    calculateTotal(userId) {
        try {
            const friendsCount = Backendless.Data.of('Users').find({ objectId: userId })['friends'].length;
            return friendsCount;
        } catch (err) {
            console.error('Error calculating total friends:', err);
            throw err;
        }
    }
}

// Register the service with Backendless
Backendless.ServerCode.addService(FriendsService);
