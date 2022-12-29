import ApiBrowser, { RequestOptions } from "./ApiBrowser"

export class ApiRequest extends ApiBrowser {
    private reqToken: string = ""

    async req(
        url: string,
        { json, reqToken, ...options }: RequestOptions
    ): Promise<any> {
        options = await this.setDefaultHeader(options, reqToken)

        // Perform the actuall request
        let res = await this.fetch(url, options, json)
        if (res.status === false && res.code === 401) {
            // Refresh the bearer, and re-try
            if (await this.refreshBearer()) {
                options = await this.setDefaultHeader(options, reqToken)
                res = await this.fetch(url, options, json)
            } else throw new Error("DISCONNECTED")
        }

        if (
            res.body?.includes(
                '__RequestVerificationToken" type="hidden" value="'
            )
        )
            this.reqToken = res.body
                .split('__RequestVerificationToken" type="hidden" value="')[1]
                .split('"')[0]

        return res.body
    }

    private getBearerToken(): Promise<string> {
        return this.page.evaluate(
            () =>
                document.cookie
                    .toString()
                    .split("BearerToken=")[1]
                    .split(";")[0]
        )
    }

    private async setDefaultHeader(
        options: RequestOptions,
        reqToken?: boolean
    ): Promise<RequestOptions> {
        if (reqToken) {
            Object.assign(options, {
                headers: {
                    requestVerificationToken: this.reqToken,
                },
            })
        } else {
            Object.assign(options, {
                credentials: "omit",
                headers: {
                    authorization: "Bearer " + (await this.getBearerToken()),
                },
            })
        }

        Object.assign(options.headers, {
            "x-requested-with": "XMLHttpRequest",
            "x-lang": "en-US",
            "x-cache-ver": 0,
        })

        console.log(options)

        if (options.body) {
            options.body = JSON.stringify(options.body)
            options.headers["Content-Type"] = "application/json"
        }
        return options
    }

    private async refreshBearer() {
        const options = {
            body:
                "accessToken=" +
                encodeURIComponent(await this.getBearerToken()),
            credentials: "same-origin" as "same-origin",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-type":
                    "application/x-www-form-urlencoded; charset=utf-8",
            },
            method: "POST" as "POST",
        }
        return this.fetch(
            "https://socialclub.rockstargames.com/connect/refreshaccess",
            options,
            false
        )
            .then(() => true)
            .catch((e) => false)
    }
}
