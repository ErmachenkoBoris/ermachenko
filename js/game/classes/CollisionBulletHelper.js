export class CollisionBulletHepler {
  fixCollision(enemy, enemies, projectile, enemyIndex, projectileIndex) {
    projectile.splice(projectileIndex, 1);
    enemy.damaged();
    if (enemy.health <= 0) {
        console.log('window.location.href', window.location.href);
      window.location.href =`${window.location.href}${enemy.page}`;
      enemies.splice(enemyIndex, 1);
    }
  }

  checkCollisionAndFix(enemies, projectiles) {
    enemies.forEach((enemy, enemyIndex) => {
      projectiles.forEach((projectile, projectileIndex) => {
        this.checkCollision(
          enemies,
          projectiles,
          enemy,
          enemyIndex,
          projectile,
          projectileIndex
        );
      });
    });
  }

  checkCollision(
    enemies,
    projectiles,
    enemy,
    enemyIndex,
    projectile,
    projectileIndex
  ) {
    const dist = Math.hypot(enemy.x - projectile.x, enemy.y - projectile.y);
    if (dist <= enemy.radious + projectile.radious) {
      this.fixCollision(
        enemy,
        enemies,
        projectiles,
        enemyIndex,
        projectileIndex
      );
    }
  }
}
