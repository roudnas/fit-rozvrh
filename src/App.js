import "./App.css";
import {useState, useEffect} from "react";
import Wrapper from "./Wrapper";
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import DomData from "./dominik.json";
import PokNicData from "./pokynicolas.json";
import MatData from "./matej.json";
import SarkData from "./sarka.json";
import {AiTwotoneStar, AiOutlineStar} from 'react-icons/ai';

function App() {
  const [favorite, setFavorite] = useState(localStorage.getItem("favorite"));
  const [victim, setVictim] = useState(localStorage.getItem("favorite"));
  const nullArr = [[], [], [], [], []];
  const people = [
    {
      name: "Dominik",
      data: DomData
    },
    {
      name: "Nicolas/Poky",
      data: PokNicData
    },
    {
      name: "Matej",
      data: MatData
    },
    {
      name: "Sarka",
      data: SarkData
    },
  ];

  let favData = people.find((per) => per.name === favorite);
  if (!favData)
    favData = nullArr;
  else
    favData = favData.data;
  const [dataSource, setDataSource] = useState(favData);

  const unsetFavorite = () => {
    setFavorite(null);
  }

  useEffect(() => {
    localStorage.setItem("favorite", favorite);
  }, [favorite])

  return (
    <div className="App bg-dark py-2 px-2 text-light text-center">
      <section className="d-flex px-4 py-2 nav-main align-items-center justify-content-between">
        <h2 className="pointer"
          onClick={() => {
            setDataSource(favData);
            setVictim(favorite);
          }}>FitZvrh</h2>
        <section className="d-flex flex-row align-items-center">
          <Dropdown>
            <Dropdown.Toggle className="text-bold" variant="success" id="dropdown-basic">
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
          {victim && victim !== "null" ? (
            <>
              <Badge bg="secondary" className="ms-2 d-flex flex-row align-items-center"><h6 className="m-0">{victim}</h6>
                {favorite === victim ? (
                  <AiTwotoneStar size={15} className="star" onClick={() => {
                    unsetFavorite()
                  }} />
                ) : (
                  <AiOutlineStar className="star" onClick={() => {
                    setFavorite(victim)
                  }} />
                )}
              </Badge>
            </>
          ) : <></>}

        </section>

      </section>
      <Wrapper dataSource={dataSource} />
    </div>
  );
}

export default App;
