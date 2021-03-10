const dateFormat = require('dateformat');
const { json } = require('express');

function makeRunsArray() {
    return [
        {
            id: 1,
            user_id: 1,
            distance: '1',
            date: '2021-03-03',
            time: '600',
            note: 'user 1 run 1'
        },
        {
            id: 2,
            user_id: 1,
            distance: '2',
            date: '2021-03-03',
            time: '1100',
            note: 'user 1 run 2'
        },
        {
            id: 3,
            user_id: 2,
            distance: '1',
            date: '2021-03-03',
            time: '600',
            note: 'user 2 run 1'
        },
        {
            id: 4,
            user_id: 2,
            distance: '2',
            date: '2021-03-03',
            time: '1100',
            note: 'user 2 run 2'
        },
        {
            id: 5,
            user_id: 3,
            distance: '1',
            date: '2021-03-03',
            time: '600',
            note: 'user 3 run 1'
        },
        {
            id: 6,
            user_id: 3,
            distance: '2',
            date: '2021-03-03',
            time: '1100',
            note: 'user 3 run 2'
        },
    ];
}

function makeMaliciousRun(){
    const maliciousRun = {
        id: 555,
        user_id: 3,
        distance: '100',
        date: '2021-03-03',
        time: '9000',
        note: '<script></script>',
    }

    const expectedRun = {
        ...maliciousRun,
        name: '&lt;script&gt;&lt;/script&gt;',
        user_id: 3
    }

    return {
        maliciousRun,
        expectedRun
    }
}

module.exports = {
    makeRunsArray,
    makeMaliciousRun
}