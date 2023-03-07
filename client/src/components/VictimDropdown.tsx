import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import useVictim from '../hooks/useVictim';

export function VictimDropdown() {
  const { setVictimId, people } = useVictim();
  const [victimSearch, setVictimSearch] = useState<string>('');
  const [displayVictimDropdown, setDisplayVictimDropdown] =
    useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const firstVictimRef = useRef<HTMLButtonElement>(
    null,
  ) as MutableRefObject<HTMLButtonElement>;
  const lastVictimRef = useRef<HTMLButtonElement>(
    null,
  ) as MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    if (displayVictimDropdown) {
      searchRef?.current?.focus();
    } else {
      setVictimSearch('');
    }
  }, [displayVictimDropdown]);

  const victimSearchLowerCase = victimSearch.toLowerCase();

  const filteredVictims = useMemo(
    () =>
      people.filter((victim) =>
        victim.name.toLowerCase().startsWith(victimSearchLowerCase),
      ),
    [victimSearch, people],
  );

  return (
    <Dropdown
      focusFirstItemOnShow={false}
      onToggle={(show) => {
        setDisplayVictimDropdown(show);
      }}
      show={displayVictimDropdown}
    >
      <Dropdown.Toggle
        className="text-bold bg-black"
        variant="secondary"
        id="dropdown-basic"
      >
        VICTIM
      </Dropdown.Toggle>
      <Dropdown.Menu
        renderOnMount
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <Dropdown.Header>
          <input
            ref={searchRef}
            value={victimSearch}
            onChange={(e) => {
              setVictimSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case 'ArrowUp':
                  lastVictimRef?.current?.focus();
                  break;
                case 'ArrowDown':
                  firstVictimRef?.current?.focus();
                  break;
                case 'Enter':
                  firstVictimRef?.current?.click();
                  break;
                default:
                  // Do nothing
                  return;
              }

              e.preventDefault();
              e.stopPropagation();
            }}
          />
        </Dropdown.Header>
        {filteredVictims.map((person, i, { length }) => {
          const isFirst = i === 0;
          const isLast = i === length - 1;

          return (
            <Dropdown.Item
              key={person.name}
              onClick={() => {
                setVictimId(person.id);
              }}
              ref={(el: HTMLButtonElement) => {
                if (isFirst) firstVictimRef.current = el;
                if (isLast) lastVictimRef.current = el;
              }}
              onKeyDown={(e) => {
                if (isFirst && e.key === 'ArrowUp') {
                  searchRef.current?.focus();
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (isLast && e.key === 'ArrowDown') {
                  firstVictimRef?.current?.focus();
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              {person.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
