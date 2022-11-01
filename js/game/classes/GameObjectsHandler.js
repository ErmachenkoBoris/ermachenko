export class GameObjectHandler {
  constructor(deviceType) {
    this.deviceType = deviceType;
  }

  update(gameObjects) {
    for (let gameObject of gameObjects) {
      gameObject.update();
    }
  }

  getImageForPlayer() {
    return this.deviceType.getImageForPlayer();
  }

  getSizeForEnemy() {
    return this.deviceType.getSizeForEnemy();
  }

  getSpeedForEnemy() {
    return this.deviceType.getSpeedForEnemy();
  }

  getBackgroundImage() {
    return this.deviceType.getBackgroundImage();
  }

  getColorForProjectile() {
    return this.deviceType.getColorForProjectile();
  }

  getBackgroundColor() {
    return this.deviceType.getBackgroundColor();
  }

  getDefaultPlayerVelocity() {
    return this.deviceType.getDefaultPlayerVelocity();
  }

  getDefaultProjectyleVelocity() {
    return this.deviceType.getDefaultProjectyleVelocity();
  }

  getActionType() {
    return this.deviceType.getActionType();
  }

  getDefaultProjectyleSpeedScoreCoeff(animate) {
    return this.deviceType.getDefaultProjectyleSpeedScoreCoeff(animate);
  }

  getDefaultProjectyleSize() {
    return this.deviceType.getDefaultProjectyleSize();
  }

  getDefaultPlayerSize() {
    return this.deviceType.getDefaultPlayerSize();
  }

  getMenuItems() {
    return this.deviceType.getMenuItems();
  }

  getDefaultEnemyVelocity() {
    return this.deviceType.getDefaultEnemyVelocity();
  }

  animateBehavior(animate) {
    this.deviceType.animateBehavior(animate);
  }
}
