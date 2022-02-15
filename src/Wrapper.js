import React, {useState, useEffect} from 'react';
import Hour from './Hour';
import Class from "./Class";
import Classes from "./Classes";


const Wrapper = ({dataSource}) => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const classesData = dataSource; 
	useEffect(() => {
		const listener = (e) => {
			setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener("resize", listener);
		return () => {
			window.removeEventListener("resize", listener);
		}
	}, [])

	const fullW = windowDimensions.width / 14;
	classesData.forEach((arr) => {
		let prevEnd = "";
		arr.forEach((course) => {
			course.prevEnd = prevEnd;
			prevEnd = course.endTime;
		})
	})


	let hours = [];
	for (let i = 6; i < 20; ++i)
		hours.push(<Hour index={i + 1} key={i} w={fullW} />)

	return (
		<div className="bg-dark w-100 main rounded">
			<div className="hours bg-light rounded text-dark d-flex flex-row m-0">
				{hours}
			</div>
			<section 
				className="classWrapper py-4 main d-flex flex-column justify-content-between">
			{classesData.map((classArr, i) => (
				<Classes classArr={classArr} dayIndex={i} dims={windowDimensions} />
			))}
			</section>
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
