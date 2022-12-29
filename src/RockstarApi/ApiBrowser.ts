import * as puppeteer from "puppeteer"
import { wait } from "../util"

export default class ApiBrowser {
    private browser: puppeteer.Browser = new puppeteer.Browser()
    protected page: puppeteer.Page = new puppeteer.Page()
    ready: boolean = false

    constructor() {
        this.init()
        this.setInterval()
    }

    private async init() {
        console.log("Starting Chrome..")
        this.browser = await puppeteer.launch({ headless: false })
        this.page = await this.browser.newPage()
        await this.page.goto(
            "https://signin.rockstargames.com/signin/user-form?cid=socialclub",
            { waitUntil: "networkidle2" }
        )
        await wait(15000).then(() => this.waitForLogin())
    }

    private async setup(): Promise<void> {
        this.page = await this.browser.newPage()
        await this.page.goto("https://socialclub.rockstargames.com/", {
            waitUntil: "networkidle2",
        })
        await wait(2000)
        console.log("Rockstar API Client is ready!")
        this.ready = true
    }

    private waitForLogin(): void {
        if (this.page.url().includes("https://socialclub.rockstargames.com/"))
            wait(2000).then(() => this.setup())
        else setTimeout(() => this.waitForLogin(), 1500)
    }

    private setInterval(): void {
        setInterval(() => {
            if (this.ready) {
                this.page
                    .evaluate(() => window.location.reload())
                    .catch(() => null)
            }
        }, 10 * 60 * 1000)
    }

    public fetch(
        url: string,
        options: RequestOptions,
        json?: boolean
    ): Promise<{ status: boolean; e?: Error; code: number; body: any }> {
        return this.page.evaluate(
            async (url: string, options: any, json: any) => {
                try {
                    const res = await fetch(url, options)
                    if (res.status > 250 || res.status < 200) {
                        return { status: false, e: res, code: res.status }
                    }
                    const body = await (json ? res.json() : res.text())
                    const obj = { status: true, body }
                    if (
                        json &&
                        (body.status === false || body.Status === false)
                    )
                        return { status: false, body: obj, e: "FALSE_STATUS" }
                    return obj
                } catch (e) {
                    return { status: false, e: e && e.toString() }
                }
            },
            url,
            options as any,
            json
        ) as any
    }
}

export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: any
    headers?: any
    credentials?: "omit" | "same-origin" | "include"
    refreshAccess?: boolean

    json?: boolean
    reqToken?: boolean
}
