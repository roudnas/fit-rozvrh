import React from 'react';

const Hour = ({index, w}) => {
	const cls = "hour text-bold d-flex py-1 align-items-end";
	return (
		<div className={cls} style={{width: w}}>
			{index}:00
		</div>
	)
}

export default Hour;
