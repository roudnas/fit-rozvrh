import "./App.css";
import {useState, useEffect} from "react";
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore/lite';
import Wrapper from "./Wrapper";
import Header from "./Header";

function App({_db}) {
  const nullArr = [[], [], [], [], []];
  const [db, setDb] = useState(_db);
  const [people, setPeople] = useState([]);
  const [favorite, setFavorite] = useState(localStorage.getItem("favorite"));
  const [victim, setVictim] = useState(localStorage.getItem("favorite"));
  const [dataSource, setDataSource] = useState(nullArr);
  const [favData, setFavData] = useState();

  useEffect(() => {
    updatePeople();
  }, [])

  useEffect(() => {
    localStorage.setItem("favorite", favorite);  
    console.log(favData, dataSource);
  }, [favorite])

  const updatePeople = async () => {
    const peopleRef = doc(db, "users", "SF");
    const peopleCollection = collection(db, 'users');
    const peopleDocs = await getDocs(peopleCollection);
    setPeople([]);
    
    peopleDocs.forEach((person) => {
      person = person.data();
      people.push({
        "name": person.name,
        "data": require(`./data/${person.data}.json`)
      });
    });
    
    setPeople(people);

    const favPerson = localStorage.getItem("favorite");
    const perObj = people.find((per) => per.name === favPerson);
    setDataSource(perObj.data);
  }
 
  const unsetFavorite = () => {
    setFavorite(null);
  }

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
