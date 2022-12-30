import { Router } from "express"
import { apiRequest } from ".."

export const router = Router()

/**
 * @openapi
 * /jobs/{searchQuery}:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: Get an list of the jobs that match the search query
 *     parameters:
 *       - in: path
 *         name: searchQuery
 *         schema:
 *           type: string
 *         required: true
 *         description: Job Name
 *         example: racing
 *     responses:
 *       '200':
 *         description: OK
 */
router.get("/:searchQuery", async (req, res) => {
    const result = JSON.parse(
        await apiRequest.req(
            `https://scapi.rockstargames.com/search/mission?dateRange=last7&sort=likes&platform=pc&title=gtav&includeCommentCount=true&pageSize=25&searchTerm=${req.params.searchQuery}`,
            {}
        )
    )

    res.send({
        total: result.total,
        jobs: result.content.items.map((job: any) => {
            return {
                id: job.id,
                title: job.title,
                name: job.name,
                description: job.desc,
                timesPlayed: job.playedCount,
                createdAt: job.createdDate,
                category: job.category,
                likes: job.likeCount,
                dislikes: job.dislikeCount,
                image: job.imgSrc,
                platform: job.platform,
                type: job.type,
                userId: job.userID,
            }
        }),
    })
})
