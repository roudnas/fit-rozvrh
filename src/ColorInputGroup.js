import React from 'react';

const ColorInputGroup = ({label, id, value, setTheme}) => {
    return (
        <div className={"d-flex flex-row align-items-center"}>
            <p className={"p-0 pe-1"}>{label}:</p>
            <input type={"color"} value={value} onInput={(e) => {
                setTheme(id, e.target.value);
            }}/>
        </div>
    )
}

export default ColorInputGroup;