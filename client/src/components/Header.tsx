import Badge from 'react-bootstrap/Badge';

import {Logo} from "./Logo";
import { SEMESTER_START_DATE } from '../App';
import useVictim from '../hooks/useVictim';
import { getEvenOddWeek, getSemesterWeekNo } from '../utils/date';
import { ThemeDropdown } from './ThemeDropdown';
import { VictimBadge } from './VictimBadge';
import { VictimDropdown } from './VictimDropdown';

export const PHRASES = ['with friends', 'with your mum', 'you dont have friends', 'with Pufek Stojící'];

export const Header = () => {
    const { setVictimId, favoriteId } = useVictim();
    const currentWeekSemesterNo = getSemesterWeekNo(SEMESTER_START_DATE);
    const currentWeekEvenOrOdd = getEvenOddWeek();
    const phrase = PHRASES[Math.round(Math.random() * 100) % PHRASES.length];
  
    return (
        <article className="d-flex px-4 py-2 bg-second text-dark rounded nav-main align-items-center justify-content-between">
            <section className="d-flex flex-row align-items-center">
                <div
                    className={`d-flex flex-column align-items-center me-2 ${favoriteId !== null ? 'pointer' : ''}`}
                    onClick={() => {
                        favoriteId && setVictimId(favoriteId);
                    }}>
                    <Logo />
                    <Badge className='bg-note' bg='note' >
                        {phrase}
                    </Badge>
                </div>
                <Badge className='bg-header-text' bg='note'>
                    {currentWeekEvenOrOdd} week (no. {currentWeekSemesterNo})
                </Badge>
            </section>
            <section className="d-flex flex-row align-items-center gap-2">
                <VictimBadge />
                <VictimDropdown />
                <ThemeDropdown />
            </section>
        </article>
    );
};
