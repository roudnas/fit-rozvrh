import React from 'react';

const Class = ({dims, obj}) => {
	const fullW = dims.width / 14;
	const sT = parseTime(obj.startTime);
	const eT = parseTime(obj.endTime);
	const diff = (eT - sT);
	const width = diff * fullW;
	const marL = (sT - 7) * fullW;
	return (
		<div className="course rounded bg-dark p-3"
			style={{
				width: width, marginLeft: 0, marginTop: 20,
				position: "relative", left: marL
			}}>
			<h5>{obj.startTime} - {obj.endTime}</h5>
			{obj.title}
		</div>
	)
}

const parseTime = (str) => {
	const h = parseFloat(str.split(":")[0]);
	const m = parseFloat(str.split(":")[1]) / 60;
	return h + m;
}

export default Class;


