import { error } from "console";
import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({
    logger: true,
})

server.register(cors, {
    origin: "*",  // origin: ["www.dio.me"],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
})


const teams = [
     {
            id: 1, 
            name: "Ferrari",
            base: "Maranello, Italy",
        }, 
        {
            id: 2,
            name: "Mercedes",
            base: "Brackley, United Kingdom",
        }, 
        {
            id: 3,
            name: "Red Bull Racing",
            base: "Milton Keynes, United Kingdom",
        }, 
        {
            id: 4,
            name: "McLaren",
            base: "Woking, United Kingdom",
        }
]

const drivers = [
     {
            id: 1,
            name: "Charles Leclerc",
            team: "Ferrari"
        },
        {
            id: 2,
            name: "Carlos Sainz",
            team: "Ferrari"
        },
        {
            id: 3,
            name: "Lewis Hamilton",
            team: "Mercedes"
        },
        {
            id: 4,
            name: "George Russell",
            team: "Mercedes"
        }
]

server.get("/teams", async (request, response) => {
    response.type("aplicattion/json").code(200);
    return [teams]
})

server.get("/drivers", async(request, response) => {
    response.type("aplicattion/json").code(200);

    return [drivers];
})

interface TeamParams {
    id: string;
}

interface DriverParams {
    id: string;
}



server.get<{Params: DriverParams}>("/drivers/:id", async (request, response ) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(d => d.id === id);

    if (!driver)   {
        response.type("applicaton/json").code(404);
        return { message: "Driver not found" };
    }  else {
        response.type("application/json").code (200);
        return driver;
    }

})

server.get<{Params: TeamParams}>("/teams/:id", async (request, response ) => {
    const id = parseInt(request.params.id);
    const team = teams.find(t => t.id === id);

    if (!team)   {
        response.type("applicaton/json").code(404);
        return { message: "Team not found" };
    }  else {
        response.type("application/json").code (200);
        return team;
    }

})


server.listen({ port: 3333}, () => {
    console.log("HTTP server running on http://localhost:3333");
})