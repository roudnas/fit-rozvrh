import React from "react";
import Classes from "./Classes";

const Day = ({ k, keyDay, day, classes, show }) => {
  return (
    <section className="d-flex flex-wrap mt-2">
      <p className="c-bold day col-lg-1 rounded col-12 col-md-12 col-sm-12 my-lg-0 my-3 py-3 d-flex align-items-center justify-content-center">
        {keyDay}
      </p>
      <div className="d-flex col-lg-11 col-12 col-sm-12 col-md-12 py-3 px-5 flex-wrap justify-content-between">
        {day.times.map((t, i) => (
          <div key={i} className="d-flex px-3 py-2 flex-column">
            <p className="">{t}</p>
            <hr />
            <Classes
              dayIndex={k}
              timeIndex={i}
              studentClasses={classes.dominik}
              color="warning"
              show={show}
            />
            <Classes
              dayIndex={k}
              timeIndex={i}
              studentClasses={classes.nick}
              color="danger"
              show={show}
            />
            <Classes
              dayIndex={k}
              timeIndex={i}
              studentClasses={classes.sulda}
              color="success"
              show={show}
            />
            <Classes
              dayIndex={k}
              timeIndex={i}
              studentClasses={classes.poky}
              color="info"
              show={show}
            />
            <Classes
              dayIndex={k}
              timeIndex={i}
              studentClasses={classes.wojciech}
              color="light"
              show={show}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Day;
