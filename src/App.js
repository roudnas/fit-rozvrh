import "./App.css";
import {useState, useEffect} from "react";
import Wrapper from "./Wrapper";
import Header from "./Header";
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import DomData from "./data/dominik.json";
import PokNicData from "./data/pokynicolas.json";
import MatData from "./data/matej.json";
import SarkData from "./data/sarka.json";
import JachData from "./data/jachym.json";
import ZdenData from "./data/zdeny.json";


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
      name: "Nicolas",
      data: PokNicData
    },
    {
      name: "Poky",
      data: PokNicData
    },
    {
      name: "Matej",
      data: MatData
    },
    {
      name: "Majda",
      data: MatData
    },
    {
      name: "Sarka",
      data: SarkData
    },
    {
      name: "Zdenek",
      data: ZdenData
    },
    {
      name: "Jachym",
      data: JachData
    }
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
      <Header
        dataSource={dataSource}
        favData={favData}
        victim={victim}
        favorite={favorite}
        setFavorite={setFavorite}
        people={people}
        setVictim={setVictim}
        setDataSource={setDataSource}
        unsetFavorite={unsetFavorite}
      />
      <Wrapper dataSource={dataSource} data={people} />
    </div>
  );
}

export default App;
