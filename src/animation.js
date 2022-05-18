function handle(delta) {
  let animationInterval = 20; //controls the scroll animation after scroll is done
  let scrollSpeed = 20; //controls the scroll animation after scroll is done

  if (end == null) {
    end = body.scrollTop;
  }
  end -= 20 * delta;
  goUp = delta > 0;

  if (interval == null) {
    interval = setInterval(function () {
      let scrollTop = body.scrollTop;
      let step = Math.round((end - scrollTop) / scrollSpeed);
      if (
        scrollTop <= 0 ||
        scrollTop >= body.scrollHeight - body.height ||
        (goUp && step > -1) ||
        (!goUp && step < 1)
      ) {
        clearInterval(interval);
        interval = null;
        end = null;
      }
      body.scrollTop = scrollTop + step;
    }, animationInterval);
  }
}

window.addEventListener(
  "scroll",
  (e) => {
    if (!isLoadedModel) e.preventDefault();
  },
  { passive: false }
);

//line animation
const line = document.querySelector(".line-progress");
function lineAnimation(progress) {
  line.style.width = `${progress * 60}px`;
}
// animation section 1
function rotateGlobeAni(progress) {
  if (!models.globle || !models.redCircle) {
    return;
  }
  models.globle.scale.set(1, 1, 1);
  models.globle.rotation.y = 1.67 + progress * (globleRoateEnd - 1.67);
  models.globle.material.opacity = 1 - 0.6 * progress;
  models.globle.position.z = 0.36 * progress;

  models.redCircle.scale.set(1, 1, 0.1);
  models.redCircle.position.z = 1.58 + (2.2 - 1.58) * progress;
  models.redCircle.material.opacity = 1 - 0.3 * progress;
}

function logoAnimation(progress) {
  if (!models.logo && !models.redCircle && !models.globle) return;
  models.logo.position.z = 2.7 * progress;
  models.logo.scale.set(0.25 * progress, 0.25 * progress, 0.25 * progress);

  if (models.redCircle.position.z >= 2.2 && models.globle.position.z >= 0.46) {
    models.globle.position.z = 0.36 + 0.5 * progress;
    models.redCircle.position.z = 2.2 + 0.8 * progress;
  }
  models.redCircle.material.opacity = 0.7 - 0.2 * progress;
}
function kyrosAnimation(progress) {
  if (!kyrosElem) return;
  if (progress <= 0.01) {
    kyrosElem.style.opacity = 0;
    return;
  }
  kyrosElem.style.opacity = 0.5 + progress * 0.5;
  kyrosElem.style.filter = `blur(${80 * progress}px)`;
}
// animation next scene section 1
function nextScene1(progress) {
  /*  models.redCircle.position.z = 2.3 + 0.7 * progress;
    models.globle.position.z = 0.7 + 0.4 * progress; */
}

function nextScene2(progress) {
  if (!models.logo || !models.globle) return;

  models.globle.opacity = 0;
  if (progress > 0.3333333) {
    models.globle.scale.set(0, 0, 0);
  } else {
    models.globle.scale.set(
      1 - 3 * progress,
      1 - 3 * progress,
      1 - 3 * progress
    );
  }
  models.logo.position.z = 2.7 + 2.5 * progress;
  models.logo.position.y = 0.05 * progress;
  models.logo.scale.set(
    0.25 - 0.25 * progress,
    0.25 - 0.25 * progress,
    0.25 - 0.25 * progress
  );

  kyrosElem.style.opacity = 2 - 2 * progress;
}
// animation section 2
function cubesAnimation(progress) {
  if (!models.cubes.length) return;

  models.cubes.forEach((cube, index) => {
    if (progress >= initCubesTime[index]) {
      cube.scale.set(
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index]),
        (1 / (1 - initCubesTime[index])) * (progress - initCubesTime[index])
      );
      cube.position.z = initCubesPos[index].z + 4 * progress;
    }
  });
}

function nurtureAnimation(progress) {
  if (!nurtureElem) return;
  nurtureElem.style.opacity = progress;
}

// animation next scene 2

function nextScene3(progress) {
  if (!nurtureElem && !models.cubes.length) return;

  nurtureElem.style.opacity = 1 - progress;

  models.cubes.forEach((cube, index) => {
    cube.position.z = initCubesPos[index].z + 4 + 24 * progress;
  });

  if (progress === 1) {
    models.cubes.forEach((cube) => {
      cube.scale.set(0, 0, 0);
    });
  }
}

//animation scene 3
let keyInterval;
let ampX = 0;
let ampY = 0;
let rotateBounceX = 0.01;
let rotateBounceY = 0.01;

function keyAnimation(progress) {
  if (!models.key) return;

  models.key.scale.set(
    Math.pow(progress, 4),
    Math.pow(progress, 4),
    Math.pow(progress, 4)
  );
  models.key.position.x = -12 + 10.6 * progress;
  if (progress < 0.7) {
    models.key.position.x = -2.3 - 2 * progress;
  } else {
    models.key.position.x = -3.7 + 6.6667 * (progress - 0.7);
  }
  models.key.position.y = 2.2 - 1.9 * progress;
  models.key.position.z = 2.7 * Math.pow(progress, 3);
  if (progress < 1) {
  }

  if (progress < 1 && keyInterval) {
    clearInterval(keyInterval);
    keyInterval = undefined;
  }

  if (progress === 1) {
    if (keyInterval) {
      return;
    }
    keyInterval = setInterval(() => {
      models.key.rotation.x = 0.48 + ampX;

      models.key.rotation.y = -0.78 + ampY;

      ampX += rotateBounceX;
      ampY += rotateBounceY;

      if (ampX >= 0.02) {
        rotateBounceX = -0.001;
      } else if (ampX <= -0.02) {
        rotateBounceX = 0.001;
      }

      if (ampY >= 0.02) {
        rotateBounceY = -0.001;
      } else if (ampY <= -0.02) {
        rotateBounceY = 0.001;
      }
    }, 50);
  }
}

function incubateAnimation(progress) {
  if (!incubateElem) return;
  incubateElem.style.opacity = progress;
}
