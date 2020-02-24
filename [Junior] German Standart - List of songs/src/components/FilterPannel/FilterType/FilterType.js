import React from 'react';

const filterType = (props) => {

    let listOfOptions = [];
    if(props.options) {
        for (let option = 0; option < props.options.length; option++) {
            listOfOptions.push(<option 
                    key={option}> {props.options[option]} </option>) 
        }
    }

    return (
        <div>
            <label> {props.title} </label>
            <select onChange={props.onChange}>
                <option>All</option>
                {listOfOptions}
            </select>
        </div>
    )
}

export default filterType;