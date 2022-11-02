// TODO REFACTOR

const mobileMenuItems = [
    {
        name: 'Contacts',
        color: '#C31F81',
        style: 'bold 50px Arial',
        image: 'assets/img/game-contacts-mobile.svg'
    },
    {
        name: 'Portfolio',
        color: '#008282',
        style: 'bold 50px Arial',
        image: 'assets/img/game-portfolio-mobile.svg',
        page: 'pages/portfolio/'
    },
    {
        name: 'Blog',
        color: '#FE5233',
        style: 'bold 14px Arial',
        image: 'assets/img/game-blog-mobile.svg',
        page: 'pages/blog/blog.html'
    },
    {
        name: 'CV',
        color: '#CADCFF',
        style: 'bold 10px Arial',
        image: 'assets/img/game-cv-mobile.svg'
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

const MobileSettingsConstValue = {
  imageForPlayer: "assets/img/game-blaster.svg",
  generateSizeForEnemy: () => radiousModes.generateNormal(),
  generateSpeedForEnemy: () => speedModes.generateMiddle(),
  backgroundImage: null,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  colorForProjectile: "white",
  enemyImages: [],
  hendlerType: "pointerdown",
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
  FPS: 240,
  defaultPlayerSize: 20,
  defaultProjectyleSpeedScoreCoeff: 3,
  defaultProjectyleSize: 5,
};

export class MobileSettings {
  getImageForPlayer() {
    return MobileSettingsConstValue.imageForPlayer;
  }

  getSizeForEnemy() {
    return MobileSettingsConstValue.generateSizeForEnemy();
  }

  getSpeedForEnemy() {
    return MobileSettingsConstValue.generateSpeedForEnemy();
  }

  getBackgroundImage() {
    return MobileSettingsConstValue.backgroundImage;
  }

  getBackgroundColor() {
    return MobileSettingsConstValue.backgroundColor;
  }

  getColorForProjectile() {
    return MobileSettingsConstValue.colorForProjectile;
  }

  getDefaultPlayerVelocity() {
    return {...MobileSettingsConstValue.defaultPlayerVelocity};
  }

  getDefaultEnemyVelocity() {
    return {...MobileSettingsConstValue.defaultEnemyVelocity};
  }

  getActionType() {
    return MobileSettingsConstValue.hendlerType;
  }

  getDefaultProjectyleVelocity() {
    return {...MobileSettingsConstValue.defaultProjectyleVelocity};
  }

  getDefaultProjectyleSpeedScoreCoeff() {
    return MobileSettingsConstValue.defaultProjectyleSpeedScoreCoeff;
  }

  getDefaultProjectyleSize() {
    return MobileSettingsConstValue.defaultProjectyleSize;
  }

  getDefaultPlayerSize() {
    return MobileSettingsConstValue.defaultPlayerSize;
  }

  getMenuItems() {
    return mobileMenuItems;
  }

  animateBehavior(animate) {
    animate();
  }
}
