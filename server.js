const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const CronJob = require('cron').CronJob;
const Cron = require('./backup.js');

const url = 'mongodb://alias:gbolly@localhost:27017/?authMechanism=DEFAULT&tls=false&authSource=lasubeb';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

// mongoose.connect('mongodb+srv://aliasgbolly:Gbolly16@lasubebcluster.zjqmm.mongodb.net/lasubeb?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then( () => {
//     console.log("Database connected")
// })

// mongoose.connection.on("error", err => {
//     console.log(`DB connection error : ${ err.message }`)
// })


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(cors())

const userRoutes = require('./routes/users')
const breakdownRoutes = require('./routes/breakdown')
const reportRoutes = require('./routes/monitoring-report')
const allocationRoutes = require('./routes/allocation')
const ProjectRoutes = require('./routes/project-data')
const LogRoutes = require('./routes/logs')
const PublishRoutes = require('./routes/publish')



app.use(express.json())
app.use(userRoutes)
app.use(breakdownRoutes)
app.use(reportRoutes)
app.use(allocationRoutes)
app.use(ProjectRoutes)
app.use(LogRoutes)
app.use(PublishRoutes)

// require('backup.js')
// global.CronJob = require('./cron.js');

const port = process.env.PORT || 4000


app.listen(port, ()=>{
    console.log('Server running on Port '+ port)
})

