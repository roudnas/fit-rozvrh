import { PersonInfo } from '../utils/dbQueries';

type Props = {
  /** Used for correct positioning on lesson hover. */
  index: number;
  intersection: PersonInfo;
  setVictimId: (newVictimId: string | null) => void;
}

const TRANSFORM_OFFSET = 1.75;

export const LessonIntersection = ({ index, intersection, setVictimId }: Props) => {
  return (
    <div className="lesson-intersection"
      style={{
        transform: `translate3d(0, ${index * -TRANSFORM_OFFSET}rem, 0)`
      }}
       onClick={() => setVictimId(intersection.id)}
         title={`Show ${intersection.name}'s timetable.`}
    >
      <h6 className="m-0">{intersection.name}</h6>
    </div>
  )
}