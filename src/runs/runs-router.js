const express = require('express')
const RunsService = require('./runs-service')
const xss = require('xss')
const path = require('path')

const runsRouter = express.Router()
const jsonParser = express.json()

const serializeRun = run => ({
    id: run.id,
    user_id: run.user_id,
    distance: xss(run.distance),
    date: xss(run.date),
    time: xss(run.time),
    note: xss(run.note)
})

runsRouter
    .route('/')
    .get((req, res, next) => {
        RunsService.getAllRuns(
            req.app.get('db')
        )
        .then(runs => {
            res.json(runs.map(serializeRun))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { user_id, distance, date, time, note } = req.body
        const newRun = { user_id, distance, date, time, note }

        for (const [key, value] of Object.entries(newRun)) {
            if (value == null){
                return res.status(400).json({
                    error: { message: `Missing ${key} in request body` }
                })
            }
        }

        RunsService.insertRun(
            req.app.get('db'),
            newRun
        )
        .then(run => {
            if(!run){
                return res.status(404).json({
                    error: {
                        message: 'Run does not exist'
                    }
                })
            }
            res.run = run
            next()
        })
        .catch(next)
    })

module.exports = runsRouter;