class TaskService {
    /**
     * Gets the total number of users in the Users table.
     * @returns {Promise<number>} The total number of users.
     */
    async getUserCount() {
        try {
             const dataQueryBuilder = Backendless.DataQueryBuilder.create().setProperties( 'Count(objectId)');
             const userCount = Backendless.Data.of( 'Users' ).find( dataQueryBuilder )

            return userCount;
        } catch (err) {
            console.error('Error getting user count:', err);
            throw err;
        }
    }

    /**
     * Gets the current online user count from the Statistics table.
     * @returns {number} The current online user count.
     */
    async getOnlineCount() {
        try {
            const data = await Backendless.Data.of('Statistics').find();
            return data[0].onlineCount;
        } catch (err) {
            console.error('Error getting online count:', err);
            throw err;
        }
    }
}

// Register the service with Backendless
Backendless.ServerCode.addService(TaskService);
