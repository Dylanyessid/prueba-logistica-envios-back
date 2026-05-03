import "reflect-metadata";
import express from "express"
import { AppDataSource } from "./config/db.js"
import apiRouter from "./routes/index.js"
import { swaggerSpec } from "./config/swagger.js"
import cors from "cors"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
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
