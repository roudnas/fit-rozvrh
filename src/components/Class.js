import React from "react";

import {APP_PADDING_X} from "../App";

export const DAY_TEXT_WIDTH = 40;
export const TIME_OFFSET_PX = 25;

const Class = ({dims, obj}) => {
    if (dims.width < 1200) dims.width = 1200;

    const fullW = (dims.width - APP_PADDING_X * 2) / 14;
    const sT = parseTime(obj.startTime);
    const eT = parseTime(obj.endTime);
    let marL = (sT - 7) * fullW - DAY_TEXT_WIDTH + TIME_OFFSET_PX;

    if (obj.prevEnd.length) {
        const prevT = parseTime(obj.prevEnd);
        marL = (sT - prevT) * fullW;
    }

    const width = (eT - sT) * fullW;
    const className = `course text-dark rounded bg-${obj.type} p-2`;

    const displayInline = obj.levelCount > 2;

    return (
        <div
            className={className}
            style={{
                width: width,
                marginLeft: marL,
                top: `${(100 / obj.levelCount) * (obj.level - 1)}%`,
                height: `${100 / obj.levelCount - 4}%`,

                ...(displayInline && {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }),
            }}
        >
            {typeof obj.note !== "undefined" && obj.note.length ? (
                <h6 className="note bg-danger p-1 text-bold text-light rounded">
                    {obj.note}
                </h6>
            ) : (
                <></>
            )}
            {obj.levelCount === 1 && (
                <h6 className="m-0 ">
                    {obj.startTime} - {obj.endTime}
                </h6>
            )}
            <h6 className="m-0 text-bold">{obj.title}</h6>
            <h6 className="m-0 ">{obj.room}</h6>
        </div>
    );
};

const parseTime = (str) => {
    const h = parseFloat(str.split(":")[0]);
    const m = parseFloat(str.split(":")[1]) / 60;
    return h + m;
};

export default Class;
