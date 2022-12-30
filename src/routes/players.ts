import { Router } from "express"
import { apiRequest } from ".."
import { HTMLParser } from "../HTMLParser"

export const router = Router()

/**
 * @openapi
 * /players/{searchQuery}:
 *   get:
 *     tags:
 *       - Player
 *     summary: Get an list of users that match the search query
 *     parameters:
 *       - in: path
 *         name: searchQuery
 *         schema:
 *           type: string
 *         required: true
 *         description: Rockstar Player Name
 *         example: gtaplayer
 *     responses:
 *       '200':
 *         description: OK
 */
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

/**
 * @openapi
 * /players/{name}:
 *   get:
 *     tags:
 *       - Player
 *     summary: Get a social club player
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Rockstar Player Name
 *         example: gtaplayer
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request. Player prob. invalid.
 */
router.get("/:name", async (req, res) => {
    const result = await apiRequest.req(
        `https://scapi.rockstargames.com/profile/getprofile?nickname=${req.params.name}&maxFriends=1`,
        {}
    )

    if (result.status === false) return res.status(400).send(result)

    res.send(JSON.parse(result))
})

/**
 * @openapi
 * /players/{id}/feed:
 *   get:
 *     tags:
 *       - Player
 *     summary: Get the feed of a social club player
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Rockstar ID
 *         example: 12345
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request. Player prob. invalid.
 */
router.get("/:id/feed", async (req, res) => {
    const result = await apiRequest.req(
        `https://scapi.rockstargames.com/feed/member?rockstarId=${req.params.id}&offset=0&limit=30&group=all`,
        {}
    )

    if (result.status === false) return res.status(400).send(result)

    res.send(JSON.parse(result).activities)
})

/**
 * @openapi
 * /players/stats/{name}:
 *   get:
 *     tags:
 *       - Player
 *     summary: Get detailed statistics of a social club player
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Rockstar Player Name
 *         example: 12345
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Bad Request. Player invalid or profile is private. Check Response Body.
 */
router.get("/stats/:name", async (req, res) => {
    const playerName = req.params.name
    const htmlParser = new HTMLParser()

    //make sure we have a request token in next requests..
    await apiRequest.req("https://socialclub.rockstargames.com/", {
        json: false,
        reqToken: true,
    })

    const stats = htmlParser.parsePlayerStats(
        await apiRequest.req(
            `https://socialclub.rockstargames.com/games/gtav/StatsAjax?character=Freemode&category=Career&nickname=${playerName}&slot=Freemode`,
            { json: false, reqToken: true }
        )
    )

    if (stats.error) return res.status(400).send(stats)

    const overview = htmlParser.parsePlayerOverview(
        await apiRequest.req(
            `https://socialclub.rockstargames.com/games/gtav/career/overviewAjax?character=Freemode&nickname=${playerName}&slot=Freemode`,
            { json: false, reqToken: true }
        )
    )

    res.send({
        ...stats,
        overview: {
            ...overview,
        },
    })
})
