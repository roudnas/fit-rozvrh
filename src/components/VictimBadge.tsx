import Badge from 'react-bootstrap/Badge';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { PersonData } from '../utils/dbQueries';
import useVictim from '../hooks/useVictim';

export function VictimBadge() {
  const { victim, favoriteId, setFavoriteId } = useVictim();

  if (!victim) return null;

  return (
    <Badge
      bg="secondary"
      className="bg-black d-flex flex-row align-items-center"
    >
      <h6 className="me-1 my-0">{victim.name}</h6>
      {victim.id === favoriteId ? (
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
            setFavoriteId(victim.id);
          }}
        />
      )}
    </Badge>
  );
}
