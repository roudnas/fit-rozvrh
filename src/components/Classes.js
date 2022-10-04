import React, {useMemo} from "react";
import {areIntervalsOverlapping, getDay} from "date-fns";

import Class from "./Class";

import {intervalFromLesson} from "../utils/intervalFromLesson";
import {TimeIndicator} from "./TimeIndicator";

const Classes = ({classArr, data, dayIndex, dims}) => {

    const classArrWithCollisions = useMemo(() => {
        const returnArr = [];

        classArr.forEach((lecture) => {
            let currentLevel = 1;

            returnArr.forEach((sortedLecture) => {
                if (
                    areIntervalsOverlapping(
                        intervalFromLesson(lecture),
                        intervalFromLesson(sortedLecture)
                    )
                ) {
                    currentLevel = sortedLecture.levelCount += 1;
                }
            });

            returnArr.push({
                ...lecture,
                level: currentLevel,
                levelCount: currentLevel,
            });
        });

        return returnArr;
    }, [classArr]);

    return (
        <>
            <div className="classes pb-2 text-dark d-flex flex-row">
                <h5 className="day-text text-light h-index my-auto">
                    {getDayName(dayIndex)}
                </h5>
                {dayIndex + 1 === getDay(new Date()) && <TimeIndicator dims={dims}/>}
                {classArrWithCollisions.map((course, i) => {
                    return <Class key={i} dims={dims} obj={course}/>;
                })}
            </div>
        </>
    );
};

const getDayName = (index) => {
    const names = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return names[index];
};

export default Classes;
