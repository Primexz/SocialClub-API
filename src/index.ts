import express from "express"
import { ApiRequest } from "./RockstarApi/ApiRequest"
import { router as playerRouter } from "./routes/players"
import { router as jobsRouter } from "./routes/jobs"
import morgan from "morgan"

const app = express()
export const apiRequest = new ApiRequest()

//log http request
app.use(morgan("tiny"))

app.use("/players", playerRouter)
app.use("/jobs", jobsRouter)

//bind our new app to default http port 80
app.listen(80, () => {
    console.log(`Started Rockstar API Server!`)
})
