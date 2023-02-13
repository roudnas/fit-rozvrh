import Dropdown from 'react-bootstrap/Dropdown';

import { PersonData } from '../utils/dbQueries';

type Props = {
  people: PersonData[];
  setVictimId: (newVictimId: string | null) => void;
};

export function VictimDropdown({ people, setVictimId }: Props) {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-bold bg-black"
        variant="secondary"
        id="dropdown-basic"
      >
        VICTIM
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {people.map((person, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              setVictimId(person.id);
            }}
          >
            {person.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
