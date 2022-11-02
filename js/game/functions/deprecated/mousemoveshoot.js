// window.addEventListener(gameObjectHandler.getActionType(), (event) => {
//   player.setRotateImageAngle(event);
//   if (timeOutId) {
//     clearTimeout(timeOutId);
//   }
//   const updateProjectileAndPlayer = () => {
//     const projectile = new Projectile(
//       {
//         x: player.x,
//         y: player.y,
//         radious: gameObjectHandler.getDefaultProjectyleSize(),
//         color: gameObjectHandler.getColorForProjectile(),
//         ctx: ctx,
//         velosity: gameObjectHandler.getDefaultProjectyleVelocity(),
//         speedScoreCoeff:
//           gameObjectHandler.getDefaultProjectyleSpeedScoreCoeff(),
//       },
//       { draw: drawFunc, update: updateFunc }
//     );
//     projectile.setAngle(event, { x: player.x, y: player.y });
//     projectilesArr.push(projectile);
//     clearTimeout(timeOutId);
//     if (!isMobileOrTablerValue) {
//       timeOutId = setTimeout(updateProjectileAndPlayer, 600);
//     }
//   };
//   timeOutId = setTimeout(updateProjectileAndPlayer, 100);
// });