const RunsService = {
    getAllRuns(knex) {
        return knex.select('*').from('runwithit_runs')
    },
    insertRun(knex, newRun){
        return knex
            .insert(newRun)
            .into('runwithit_runs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = RunsService;