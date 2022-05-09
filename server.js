const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()



mongoose.connect('YOUR CONNECTION STRING', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then( () => {
    console.log("Database connected")
})

mongoose.connection.on("error", err => {
    console.log(`DB connection error : ${ err.message }`)
})


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
app.use(express.urlencoded())
app.use(userRoutes)
app.use(breakdownRoutes)
app.use(reportRoutes)
app.use(allocationRoutes)
app.use(ProjectRoutes)
app.use(LogRoutes)
app.use(PublishRoutes)



const port = process.env.PORT || 4000


app.listen(port, ()=>{
    console.log('Server running on Port '+ port)
})

