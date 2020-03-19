import * as actionTypes from './actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
  data: [],
  tableColumnsTitle: [],
  error: null,
  isViewTypeTable: true
}

/**
 * -----------------------DISPATCH FUNCTIONS-----------------------
*/
const getDataFromCsv = (state, action) => {
  return state;
}

const dataFromCsvLoaded = (state, action) => {
  const tableTitle = action.tableTitle.splice(0, 1).flat(1);
  const data = action.data.map(row => row = {id: Math.random().toFixed(5), ...row})
  return updateObject(state, { data: data, tableColumnsTitle: tableTitle})
}

const getDataFromCsvFailed = (state, action) => {
  return updateObject(state, {error: action.error})
}

const changeViewType = (state, action) => {
  return updateObject(state, {isViewTypeTable: !state.isViewTypeTable})
}

const updateData = (state, action) => {
  const data = action.data.map(row => row = {id: Math.random().toFixed(5), ...row})
  return updateObject(state, {data: data})
}

const updateTitle = (state, action) => {
  return updateObject(state, {tableColumnsTitle: action.titles})
}

/**
 * -----------------------REDUCER-----------------------
*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_FROM_CSV: return getDataFromCsv(state, action);
    case actionTypes.DATA_FROM_CSV_LOADED: return dataFromCsvLoaded(state, action);
    case actionTypes.GET_DATA_FROM_CSV_FAILED: return getDataFromCsvFailed(state, action);

    case actionTypes.UPDATE_TABLE_DATA: return updateData(state, action);
    case actionTypes.UPDATE_TABLE_TITLE: return updateTitle(state, action);

    case actionTypes.CHANGE_VIEW_TYPE: return changeViewType(state, action);
    default: return state;
  }
}

export default reducer;