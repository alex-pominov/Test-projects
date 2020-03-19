import React from 'react';

const tableTitle = (props) => {
  
  const columnsTitles = () => {
    const titles = [];
    let id = 0;
    for (let title of props.columns) {
      titles.push(<th key={title + id}>{title}</th>);
      id++;
    };
    return titles;
  }

  return (
    <thead>
      <tr>
        {columnsTitles()}
        <th>Actions</th>
      </tr>
    </thead>
  )
}

export default tableTitle;