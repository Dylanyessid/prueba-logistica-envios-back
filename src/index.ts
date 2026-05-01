import "reflect-metadata";
import express from "express"
import { AppDataSource } from "./config/db.js"
import apiRouter from "./routes/index.js"

const app = express()

app.use(express.json())
app.use('/api/v1', apiRouter)


const connectDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }
}


app.listen(3000, async () => {
  try {
    await connectDB()
    console.log("Server is running on port 3000")
  } catch (error) {
    console.error("Error connecting to the database:", error)
  }

})
