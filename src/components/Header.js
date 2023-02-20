import React, { useEffect, useState } from 'react';
import { AiTwotoneStar, AiOutlineStar, AiFillSetting } from 'react-icons/ai';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import ColorInputGroup from "./ColorInputGroup";
import { getWeek } from 'date-fns';

export const DEFAULT_THEME = {
    header: "#DFB479",
    tut: "#aed581",
    lab: "#4FC3F7",
    lec: "#FFB74D"
};

const Header = ({
    victim,
    favorite,
    setFavorite,
    people,
    setVictim,
    setDataSource,
    unsetFavorite,
    setDataByFav
}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme")
        ? JSON.parse(localStorage.getItem("theme"))
        : DEFAULT_THEME
    );

    useEffect(() => {
        document.documentElement.style.setProperty('--bg-tut', theme.tut);
        document.documentElement.style.setProperty('--bg-lab', theme.lab);
        document.documentElement.style.setProperty('--bg-lec', theme.lec);
        document.documentElement.style.setProperty('--header', theme.header);
        localStorage.setItem("theme", JSON.stringify(theme));
    })

    const dateData = {
        now: Date.parse(new Date()),
        startOfTheSemester: Date.parse("2023-02-20")
    }

    const setThemeById = (id, val) => {
        const t = { ...theme };
        t[id] = val;
        console.log(t);
        setTheme(t);
    }

    const diffWeeks = Math.floor(1 + (dateData.now - dateData.startOfTheSemester) / 1001 / 60 / 60 / 24 / 7);
    const evenOrOdd = getWeek(dateData.now, { weekStartsOn: 1 }) ? "even" : "odd";

    const getStarIcon = (victim, favorite) => {
        return (victim === favorite)
            ? <AiTwotoneStar size={15} className="star" onClick={() => {
                unsetFavorite()
            }} />
            : <AiOutlineStar className="star" onClick={() => {
                setFavorite(victim)
            }} />;
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
        <article
            className="d-flex px-4 py-2 bg-second text-dark rounded nav-main align-items-center justify-content-between">
            <section className="d-flex flex-row align-items-center">
                <img className="pointer me-2" onClick={() => {
                    setVictim(favorite);
                    setDataByFav();
                }} src={process.env.PUBLIC_URL + "/logo.png"} width={125} />
                <Badge bg="black">{evenOrOdd} week (no. {diffWeeks})</Badge>
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
                <Dropdown>
                    <Dropdown.Toggle className="text-bold bg-black" variant="secondary" id="dropdown-basic">
                        <AiFillSetting />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-2">
                        <p>Theme</p>
                        <hr className="m-0" />
                        <ColorInputGroup label={"Header"} id={"header"} value={theme.header} setTheme={setThemeById} />
                        <ColorInputGroup label={"Lec"} id={"lec"} value={theme.lec} setTheme={setThemeById} />
                        <ColorInputGroup label={"Tut"} id={"tut"} value={theme.tut} setTheme={setThemeById} />
                        <ColorInputGroup label={"Lab"} id={"lab"} value={theme.lab} setTheme={setThemeById} />
                        <Badge className={"hodina"} bg={"black"} onClick={() => {
                            setTheme(DEFAULT_THEME);
                        }}>Reset</Badge>
                    </Dropdown.Menu>
                </Dropdown>
            </section>
        </article>
    )
}

export default Header;
