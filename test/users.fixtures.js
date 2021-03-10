function makeUsersArray() {
    return [
        {
            id: 1,
            name: 'James test',
            email: 'james@test.com',
            password: 'james123',
            goal_distance: '10',
            goal_pace: '600'
        },
        {
            id: 2,
            name: 'Amy test',
            email: 'amy@test.com',
            password: 'amy123',
            goal_distance: '5',
            goal_pace: '600'
        },
        {
            id: 3,
            name: 'Winston test',
            email: 'winston@test.com',
            password: 'winston123',
            goal_distance: '4',
            goal_pace: '550'
        }
    ];
}

function makeMaliciousUser(){
    const maliciousUser = {
        id: 555,
        name: '<script></script>',
        email: `<img></img>`,
        password: 'mwahaha',
        goal_distance: '4',
        goal_pace: '550'
    }

    const expectedUser = {
        ...maliciousUser,
        name: '&lt;script&gt;&lt;/script&gt;',
        email: `<img></img>`
    }
    return {
        maliciousUser,
        expectedUser
    }
}

function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
            runwithit_users,
            runwithit_runs
        `
      )
      .then(() =>
        Promise.all([
            trx.raw(`ALTER SEQUENCE runwithit_users_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE runwithit_runs_id_seq minvalue 0 START WITH 1`),
            trx.raw(`SELECT setval('runwithit_users_id_seq', 0)`),
            trx.raw(`SELECT setval('runwithit_runs_id_seq', 0)`),
        ])
      )
    )
  }

module.exports = {
    makeUsersArray,
    makeMaliciousUser,
    cleanTables
}