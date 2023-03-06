import '../styles/PufekFlying.scss';
import { Fireworks, FireworksHandlers } from '@fireworks-js/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import useVictim from '../hooks/useVictim';
import classNames from 'classnames';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const PUFEK_CHANCE = parseFloat(import.meta.env.VITE_PUFEK_CHANCE) || 0.15;

export default function PufekFlying() {
  const { activeVictim } = useVictim();
  const victimId = activeVictim && activeVictim.id;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fireworksRef = useRef<FireworksHandlers>(null);
  const [hasPufekVisited, setHasPufekVisited] = useState(false);
  const [hasPufekReceivedHumanTouch, setHasPufekReceivedHumanTouch] = useState(false);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current ?? undefined);
  }, []);

  // recalculate the chance for pufek only when the victim changes
  useEffect(() => {
    if (Math.random() < PUFEK_CHANCE || !activeVictim)
      return setHasPufekVisited(false);

    console.log(`Pufek has visited ${activeVictim.name} :D`);

    setHasPufekVisited(true);
    setHasPufekReceivedHumanTouch(false);
  }, [victimId]);


  // preserve the same position between re-renders within the same victim
  const x = useMemo(() => getRandomInt(0, 97), [victimId]);
  const y = useMemo(() => getRandomInt(0, 97), [victimId]);
  const width = useMemo(() => getRandomInt(1.2, 2), [victimId]);
  const escapeCoords = useMemo(() => {
    let dx = `${getRandomInt(0, 100)}vw`;
    let dy = `calc(${y < 50 ? 0 : 100}vh ${y < 50 ? '-' : '+'} ${width}rem)`;

    // 50% chance to fleet to the left or right
    if (Math.random() < 0.5) {
      dx = `calc(${x < 50 ? 0 : 100}vw ${x < 50 ? '-' : '+'} ${width}rem)`;
      dy = `${getRandomInt(0, 100)}vh`;
    }

    return `translate3d(${dx}, ${dy}, 0)`;
  }, [victimId]);


  const handleHumanTouch = () => {
    if (hasPufekReceivedHumanTouch || !fireworksRef.current)
      return;

    // TODO: add a chance that pufek will not handle the human touch and explode with the firework
    // NOTE: the disappearance of pufek needs to be timed with the explosion of the firework
    setHasPufekReceivedHumanTouch(true);

    const center = width * 16 / 2;
    const dx = window.innerWidth * (x / 100) + center;
    const dy = window.innerHeight * (y / 100) + center;
    // const x = window.innerWidth * 0.5;
    // const y = window.innerHeight;

    fireworksRef.current.updateOptions({
      boundaries: {
        x: dx,
        y: dy,
        // make sure that the firework's explosion is exactly at the center of pufek
        width: 3 * dx, // fakt nejakej kokot delal tuhle knihovnu
        height: 2 * dy,
      },
      rocketsPoint: {
        min: 50,
        max: 50,
      },
      acceleration: 1.075,
      traceSpeed: 15,
    });

    fireworksRef.current.launch(1);

    // make pufek disappear after a while
    timeoutRef.current = setTimeout(() => {
      setHasPufekVisited(false);
    }, 1000); // sync this with the transition-duration in PufekFlying.scss
  };


  return (
    <>
      {hasPufekVisited &&
        <img src={hasPufekReceivedHumanTouch ? '/pufekFlying.gif' : '/pufekStanding.png'}
             className={classNames('pufek-standing', {
               'is-flying': hasPufekReceivedHumanTouch,
             })}
             draggable={false}
             style={{
               transform: hasPufekReceivedHumanTouch ? escapeCoords : `translate3d(${x}vw, ${y}vh, 0)`,
               width: `${width}rem`,
             }}
             onClick={handleHumanTouch}
        />
      }
      {(hasPufekVisited || hasPufekReceivedHumanTouch) &&
        // fireworks need to stay mounted even after pufek has left
        <Fireworks
          options={{
            autoresize: false,
            acceleration: 1.075,
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
          }}
          autostart={false}
          ref={fireworksRef}
          className='fireworks'
        />
      }
    </>
  );
}