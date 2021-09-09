import "./App.css";
import Day from "./Day";
import { useState } from "react";

function App() {
  const colors = ["warning", "danger", "success", "info", "light"];
  const lidi = ["Dominik", "Nick", "Sulda", "Poky", "Wojciech"];
  const [show, setShow] = useState(colors);

  const pondeliCasy = ["11:00", "12:45", "14:30", "16:15", "18:00"];
  const zbytekCasy = [
    "7:30",
    "9:15",
    "11:00",
    "12:45",
    "14:30",
    "16:15",
    "18:00",
  ];

  const days = {
    Monday: {
      times: pondeliCasy,
    },
    Tuesday: {
      times: zbytekCasy,
    },
    Wednesday: {
      times: zbytekCasy,
    },
    Thursday: {
      times: zbytekCasy,
    },
    Friday: {
      times: zbytekCasy,
    },
  };

  const classes = {
    dominik: [
      ["PA-1", "PA1-sem", "", "TZP-p1", "PA1-lab"],
      ["", "UOS-p1", "", "", "DML-cv", "", ""],
      ["", "", "DML-p2", "", "", "LA1-cv", "UOS-cv5"],
      ["", "", "", "", "LA1-p2", "", ""],
      ["", "", "", "TZP-c2", "GIT-p1", "", ""],
    ],
    nick: [
      ["PA-1", "", "", "TZP-p1", ""],
      ["PA1-sem", "", "TZP-c2", "", "UOS-p3", "", ""],
      ["", "", "DML-p2", "", "", "UOS-cv5", ""],
      ["", "LA1-cvSUDY", "", "PA1-lab", "LA1-p2", "DML-cvLICHY", ""],
      ["", "", "", "", "GIT-p1", "", ""],
    ],
    sulda: [
      ["", "", "DML-p1", "", "TZP-p2"],
      ["", "", "UOS-p2", "", "PA1-sem", "", ""],
      ["UOS-cv4", "", "PA1-p2", "", "", "", ""],
      ["", "", "TZP-cv2", "", "LA1-p2", "PA1-lab2", ""],
      ["", "LA1-cv2", "", "DML-cv", "", "GIT-p2", ""],
    ],
    poky: [
      ["PA-1", "PA1-sem", "DML-p1", "TZP-p1", ""],
      ["", "UOS-p1", "", "", "", "", ""],
      ["", "", "", "UOS-cv5", "", "", ""],
      ["", "", "DML-cv1", "", "LA1-p2", "", ""],
      ["", "", "", "", "GIT-p1", "TZP-cv2", ""],
    ],
  };
  classes.wojciech = classes.nick;

  const getBadgeClass = (color) => {
    return `badge p-2 m-1 hodina rounded-pill bg-${color} text-dark`;
  };

  return (
    <div className="App bg-dark text-light text-center">
      <div>
        <span
          onClick={() => {
            setShow(colors);
          }}
          className="badge p-2 m-1 hodina rounded-pill bg-secondary text-dark"
        >
          All
        </span>
        {colors.map((color, i) => (
          <span
            onClick={() => {
              setShow([color]);
            }}
            className={getBadgeClass(color)}
          >
            {lidi[i]}
          </span>
        ))}
      </div>
      {Object.keys(days).map((day, i) => (
        <Day k={i} keyDay={day} day={days[day]} classes={classes} show={show} />
      ))}
    </div>
  );
}

export default App;
