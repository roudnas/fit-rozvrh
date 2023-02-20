import "./styles/App.css";
import {useState, useEffect} from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import {getPeople} from "./utils/dbQueries";

export const APP_PADDING_X = 20;

function App({_db}) {
    const [db] = useState(_db);
    const [people, setPeople] = useState([]);
    const [favorite, setFavorite] = useState(localStorage.getItem("favorite"));
    const [victim, setVictim] = useState(localStorage.getItem("favorite"));
    const [dataSource, setDataSource] = useState([[], [], [], [], []]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        updatePeople();
    }, [])

    useEffect(() => {
        localStorage.setItem("favorite", favorite);
    }, [favorite])

    const updatePeople = async () => {
        const p = await getPeople(db);
        setPeople(p);
        setDataByFav(p);
        setLoading(false);
    }

    const setDataByFav = (p = people) => {
        const favPerson = localStorage.getItem("favorite");
        const perObj = p.find((per) => per.name === favPerson);
        console.log(favPerson, perObj, p)
        if (perObj)
            setDataSource(perObj.data);
    }

    const unsetFavorite = () => {
        setFavorite(null);
    }

    return (
        <div className="App bg-dark py-3 text-light text-center">
            <Header
                victim={victim}
                favorite={favorite}
                setFavorite={setFavorite}
                people={people}
                setVictim={setVictim}
                setDataSource={setDataSource}
                unsetFavorite={unsetFavorite}
                setDataByFav={setDataByFav}
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
