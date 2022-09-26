const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/editMiddleware')
const connectDB = require('./config/db')
const path = require('path')
const PORT = process.env.PORT || 8000  

//connect to database
connectDB()



const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Routes 
app.use('/api/users' , require('./routes/useRoutes'))
app.use('/api/tickets' , require('./routes/ticketRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production'){
    // Set build folser as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}
else{
    app.get('/' , (_, res) => {
        res.status(200).json({massage : "Welcome to the support desk"})
    })
}

app.use(errorHandler)


app.listen(PORT , () => console.log(`server started on port ${PORT}`))