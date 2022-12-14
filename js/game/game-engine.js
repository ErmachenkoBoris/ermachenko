import { Player } from "./classes/Player.js";
import { Projectile } from "./classes/Projectile.js";
import { Enemy } from "./classes/Enemy.js";
import { CollisionHepler } from "./classes/CollisionHelper.js";
import drowFunc from "./functions/drawsFunctions/commonPlayerDrows.js";
import updateFunc from "./functions/updateFunctions/commonUpdate.js";
import createAreas from "./utils/createAreas.js";
import checkIfInsideBodrdersAndCorrectPosition from "./functions/collisionBordersHandler/collisionBordersHandler.js";
import { CollisionBulletHepler } from "./classes/CollisionBulletHelper.js";
import { GameObjectHandler } from "./classes/GameObjectsHandler.js";
import { isMobileOrTabler } from "./utils/getDeviceType.js";
import { DesktopSettings } from "./classes/DesktopSettings.js";
import { MobileSettings } from "./classes/MobileSettings.js";
import typeTextAnimation from "./utils/typeTextAnimation.js";
import WELCOME_TEXT from "./consts/welcome-text.js";

let isMobileOrTablerValue = isMobileOrTabler();
let projectSettings;
if (isMobileOrTablerValue) {
  projectSettings = new MobileSettings();
} else {
  projectSettings = new DesktopSettings();
}
const gameObjectHandler = new GameObjectHandler(projectSettings);

const MAX_PROJECTILE_LENGTH = 50;
const CLEAR_PROJECTILE_TIMER = 5000;
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");
const drawFunc = drowFunc;
const xStart = canvas.width / 2;
const yStart = canvas.height / 2;

const player = new Player(
  {
    x: xStart,
    y: yStart,
    radious: gameObjectHandler.getDefaultPlayerSize(),
    ctx: ctx,
    permanent: true,
    image: gameObjectHandler.getImageForPlayer(),
  },
  {
    draw: drawFunc,
    update: updateFunc,
    collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition,
  }
);

// const infoPlayer = new Player(
//   {
//     x: 3 * gameObjectHandler.getDefaultPlayerSize(),
//     y: yStart * 2 - 3 * gameObjectHandler.getDefaultPlayerSize(),
//     radious: 2 * gameObjectHandler.getDefaultPlayerSize(),
//     ctx: ctx,
//     permanent: true,
//     image: "assets/img/my-circle-photo.png",
//   },
//   {
//     draw: drawFunc,
//     update: updateFunc,
//     collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition,
//   }
// );

let projectilesArr = [];
let allMassObjects = [];
const enemiesArr = [];

const collisionHelper = new CollisionHepler();
const collisionBulletHepler = new CollisionBulletHepler();

function spawnEnemies() {
  let itemsLocal = gameObjectHandler.getMenuItems();
  itemsLocal = createAreas(itemsLocal, canvas);
  itemsLocal.forEach((item) => {
    enemiesArr.push(
      new Enemy(
        {
          radious: gameObjectHandler.getSizeForEnemy(),
          color: item.color,
          ctx: ctx,
          velosity: gameObjectHandler.getDefaultEnemyVelocity(),
          itemLink: item,
          speedScore: gameObjectHandler.getSpeedForEnemy(),
        },
        {
          draw: drawFunc,
          update: updateFunc,
          collisionBorderBehavior: checkIfInsideBodrdersAndCorrectPosition,
        }
      )
    );
  });
}

spawnEnemies();

setInterval(() => {
  if (projectilesArr.length > MAX_PROJECTILE_LENGTH) {
    projectilesArr = projectilesArr.slice(
      projectilesArr.length - MAX_PROJECTILE_LENGTH,
      projectilesArr.length
    );
  }
}, CLEAR_PROJECTILE_TIMER);

let imageBackground = new Image();
imageBackground.src = gameObjectHandler.getBackgroundImage();

let pressed = false;

window.addEventListener("keypress", () => {
    activateAnimation()});

const activateButton = document.getElementById("game-info__button");
activateButton.addEventListener("click", () => {
  setTimeout(() => activateAnimation(), 0);
});

const infoButton = document.getElementById("game-info-button");
infoButton.addEventListener("click", () => {
  setTimeout(() => turnOffGame(), 0);
});

const activateAnimation = () => {
  window.addEventListener("mousemove", (event) => {
    player.setRotateImageAngle(event);
  });

  window.addEventListener(gameObjectHandler.getActionType(), (event) => {
    player.setRotateImageAngle(event);
    if (!pressed) {
      pressed = true;
      setTimeout(() => (pressed = false), 300);
      const projectile = new Projectile(
        {
          x: player.x,
          y: player.y,
          radious: gameObjectHandler.getDefaultProjectyleSize(),
          color: gameObjectHandler.getColorForProjectile(),
          ctx: ctx,
          velosity: gameObjectHandler.getDefaultProjectyleVelocity(),
          speedScoreCoeff:
            gameObjectHandler.getDefaultProjectyleSpeedScoreCoeff(),
        },
        { draw: drawFunc, update: updateFunc }
      );
      projectile.setAngle(event, { x: player.x, y: player.y });
      projectilesArr.push(projectile);
    }
  });
  turnOnGame();
  animateLoop();
};

const turnOnGame = () => {
    const infoButton = document.getElementById("game-info-button");
    infoButton.style = "display: block;";

    const infoBlock = document.getElementById("game-info");
    infoBlock.style = "display: none;";
    stoped = false;
}

const turnOffGame = () => {
    const infoButton = document.getElementById("game-info-button");
    infoButton.style = "display: none;";

    const infoBlock = document.getElementById("game-info");
    infoBlock.style = "display: bkock;";
    projectilesArr = [];
    stoped = true;
}

const animateLoop = () => {
  gameObjectHandler.animateBehavior(animateFunctionBody);
};

let stoped = true;

const animateFunctionBody = () => {
    if(stoped) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
  allMassObjects = [...enemiesArr, player];
  requestAnimationFrame(animateLoop);

  if (gameObjectHandler.getBackgroundImage()) {
    ctx.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
  }

//   ctx.fillStyle = gameObjectHandler.getBackgroundColor();
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

  collisionBulletHepler.checkCollisionAndFix(enemiesArr, projectilesArr);

  collisionHelper.checkCollisionAndFix(allMassObjects);

  gameObjectHandler.update(projectilesArr);

  gameObjectHandler.update(enemiesArr);

  gameObjectHandler.update([player]);

  //   gameObjectHandler.update([infoPlayer]);
};

typeTextAnimation("game-info__text", WELCOME_TEXT, () => {
  activateButton.style.display = "inline-block";
});
