import { Player } from "./classes/Player.js";
import { Projectile } from "./classes/Projectile.js";
import { Enemy } from "./classes/Enemy.js";

import drowFunc from "./functions/drawsFunctions/commonPlayerDrows.js";
import updateFunc from "./functions/updateFunctions/commonUpdate.js";
import menuItems from "./consts/menuItems.js";
import createAreas from "./utils/createAreas.js";

const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");
const drawFunc = drowFunc;
const xStart = canvas.width / 2;
const yStart = canvas.height / 2;
const projectilesArr = [];
const enemiesArr = [];
const player = new Player(
    { x: xStart, y: yStart, radious: 30, color: "blue", ctx: ctx },
    { draw: drawFunc }
);

function spawnEnemies() {
    let itemsLocal = menuItems;
    itemsLocal = createAreas(menuItems, canvas);
    itemsLocal.forEach(item => {
        enemiesArr.push(
            new Enemy(
                {
                    x: xStart,
                    y: yStart,
                    radious: 60,
                    color: item.color,
                    ctx: ctx,
                    velosity: {
                        x: 1,
                        y: 1,
                    },
                    itemLink: item
                },
                { draw: drawFunc, update: updateFunc }
            )
        )
    });
    console.log(enemiesArr);
}

spawnEnemies();

let delay = false;
let intervaleId;
window.addEventListener("mousemove", (event) => {
    if (!delay) {
        if (intervaleId) {
            clearInterval(intervaleId);
        }
        delay = true;
        intervaleId = setInterval(() => {
            delay = false;
            const projectile = new Projectile(
                {
                    x: xStart,
                    y: yStart,
                    radious: 5,
                    color: "red",
                    ctx: ctx,
                    velosity: {
                        x: 1,
                        y: 1,
                    },
                },
                { draw: drawFunc, update: updateFunc }
            );
            projectile.setAngle(event, { x: xStart, y: yStart });
            projectilesArr.push(projectile);
            console.log(projectilesArr);
        }, 200);
    }
});

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let projectile of projectilesArr) {
        projectile.update();
    }
    for (let enemy of enemiesArr) {
        enemy.update();
    }
    player.draw();
}

animate();
