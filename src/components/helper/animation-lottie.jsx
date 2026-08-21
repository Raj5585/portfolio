import React, { Suspense, lazy, useEffect, useState } from 'react';

// lottie-web is ~250KB and each animation JSON is 100-400KB;
// load both off the critical path so they don't bloat the main bundle.
const Lottie = lazy(() => import('lottie-react'));

const AnimationLottie = ({ load }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    load().then((mod) => {
      if (!cancelled) setAnimationData(mod.default ?? mod);
    });
    return () => {
      cancelled = true;
    };
  }, [load]);

  if (!animationData) {
    return <div style={{ width: '95%' }} />;
  }

  return (
    <Suspense fallback={<div style={{ width: '95%' }} />}>
      <Lottie
        loop
        autoplay
        animationData={animationData}
        style={{ width: '95%' }}
      />
    </Suspense>
  );
};

export default AnimationLottie;
