import React from 'react';

const AddNewRow = (props) => {
	const [inputFields, setInputFields] = React.useState({});
	
	const onAddNewRowHandler = () => {
		const newObj = {id: Math.random().toFixed(5), ...inputFields};
		props.addNewRow(newObj);
		setInputFields({});
  }
  
  const rowInputs = () => {
    const titles = [];
    let id = 0;
    for (let column of props.columns) {
      if (column === 'id') continue;
      titles.push(
        <td key={column + id}>
          <input
            type="text"
            placeholder={column}
            value={inputFields[column] || ''}
            onChange={(e) => setInputFields({...inputFields, [column]: e.target.value})}
          />
        </td>
      )
      id++;
    };
    return titles;
  }

	return (
		<>
			<tr>
				{rowInputs()}
				<td>
					<button onClick={() => onAddNewRowHandler()}>Add</button>
				</td>
			</tr>
		</>
	)
}

export default AddNewRow;