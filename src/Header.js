import React from 'react';
import {AiTwotoneStar, AiOutlineStar} from 'react-icons/ai';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = ({
  dataSource,
  favData,
  victim,
  favorite,
  setFavorite,
  people,
  setVictim,
  setDataSource,
  unsetFavorite
}) => {

  const dateData = {
    now: Date.parse(new Date()),
    startOfTheSemester: Date.parse("2022-02-14")
  }

  const diffWeeks = Math.floor(1 + (dateData.now - dateData.startOfTheSemester) / 1001 / 60 / 60 / 24 / 7);
  const evenOrOdd = ((diffWeeks % 2) === 0) ? "even" : "odd";

  const getStarIcon = (victim, favorite) => {
    return (victim === favorite)
      ? <AiTwotoneStar size={15} className="star" onClick={() => {unsetFavorite()}} />
      : <AiOutlineStar className="star" onClick={() => {setFavorite(victim)}} />;
  }

  const victimBadge = (victim && victim !== "null")
    ? (
      <Badge bg="secondary" className="me-2 bg-black d-flex flex-row align-items-center">
        <h6 className="me-1 my-0">{victim}</h6>
        {getStarIcon(victim, favorite)}
      </Badge>
    )
    : <></>;



  return (
    <article className="d-flex px-4 py-2 nav-main align-items-center justify-content-between">
      <section className="d-flex flex-row align-items-center">
        <h2 className="pointer me-2"
          onClick={() => {
            setDataSource(favData);
            setVictim(favorite);
          }}>FitZvrh</h2>
        <Badge bg="black">{evenOrOdd} week</Badge>
      </section>
      <section className="d-flex flex-row align-items-center">
        {victimBadge}
        <Dropdown>
          <Dropdown.Toggle className="text-bold bg-black" variant="secondary" id="dropdown-basic">
            VICTIM
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {people.map((person, i) => (
              <Dropdown.Item key={i} onClick={() => {
                setDataSource(person.data);
                setVictim(person.name);
              }}>{person.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </section>
    </article>
  )
}

export default Header;
