import React from 'react';

const Hour = ({index, w}) => {
	const nw = (new Date().getHours()) + (new Date().getMinutes() / 60)
	const cls = "hour text-bold d-flex py-1 align-items-end justify-content-center";
	return (
		<div className={cls} style={{width: w}}>
			{index}:00
		</div>
	)
}

export default Hour;
