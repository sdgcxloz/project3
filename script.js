async function fetchWorld() {
    const res = await fetch("https://tinkr.tech/sdb/poly/wander");
    const world = await res.json();
    return world;
}

function renderWorld(world) {
    const container = document.getElementById("game");
    container.innerHTML = "";

    for (const player of world.players) {
        const playerDiv = document.createElement("div");
        playerDiv.classList.add("player");
        playerDiv.style.position = "absolute";
        playerDiv.style.left = player.x + "px";
        playerDiv.style.top = player.y + "px";

        const img = document.createElement("img");
        img.src = player.image;
        img.width = player.width;
        img.height = player.height;
        playerDiv.appendChild(img);

        const name = document.createElement("div");
        name.textContent = player.username;
        playerDiv.appendChild(name);

        container.appendChild(playerDiv);
    }
}

setInterval(async () => {
    const world = await fetchWorld();
    renderWorld(world);
}, 1000);