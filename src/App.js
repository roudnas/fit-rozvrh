import "./App.css";
import {useState, useEffect} from "react";
import { getFirestore, collection, getDocs, getDoc, doc, where, addDoc, query } from 'firebase/firestore/lite';
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
  const [loading, setLoading] = useState(true);

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
    
    for (const per of peopleDocs.docs) {
      const pid = per.id;
      const person = per.data();
      const pData = [[],[],[],[],[]];

      const q = query(
        collection(db, 'classes'), 
        where(
          'user', 
          '==', 
          pid
        )
      );
      const qs = await getDocs(q);

      qs.forEach((q) => {
        q = q.data();
        pData[q.day][q.order] = q; 
      })

      await people.push({
        "id": pid,
        "name": person.name,
        "data": pData 
      });
    }

    setPeople(people);
    setDataByFav();
    setLoading(false);
  }

    /*people.forEach(async (p) => {
      p.data.forEach((d, i) => {
        d.forEach(async(c, j) => {
          c.user = p.id;
          c.day = i;
          c.order = j;
          await addDoc(collection(db, 'classes'), c)
        })
      })
    })*/

  const setDataByFav = () => {
    const favPerson = localStorage.getItem("favorite");
    const perObj = people.find((per) => per.name === favPerson);
    if ( perObj )
      setDataSource(perObj.data);
  }
 
  const unsetFavorite = () => {
    setFavorite(null);
  }

  return (
    <div className="App bg-dark py-3 px-4 text-light text-center">
      <Header
        dataSource={dataSource}
        setDataByFav={setDataByFav}
        victim={victim}
        favorite={favorite}
        setFavorite={setFavorite}
        people={people}
        setVictim={setVictim}
        setDataSource={setDataSource}
        unsetFavorite={unsetFavorite}
      />

      <Wrapper 
        dataSource={dataSource} 
        data={people} 
        loading={loading}
      />
    </div>
  );
}

export default App;
