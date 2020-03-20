import React from 'react';
import AddNewRow from './TableComponents/AddNewRow';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import TableTitle from './TableComponents/TableTitle';

const Table = props => {
  const [inputFields, setInputFields] = React.useState({});

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); 
    }
  }
  
  const onSaveRow = (item) => {
    const newObj = {...inputFields};
    const newData = [...props.data].map( row => {
      if ( row === item ) {
        row = { ...row, ...newObj };
      }
			return row;
    });
    props.updateData(newData);
    setInputFields({});
  }

  const onDeleteRow = (id) => {
    const index = props.data.findIndex( row => {
			return row.id === id;
    });
    const newData = [...props.data].filter(el => el !== props.data[index]);
    props.updateData(newData);
  }

  const addNewRow = (item) => {
    const newData = [...props.data];
    newData.push(item);
    props.updateData(newData);
  }

  const editableRows = item => {
    const rowData = [];
    let id = 0;
    for (let column of props.columnsTitle) {
      if (column === 'id') continue;
      rowData.push(
        <td key={column + id}>
          <input
            style={{border: 'none'}}
            type="text" 
            defaultValue={item[column]}
            onKeyDown={(e) => handleKeyDown(e)}
            onBlur={() => onSaveRow(item)}
            onChange={(e) => setInputFields({...inputFields, [column]: e.target.value})}
          />
        </td>
      )
      id++;
    };
    return rowData;
  }
   
  return (
    <table className="table">
      <TableTitle columns={props.columnsTitle} />
      <tbody>
        { props.data.map(item => (
          <tr key={item.id}>
            {editableRows(item)}
            <td style={{width: '200px'}}>
              <button onClick={() => onDeleteRow(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
        <AddNewRow columns={props.columnsTitle} addNewRow={(item) => addNewRow(item)} />
      </tbody>
    </table>
  )
}

/**
 * -----------------------CONNECT REDUX STORE-----------------------
*/
const mapStateToProps = state => {
  return {
    data: state.data,
    columnsTitle: state.tableColumnsTitle
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateData: (data) => dispatch(actions.updateData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);