import { Router } from "express"
import { apiRequest } from ".."
import { HTMLParser } from "../HTMLParser"

export const router = Router()

router.get("/search/:searchQuery", async (req, res) => {
    const result = JSON.parse(
        await apiRequest.req(
            `https://scapi.rockstargames.com/search/user?includeCommentCount=true&searchTerm=${req.params.searchQuery}`,
            {}
        )
    )

    res.send({
        total: result.total,
        accounts: result.accounts.map((account: any) => {
            return {
                id: account.rockstarId,
                name: account.nickname,
                service: account.service,
                serviceNickname: account.serviceNickname,
                services: account.services,
                avatar: account.avatarUrl,
                crew: account.crew || "None",
            }
        }),
    })
})

router.get("/:name", async (req, res) => {
    const result = await apiRequest.req(
        `https://scapi.rockstargames.com/profile/getprofile?nickname=${req.params.name}&maxFriends=1`,
        {}
    )

    res.send(result)
})

router.get("/:id/feed", async (req, res) => {
    const result = await apiRequest.req(
        `https://scapi.rockstargames.com/feed/member?rockstarId=${req.params.id}&offset=0&limit=30&group=all`,
        {}
    )

    res.send(result.activities)
})

router.get("/stats/:name", async (req, res) => {
    const playerName = req.params.name

    //make sure we have a request token in next requests..
    await apiRequest.req("https://socialclub.rockstargames.com/", {
        json: false,
        reqToken: true,
    })

    const stats = await apiRequest.req(
        `https://socialclub.rockstargames.com/games/gtav/StatsAjax?character=Freemode&category=Career&nickname=${playerName}&slot=Freemode`,
        { json: false, reqToken: true }
    )
    const overview = await apiRequest.req(
        `https://socialclub.rockstargames.com/games/gtav/career/overviewAjax?character=Freemode&nickname=${playerName}&slot=Freemode`,
        { json: false, reqToken: true }
    )

    const htmlParser = new HTMLParser()
    res.send({
        ...htmlParser.parsePlayerStats(stats),
        overview: {
            ...htmlParser.prasePlayerOverview(overview),
        },
    })
})
