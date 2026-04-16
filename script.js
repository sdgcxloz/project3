let playerKey = null;
async function join() {
   const res = await fetch("https://tinkr.tech/sdb/poly/wander", {
       method: "POST",
       headers: {"Content-Type": "application/json"},
       body: JSON.stringify({
           action: "join",
           username: "student_" + Math.floor(Math.random() * 1000)
       })
   });

   const data = await res.json();
   playerKey = data.player_key;

   console.log("Joined with key:", playerKey);
}

async function getWorld() {
   const res = await fetch("https://tinkr.tech/sdb/poly/wander");
   return await res.json();
}
function draw(world) {
   const game = document.getElementById("game");
   game.innerHTML = "";

   for (let p of world.players) {
       const div = document.createElement("div");
       div.className = "player";
       div.style.left = p.x + "px";
       div.style.top = p.y + "px";

       const img = document.createElement("img");
       img.src = p.image;
       img.width = p.width;
       img.height = p.height;

       const name = document.createElement("div");
       name.textContent = p.username;

       div.appendChild(img);
       div.appendChild(name);
       game.appendChild(div);
   }
}
async function start() {
   await join();

   setInterval(async () => {
       const world = await getWorld();
       draw(world);
   }, 1000);
}
start();
