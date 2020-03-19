import Papa from 'papaparse';
import * as actionTypes from './actionTypes';
import csvFile from '../../assets/input.csv';

export const gettingDataFromCsv = () => {
  return {
    type: actionTypes.GET_DATA_FROM_CSV
  }
}

export const dataFromCsvLoaded = (data, tableTitle) => {
  return {
    type: actionTypes.DATA_FROM_CSV_LOADED,
    data: data,
    tableTitle: tableTitle
  }
}

export const getDataFromCsvFailed = (error) => {
  return {
    type: actionTypes.GET_DATA_FROM_CSV_FAILED,
    data: error
  }
}

export const getDataFromCsv = () => {
  return async dispatch => {
    try {
      dispatch(gettingDataFromCsv());
      const response = await fetch(csvFile)
      const reader = response.body.getReader()
      const result = await reader.read() 
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) 
      const results = Papa.parse(csv, { header: true })
      let parseTableWithTitle = Papa.parse(csv, { header: false })
      let tableTitle = parseTableWithTitle.data.slice(0, 1)
      const rows = results.data 
      dispatch(dataFromCsvLoaded(rows, tableTitle));
    } catch (error) {
      dispatch(getDataFromCsvFailed(error.response.data.error.message));
    }
  }
}

export const updateData = (data) => {
  return {
    type: actionTypes.UPDATE_TABLE_DATA,
    data: data
  }
}

export const updateTitle = (titles) => {
  return {
    type: actionTypes.UPDATE_TABLE_TITLE,
    titles: titles
  }
}

export const changeViewType = () => {
  return {
    type: actionTypes.CHANGE_VIEW_TYPE
  }
}
