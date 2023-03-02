import Dropdown from 'react-bootstrap/Dropdown';
import useVictim from '../hooks/useVictim';


export function VictimDropdown() {
  const { setVictimId, people } = useVictim();

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="text-bold bg-black"
        variant="secondary"
        id="dropdown-basic"
      >
        VICTIM
      </Dropdown.Toggle>
      <Dropdown.Menu renderOnMount>
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
