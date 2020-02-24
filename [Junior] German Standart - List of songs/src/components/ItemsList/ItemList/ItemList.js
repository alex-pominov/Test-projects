import React from 'react';

const itemList = (props) => {

    return (
            <ul>
                <li> {props.singer} </li>
                <li> {props.song} </li>
                <li> {props.ganre} </li>
                <li> {props.year} </li>
            </ul>
    )
}

export default itemList;