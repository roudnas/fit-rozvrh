import Badge from 'react-bootstrap/Badge';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import useVictim from '../hooks/useVictim';


export function VictimBadge() {
    const { activeVictim, favoriteId, setFavoriteId } = useVictim();

    if (!activeVictim) return null;

    return (
        <Badge
            bg="secondary"
            className="bg-black d-flex flex-row align-items-center"
        >
            <h6 className="me-1 my-0">{activeVictim.name}</h6>
            {activeVictim.id === favoriteId ? (
                <AiFillStar
                    size={18}
                    className="star"
                    onClick={() => {
                        setFavoriteId(null);
                    }}
                />
            ) : (
                <AiOutlineStar
                    size={14}
                    className="star"
                    onClick={() => {
                        setFavoriteId(activeVictim.id);
                    }}
                />
            )}
        </Badge>
    );
}
