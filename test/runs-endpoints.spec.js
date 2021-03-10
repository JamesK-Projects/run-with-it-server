const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeRunsArray, makeMaliciousRun } = require('./runs.fixtures')
const { makeUsersArray } = require('./users.fixtures')
const dateFormat = require('dateformat')

describe('Runs Endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE runwithit_users, runwithit_runs RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE runwithit_users, runwithit_runs RESTART IDENTITY CASCADE'))

    describe('GET /api/runs', () => {
        context('Given no runs', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/runs')
                    .expect(200, [])
            })
        })

        context('Given there are runs in the database', () => {
            const testUsers = makeUsersArray();
            const testRuns = makeRunsArray();

            beforeEach('insert runs', () => {
                return db
                    .into('runwithit_users')
                    .insert(testUsers)
                    .then(() => {
                        return db
                            .into('runwithit_runs')
                            .insert(testRuns)
                    })
            })

            it('GET /api/runs responds with 200 and all of the runs', () => {
                return supertest(app)
                    .get('/api/runs')
                    .expect(200, testRuns)
            })
        })
    })

    describe('POST /api/runs', () => {
        context('Given there are runs in the database', () => {
            const testUsers = makeUsersArray();

            beforeEach('insert users', () => {
                return db
                    .into('runwithit_users')
                    .insert(testUsers)
            })

            it('creates a run, responding in 201 and the new run', () => {
                const newRun = {
                    user_id: 1,
                    distance: 200,
                    date: '2021-03-03',
                    time: 100000,
                    note: 'test run'
                }
                
                return supertest(app)
                    .post('/api/runs')
                    .send(newRun)
                    .expect(201)
                    .expect(res => {
                        expect(res.body[0].user_id).to.eql(newRun.user_id)
                        expect(res.body[0].distance).to.eql(newRun.distance)
                        expect(res.body[0].date).to.eql(newRun.date)
                        expect(res.body[0].time).to.eql(newRun.time)
                        expect(res.body[0].note).to.eql(newRun.note)
                        expect(res.body[0]).to.have.property('id')
                    })
                    .then(postRes => {
                        supertest(app)
                            .get(`/api/runs/${postRes.body.id}`)
                            .expect(postRes.body)
                    })
            })
        })

        const requiredFields = ['user_id', 'distance', 'date', 'time']
        requiredFields.forEach(field => {
            const newRun = {
                user_id: 2,
                distance: 150,
                date: '2021-03-03',
                time: 55555
            }
        
            it(`responds with 400 and an error message when the ${field} is missing`, () => {
                delete newRun[field]
                return supertest(app)
                    .post('/api/runs')
                    .send(newRun)
                    .expect(400, {
                        error: { message: `Missing ${field} in request body` }
                    })
            })
        })
    })

})