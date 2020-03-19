import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const TextArea = (props) => {
  const [data, setData] = React.useState([]);
  const [isJsonIncorrect, setIsJsonIncorrect] = React.useState(false);

  React.useEffect(() => {
    const rows = [];
    rows.push([...props.columnsTitle]);
    props.data.map(row => {
      return rows.push({...row, id: undefined});
    });
    const parseToJSON = JSON.stringify(rows).replace(/\[{|}]|\[\[/g, '').replace(/},{|],{/g, '\n');
    setData(parseToJSON);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  const onTextAreaTyping = (text) => {
    const lines = text.split(/\n/);
    const newTitle = lines.splice(0, 1).toString().replace(/"/g, '').split(/,/);
    const wrapped = "[{" + lines.join("},{") + "}]";
    // Ловим ошибку если текст в TEXTAREA введен неверно
    try {
      const obj = JSON.parse(wrapped);
      props.updateData(obj);
      props.updateTitle(newTitle);
      setIsJsonIncorrect(false);
    } catch (error) {
      setIsJsonIncorrect(true);
    }
  }
  
  return (
    <>
      <textarea 
        style={{width: '100%', height: '300px'}} 
        defaultValue={data}
        onChange={(e) => onTextAreaTyping(e.target.value)}
      />
      {isJsonIncorrect 
        ? <>
            <p>Введити данные пока не верны. Это сообщение пропадет, когда данные будут введены верно</p> 
            <p>В качестве примера можете использовать шаблон: <strong>"Age":"52"</strong>, где Age - колонка, 52 - значение</p> 
          </>
        : null
      }
    </>
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
    updateTitle: (newTitles) => dispatch(actions.updateTitle(newTitles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextArea);