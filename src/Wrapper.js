import React, {useState} from 'react';
import Hour from './Hour';
import Class from "./Class";

const Wrapper = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const classesData = [
		[
			{
				title: "BI-DBS.21",
				startTime: "9:15",
				endTime: "10:45"
			},
			{
				title: "BI-PSI.21",
				startTime: "12:45",
				endTime: "14:15"
			},
			{
				title: "BI-MDF.21",
				startTime: "14:30",
				endTime: "16:00"
			},
		]];
	const classes = [[]];
	for (let i = 0; i < classesData[0].length; ++i) {
		classes[0].push(<Class dims={windowDimensions} obj={classesData[0][i]} />)
	}

	const fullW = windowDimensions.width / 14;


	let hours = [];
	for (let i = 6; i < 20; ++i)
		hours.push(<Hour index={i + 1} key={i} w={fullW} />)


	return (
		<div className="bg-light w-100 main rounded">
			<div className="hours d-flex flex-row">
				{hours}
			</div>
			<div className="classes pt-2 pb-2 d-flex flex-row">
				{classes[0]}
			</div>
		</div >
	)

}

const getWindowDimensions = () => {
	const {innerWidth: width, innerHeight: height} = window;
	return {
		width,
		height
	};
}






export default Wrapper;
