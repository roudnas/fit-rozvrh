import "./App.css";
import {useState, useEffect} from "react";
import Wrapper from "./Wrapper";
import Dropdown from 'react-bootstrap/Dropdown';
import DomData from "./dominik.json";
import PokNicData from "./pokynicolas.json";

function App() {
  const [dataSource, setDataSource] = useState([[],[],[],[],[]]);
  const nullArr = [[],[],[],[],[]]
  const [victim, setVictim] = useState("");
  return (
    <div className="App bg-dark px-5 text-light text-center">
      <section className="d-flex px-5 flex-row align-items-center justify-content-between">
        <h2 className="pointer" onClick={() => {
          setDataSource(nullArr);
          setVictim("");
        }}>FitZvrh {victim}</h2>
      <Dropdown>
        <Dropdown.Toggle className="text-bold" variant="success" id="dropdown-basic">
          VICTIM 
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => {
            setDataSource(DomData); 
            setVictim("| Dominik");
          }}>Dominik</Dropdown.Item>
          <Dropdown.Item onClick={() => {
            setDataSource(PokNicData); 
            setVictim("| Nicolas/Poky");
          }}>Nicolas / Poky</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 
      </section>
      <Wrapper dataSource={dataSource}/>
    </div>
  );
}

export default App;
