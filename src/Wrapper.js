import React, {useState, useEffect} from 'react';
import Hour from './Hour';
import Classes from "./Classes";


const Wrapper = ({dataSource, data}) => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
	const classesData = dataSource;

	useEffect(() => {
		const listener = () => {
			if (getWindowDimensions().width > 1200)
				setWindowDimensions(getWindowDimensions());
		}
		window.addEventListener("resize", listener);
		return () => {
			window.removeEventListener("resize", listener);
		}
	}, [])

	let fullW;
	if (windowDimensions.width >= 1200)
		fullW = windowDimensions.width / 14;

	setPreviousData(classesData);


	let hours = [];
	for (let i = 6; i < 20; ++i)
		hours.push(<Hour index={i + 1} key={i} w={fullW} />)

	const classWrapperStyle = 
		"classWrapper pb-3 pt-1 main d-flex flex-column justify-content-between";
	const hoursStyle = 
		"hours bg-light w-100 rounded text-dark d-flex flex-row justify-content-around m-0";


	return (
		<div className="bg-dark wrapperino w-100 main rounded">
			<section className={classWrapperStyle}>
				<div className={hoursStyle}>
					{hours}
				</div>
				{classesData.length && classesData[0].length ? (
					classesData.map((classArr, i) => (
						<Classes classArr={classArr} data={data} key={i} dayIndex={i} dims={windowDimensions} />
					))
				) : <></>}
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

const setPreviousData = ( classesData ) => 
{
	if (classesData.length && classesData[0].length) {
		classesData.forEach((arr) => {
			let prevEnd = "";
			arr.forEach((course) => {
				course.prevEnd = prevEnd;
				prevEnd = course.endTime;
			})
		})
	}
}

export default Wrapper;
