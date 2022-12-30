import swaggerJSDoc from "swagger-jsdoc"

export const swaggerOptions = <swaggerJSDoc.Options>{
    definition: {
        swagger: "2.0",
        info: {
            title: "Social Club API",
            version: "1.0.0",
            description:
                "An unofficial API for Rockstar Games Social Club API with the goal of making data more easily accessible.",
            contact: {
                name: "Discord",
                url: "https://radicmenu.xyz/discord",
            },
        },
        servers: [
            {
                url: "https://scapi.radicmenu.xyz",
            },
        ],
        tags: [
            {
                name: "Player",
                description: "API Endpoints for Social Club Players",
            },
            {
                name: "Jobs",
                description: "API Endpoints for Jobs",
            },
        ],
    },
    apis: ["./src/routes/*.ts"],
}
