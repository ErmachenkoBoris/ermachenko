// TODO REFACTOR

const desktopMenuItems = [
    {
        name: 'Contacts',
        color: 'gray',
        style: 'bold 50px Arial',
        image: 'assets/img/game-contacts.svg'
    },
    {
        name: 'Portfolio',
        color: 'green',
        style: 'bold 50px Arial',
        image: 'assets/img/game-portfolio.svg'
    },
    {
        name: 'Blog',
        color: 'orange',
        style: 'bold 14px Arial',
        image: 'assets/img/game-blog.svg'
    },
    {
        name: 'CV',
        color: 'blue',
        style: 'bold 10px Arial',
        image: 'assets/img/game-cv.svg'
    },
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const radiousModes = {
  generateSmall: () => {
    return getRandomInt(20, 40);
  },
  generateNormal: () => {
    return getRandomInt(40, 60);
  },
  generateBig: () => {
    return getRandomInt(60, 80);
  },
};

const speedModes = {
  generateSlow: () => {
    return getRandomInt(1, 11) / 10;
  },
  generateMiddle: () => {
    return getRandomInt(10, 12) / 10;
  },
  generateFast: () => {
    return getRandomInt(20, 40) / 10;
  },
  generateSuperFast: () => {
    return getRandomInt(40, 80) / 10;
  },
};

const DesktopSettingsConstValue = {
  imageForPlayer: "assets/img/game-blaster.svg",
  generateSizeForEnemy: () => radiousModes.generateBig(),
  generateSpeedForEnemy: () => speedModes.generateMiddle(),
  backgroundImage: "assets/img/space-background1.jpg",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  colorForProjectile: "white",
  enemyImages: [],
  hendlerType: "mousemove",
  defaultPlayerVelocity: {
    x: 1,
    y: 1,
  },
  defaultProjectyleVelocity: {
    x: 1,
    y: 1,
  },
  defaultEnemyVelocity: {
    x: 1,
    y: 1,
  },
  FPS: 120,
  defaultPlayerSize: 30,
  defaultProjectyleSpeedScoreCoeff: 3,
  defaultProjectyleSize: 5,
};

export class DesktopSettings {
  getImageForPlayer() {
    return DesktopSettingsConstValue.imageForPlayer;
  }

  getSizeForEnemy() {
    return DesktopSettingsConstValue.generateSizeForEnemy();
  }

  getSpeedForEnemy() {
    return DesktopSettingsConstValue.generateSpeedForEnemy();
  }

  getBackgroundImage() {
    return DesktopSettingsConstValue.backgroundImage;
  }

  getBackgroundColor() {
    return DesktopSettingsConstValue.backgroundColor;
  }

  getColorForProjectile() {
    return DesktopSettingsConstValue.colorForProjectile;
  }

  getDefaultPlayerVelocity() {
    return {...DesktopSettingsConstValue.defaultPlayerVelocity};
  }

  getDefaultEnemyVelocity() {
    return {...DesktopSettingsConstValue.defaultEnemyVelocity};
  }

  getActionType() {
    return DesktopSettingsConstValue.hendlerType;
  }

  getDefaultProjectyleVelocity() {
    return {...DesktopSettingsConstValue.defaultProjectyleVelocity};
  }

  getDefaultProjectyleSpeedScoreCoeff() {
    return DesktopSettingsConstValue.defaultProjectyleSpeedScoreCoeff;
  }

  getDefaultProjectyleSize() {
    return DesktopSettingsConstValue.defaultProjectyleSize;
  }

  getDefaultPlayerSize() {
    return DesktopSettingsConstValue.defaultPlayerSize;
  }

  getMenuItems() {
    return desktopMenuItems;
  }

  animateBehavior(animate) {
    setTimeout(() => {
      animate();
    }, 1000 / DesktopSettingsConstValue.FPS);
  }
}