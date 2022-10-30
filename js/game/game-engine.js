import { Player } from "./classes/Player.js";
import { Projectile } from "./classes/Projectile.js";
import { Enemy } from "./classes/Enemy.js";
import { CollisionHepler } from "./classes/CollisionHelper.js";
import drowFunc from "./functions/drawsFunctions/commonPlayerDrows.js";
import updateFunc from "./functions/updateFunctions/commonUpdate.js";
import menuItems from "./consts/menuItems.js";
import createAreas from "./utils/createAreas.js";
import getRandomInt from "./utils/getRandomInt.js";
import checkIfInsideBodrdersAndCorrectPosition from "./functions/collisionBordersHandler/collisionBordersHandler.js"
import speedModes from "./consts/speedMods.js"
import radiousModes from "./consts/radiousSizeMode.js"

const FPS = 120;
const MAX_PROJECTILE_LENGTH = 50;
const CLEAR_PROJECTILE_TIMER = 5000;
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");
const drawFunc = drowFunc;
const xStart = canvas.width / 2;
const yStart = canvas.height / 2;
let projectilesArr = [];
const enemiesArr = [];
const player = new Player(
    { x: xStart, y: yStart, radious: 30, color: "blue", ctx: ctx, permanent: true, },
    { draw: drawFunc, update: updateFunc, collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition }
);

const collisionHelper = new CollisionHepler();
let allMassObjects = [];

function spawnEnemies() {
    let itemsLocal = menuItems;
    itemsLocal = createAreas(menuItems, canvas);
    itemsLocal.forEach(item => {
        enemiesArr.push(
            new Enemy(
                {
                    x: xStart,
                    y: yStart,
                    radious: radiousModes.generateBig(),
                    color: item.color,
                    ctx: ctx,
                    velosity: {
                        x: 1,
                        y: 1,
                    },
                    itemLink: item,
                    speedScore: speedModes.generateSuperFast(),
                },
                { draw: drawFunc, update: updateFunc, collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition }
            )
        )
    });
}

spawnEnemies();
allMassObjects = [...enemiesArr, player];

setInterval(() => {
    if(projectilesArr.length > MAX_PROJECTILE_LENGTH) {
        projectilesArr = projectilesArr.slice(projectilesArr.length-MAX_PROJECTILE_LENGTH, projectilesArr.length);
    }
}, CLEAR_PROJECTILE_TIMER);

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
                    x: player.x,
                    y: player.y,
                    radious: 5,
                    color: "red",
                    ctx: ctx,
                    velosity: {
                        x: 1,
                        y: 1,
                    },
                    speedScore: 3
                },
                { draw: drawFunc, update: updateFunc }
            );
            projectile.setAngle(event, { x: player.x, y: player.y });
            projectilesArr.push(projectile);
        }, 200);
    }
});


function animate() {
    setTimeout(() => {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i<allMassObjects.length-1; i++) {
            for(let j = i+1; j<allMassObjects.length; j++) {
                collisionHelper.checkCollision(allMassObjects[i], allMassObjects[j]);
            } 
        }
        for (let projectile of projectilesArr) {
            projectile.update();
        }
        for (let enemy of enemiesArr) {
            enemy.update();
        }
        player.update();
    }, 1000 / FPS);


}

animate();
