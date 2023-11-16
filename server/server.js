require('dotenv').config();
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000
const userRoutes = require("./routes/user.routes")
const drinkRoutes = require("./routes/drink.routes")

require('./config/mongoose.config')

app.use('/public/uploads', express.static('public/uploads'))
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/user', userRoutes)
app.use('/api/drinks', drinkRoutes)


app.listen(port, () => console.log(`The server is running on port ${port}`))