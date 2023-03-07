import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import useVictim from '../hooks/useVictim';

export function VictimDropdown() {
  const { setVictimId, people } = useVictim();
  const [victimSearch, setVictimSearch] = useState<string>('');
  const [displayVictimDropdown, setDisplayVictimDropdown] =
    useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const firstVictimRef = useRef<HTMLButtonElement>(null);
  const lastVictimRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (displayVictimDropdown) {
      searchRef?.current?.focus();
    } else {
      setVictimSearch('');
    }
  }, [displayVictimDropdown]);

  const victimSearchLowerCase = victimSearch.toLowerCase();

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
              if (e.key === 'ArrowDown') {
                firstVictimRef?.current?.focus();
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              if (e.key === 'ArrowUp') {
                if (lastVictimRef) {
                  lastVictimRef.current?.focus();
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                firstVictimRef?.current?.focus();
                e.preventDefault();
                e.stopPropagation();
                return;
              }
              if (e.key === 'Enter') {
                firstVictimRef?.current?.click();
                e.stopPropagation();
                e.preventDefault();
              }
            }}
          />
        </Dropdown.Header>
        {people
          .filter((person) =>
            person.name.toLowerCase().startsWith(victimSearchLowerCase),
          )
          .map((person, i, { length }) => {
            const isFirst = i === 0;
            const isLast = i === length - 1;

            return (
              <Dropdown.Item
                key={person.name}
                onClick={() => {
                  setVictimId(person.id);
                }}
                ref={
                  isFirst ? firstVictimRef : (isLast ? lastVictimRef : undefined)
                }
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
