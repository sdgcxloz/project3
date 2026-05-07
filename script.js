let playerKey = null;

async function join() {

    const res = await fetch("https://tinkr.tech/sdb/poly/wander", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            action: "join",
            username: "user" + Math.floor(Math.random() * 1000)
        })
    });

    const data = await res.json();

    playerKey = data.player_key;

    console.log("Joined:", playerKey);
}

async function getWorld() {

    const res = await fetch("https://tinkr.tech/sdb/poly/wander");

    return await res.json();
}

function draw(world) {

    const game = document.getElementById("game");

    game.innerHTML = "";

    for (const p of world.players) {

        const div = document.createElement("div");

        div.classList.add("player");

        div.style.left = p.x + "px";
        div.style.top = p.y + "px";

        const img = document.createElement("img");

        img.src = p.image;
        img.width = p.width;
        img.height = p.height;

        const name = document.createElement("div");

        name.classList.add("name");

        name.textContent = p.username;

        div.appendChild(img);
        div.appendChild(name);

        // speech bubble
        if (p.message) {

            const bubble = document.createElement("div");

            bubble.classList.add("bubble");

            bubble.textContent = p.message;

            div.appendChild(bubble);
        }

        game.appendChild(div);
    }
}

async function move(x, y) {

    const res = await fetch("https://tinkr.tech/sdb/poly/wander", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            action: "move",
            player_key: playerKey,
            x: x,
            y: y
        })
    });

    return await res.json();
}

async function talk(message) {

    const res = await fetch("https://tinkr.tech/sdb/poly/wander", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            action: "talk",
            player_key: playerKey,
            message: message
        })
    });

    return await res.json();
}

async function start() {

    await join();

    setInterval(async () => {

        const world = await getWorld();

        draw(world);

    }, 1000);
}

document.getElementById("game").addEventListener("click", async (e) => {

    const x = e.offsetX;
    const y = e.offsetY;

    await move(x, y);
});

document.getElementById("send").addEventListener("click", async () => {

    const input = document.getElementById("msg");

    const msg = input.value;

    if (msg.trim() !== "") {

        await talk(msg);

        input.value = "";
    }
});

start();
