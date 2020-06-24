export const withDecay = (toValue, userConfig, callback?) => {
  'worklet';
  if (!_WORKLET) {
    return toValue;
  }
  const config = Object.assign(
    {
      deceleration: 0.998,
    },
    userConfig,
  );
  const VELOCITY_EPS = 5;
  const decay = (animation, now) => {
    const {
      toValue,
      lastTimestamp,
      initialVelocity,
      current,
      velocity,
    } = animation;
    const deltaTime = Math.min(now - lastTimestamp, 64);
    animation.lastTimestamp = now;
    const kv = Math.pow(config.deceleration, deltaTime);
    const kx = (config.deceleration * (1 - kv)) / (1 - config.deceleration);

    const v0 = velocity / 1000;
    const v = v0 * kv * 1000;
    const x = current + v0 * kx;

    animation.current = x;
    animation.velocity = v;

    const toValueIsReached =
      initialVelocity > 0
        ? animation.current >= toValue
        : animation.current <= toValue;
    if (Math.abs(v) < VELOCITY_EPS || toValueIsReached) {
      if (toValueIsReached) animation.current = toValue;
      return true;
    }
  };

  const start = (animation, value, now, previousAnimation) => {
    animation.current = value;
    animation.lastTimestamp = now;
    animation.initialVelocity = config.velocity;
  };

  return {
    animation: decay,
    start,
    toValue,
    velocity: config.velocity || 0,
    current: toValue,
    callback,
  };
};

// export function withDecay(userConfig, callback) {
//   'worklet';
//
//   // TODO: not sure what should I return here
//   // if (!_WORKLET) {
//   //   return toValue;
//   // }
//
//   const config = {
//     deceleration: 0.998,
//   };
//   if (userConfig) {
//     Object.keys(userConfig).forEach(key => (config[key] = userConfig[key]));
//   }
//
//   const VELOCITY_EPS = 5;
//
//   function decay(animation, now) {
//     const {
//       toValue,
//       lastTimestamp,
//       initialVelocity,
//       current,
//       velocity,
//     } = animation;
//
//     const deltaTime = Math.min(now - lastTimestamp, 64);
//     animation.lastTimestamp = now;
//
//     const kv = Math.pow(config.deceleration, deltaTime);
//     const kx = (config.deceleration * (1 - kv)) / (1 - config.deceleration);
//
//     const v0 = velocity / 1000;
//     const v = v0 * kv * 1000;
//     const x = current + v0 * kx;
//
//     animation.current = x;
//     animation.velocity = v;
//
//     let toValueIsReached = null;
//
//     if (Array.isArray(config.clamp)) {
//       if (initialVelocity < 0 && animation.current <= config.clamp[0]) {
//         toValueIsReached = config.clamp[0];
//       } else if (initialVelocity > 0 && animation.current >= config.clamp[1]) {
//         toValueIsReached = config.clamp[1];
//       }
//     }
//
//     if (Math.abs(v) < VELOCITY_EPS || toValueIsReached !== null) {
//       if (toValueIsReached !== null) {
//         console.log(toValueIsReached);
//         animation.current = toValueIsReached;
//       }
//
//       return true;
//     }
//   }
//
//   function start(animation, value, now, previousAnimation) {
//     animation.current = value;
//     animation.lastTimestamp = now;
//     animation.initialVelocity = config.velocity;
//   }
//
//   return {
//     animation: decay,
//     start,
//     velocity: config.velocity || 0,
//     callback,
//   };
// }
