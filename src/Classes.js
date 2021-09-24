import React from "react";

const Classes = ({ dayIndex, timeIndex, studentClasses, color, show }) => {
  const getBadgeClasses = (color) => {
    return `badge shadowed p-2 my-1 hodina rounded-pill bg-${color} text-dark`;
  };

  return (
    <>
      {studentClasses[dayIndex][timeIndex] !== "" && show.includes(color) ? (
        <span className={getBadgeClasses(color)}>
          <p className="m-0">{studentClasses[dayIndex][timeIndex]}</p>
        </span>
      ) : (
        <></>
      )}
    </>
  );
};

export default Classes;
