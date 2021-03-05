const UsersService = {
    getAllUsers(knex){
        return knex
            .select('*')
            .from('runwithit_users')
    },
    insertUser(knex, newUser){
        return knex
            .insert(newUser)
            .into('runwithit_users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id){
        return knex
            .from('runwithit_users')
            .select('*')
            .where('id', id)
            .first()
    },
    updateUser(knex, id, newUserFields){
        return knex('runwithit_users')
            .where({ id })
            .update(newUserFields)
    }

}

module.exports = UsersService;