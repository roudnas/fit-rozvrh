import useVictim from '../hooks/useVictim';
import { PersonInfo } from '../services/DataService';
import { HiOutlineExternalLink } from "react-icons/all";

type Props = {
  /** Used for correct positioning on lesson hover. */
  index: number;
  intersection: PersonInfo;
};

const TRANSFORM_OFFSET = 1.75;

export const LessonIntersection = ({ index, intersection }: Props) => {
  const { setVictimId } = useVictim();

  return (
    <div
      className="lesson-intersection"
      style={{
        transform: `translate3d(0, ${index * -TRANSFORM_OFFSET}rem, 0)`,
      }}
      onClick={() => setVictimId(intersection.id)}
      title={`Show ${intersection.name}'s timetable.`}
    >
      <h6 className="m-0">{intersection.name} <HiOutlineExternalLink/></h6>
    </div>
  );
};
