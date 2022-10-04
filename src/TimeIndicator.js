import { APP_PADDING_X } from './App';
import { TIME_OFFSET_PX } from './Class';

export function TimeIndicator({ dims }) {
    const currentTime = new Date();
    const sT = currentTime.getHours() + currentTime.getMinutes() / 60;

    if (sT < 7.1 || sT > 20.7)
        return null;

    if (dims.width < 1200) dims.width = 1200;

    const fullW = (dims.width - APP_PADDING_X * 2) / 14;
    const marL = (sT - 7) * fullW + TIME_OFFSET_PX;

    return (
        <div className='time-indicator' style={{ marginLeft: marL }}>
            <div className='time-indicator-pin' />
        </div>
    )
}
