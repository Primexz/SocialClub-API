import express from "express"
import { ApiRequest } from "./RockstarApi/ApiRequest"
import { router as playerRouter } from "./routes/players"
import { router as jobsRouter } from "./routes/jobs"

const app = express()
export const apiRequest = new ApiRequest()

app.use("/players", playerRouter)
app.use("/jobs", jobsRouter)

//bind our new app to default http port 80
app.listen(80, () => {
    console.log(`Started Rockstar API Server!`)
})
