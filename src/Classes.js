import React from "react";
import Class from "./Class";

const Classes = ({classArr, data, dayIndex, dims}) => {

	return (
		<>
			<div className="classes text-dark pt-2 pb-2 d-flex flex-row align-items-center">
				<h5 className="text-light h-index abs">{getDayName(dayIndex)}</h5>
				{classArr.map((course, i) => (
					<Class
						key={i} dims={dims}
						obj={course} />
				))}
			</div>
		</>
	)
};


const getDayName = (index) => {
	const names = ["Mon", "Tue", "Wed", "Thu", "Fri"];
	return names[index];
}

export default Classes;
