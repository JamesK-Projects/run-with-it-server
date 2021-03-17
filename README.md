# Run With It

Link to live app: https://run-with-it-app.vercel.app/

## Summary of App

Run With It is a run-tracking app that allows users to log their runs and see their progress in graph-form.

After creating an account and logging in, the user will first be taken to the home page where they can set their goal distance and pace. They will have the option to go back and adjust this goal whenever they want.

Underneath the user's goal is the run log form, where the user inputs the date, distance, time, and any notes for each run they log.

If the user logs a run that meets their goal, they will be presented with a congratulatory message.

Screenshot of the home page:

![alt text](./images/home-page.png "Home Page Screenshot")

After the user logs their run, the run data will be displayed in two different graphs in the progress page. The user can toggle between graphs that show the distance and the pace of each run. The user can also hover over each data point in the graphs to see a tooltip with that run's data.

The progress page will also display the user's personal best distance and fastest pace at the top of the page.

Screenshot of the progress page:

![alt text](./images/progress-page.png "Progress Page Screenshot")

In addition to the progress page, the data for each run that the user logs can be seen in the data page. Each run's data is displayed in a separate row containing the run's date, distance, time, pace, and notes. 

## Technology Used

### Frontend

- HTML
- CSS
- Javascript
- React
- Hosted on Vercel

### Backend

- Node.js
- PostgreSql
- Hosted on Heroku

## API Documentation

### Endpoints

#### /api/users

The /users endpoint houses the login information of each user who makes an account, as well as the user's goals that they set.

example user:

{

    id: 1,

    name: 'John Smith',

    email: 'JSmith@exapmle.com',

    password: 'Smith123',

    goal_distance: 5,
    
    goal_pace: 600

},

GET /users - gets the list of all users

POST /users - adds a new user to the list of users

PATCH /users/:userId - updates the specified user with new data

#### /api/runs

The /runs endpoint contains the data for all of the runs that are created by users. Each run has a user_id which references the id of the user that created it.

example run:

{

    id: 2,

    user_id: 1,

    distance: 4.2,

    date: '2021-03-10',

    time: 2435,

    note: 'Great run!'

}

GET /runs - gets the list of all runs

POST /runs - adds a new run to the list of runs
