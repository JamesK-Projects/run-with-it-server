const RunsService = {
    getAllRuns(knex) {
        console.log('getRuns')
        return knex.select('*').from('runwithit_runs')
    },
    insertRun(knex, newRun){
        console.log('insertRun')
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