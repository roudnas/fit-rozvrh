import Badge from 'react-bootstrap/Badge';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { PersonData } from '../utils/dbQueries';

type Props = {
  victim: PersonData | null;
  favoriteId: string | null;
  setFavoriteId: (newFavoriteId: string | null) => void;
};

export function VictimBadge({ victim, favoriteId, setFavoriteId }: Props) {
  if (victim === null) return null;

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
