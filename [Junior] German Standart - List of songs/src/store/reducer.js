import * as actionTypes from './actionTypes';
import {updateObject} from './utility';

const initialState = {
    fetchedSongsList: [],
    songsList: [],

    loading: false,
    error: null,

    curPage: 1,
    curResPerPage: 10,
    resultsPerPage: [5, 10, 25, 50, 100],
    pagesAmount: '',

    sortType: '',
    fiterData: [],
    filterSinger: "All",
    filterGanre: "All",
    filterYear: "All",
}

const fetchDataStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchDataSuccess = (state, action) => {
    return updateObject(state, {loading: false, fetchedSongsList: action.songsList})
}

const applyFilterOptions = (state, arr) => {
    let firstIteration, secondIteration, thierdIteration = [];
    if (state.filterSinger !== "All") {
        firstIteration = [...arr].filter(item => item.singer === state.filterSinger)
    } else {
        firstIteration = [...arr];
    }
    if (state.filterGanre !== "All") {
        secondIteration = [...firstIteration].filter(item => item.ganre === state.filterGanre)
    } else {
        secondIteration = [...firstIteration];
    }
    if (state.filterYear !== "All") {
        thierdIteration = [...secondIteration].filter(item => item.year === state.filterYear)
    } else {
        thierdIteration = [...secondIteration];
    }
    return state.songsList = thierdIteration;
}

const renderData = (state, action) => {
    const start = (state.curPage - 1) * state.curResPerPage;
    const end = state.curPage * state.curResPerPage;
    let uniqData = [...state.fetchedSongsList];
    applyFilterOptions(state, uniqData);
    
    let finalList;
    const pagesAmount = Math.ceil(state.songsList.length / state.curResPerPage) + 1;
    if (state.songsList.length > state.curResPerPage) {
        finalList = state.songsList.slice(start, end)
    } else {
        finalList = [...state.songsList]
    }
    return updateObject(state, {songsList: finalList, pagesAmount: pagesAmount})
}

const fetchDataFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error})
}


const onSorting = (state, action) => {
    const sortedSongsList = [...state.fetchedSongsList];
    let sortType = action.sortType;
    if (state.sortType !== action.sortType) {
        sortedSongsList.sort((a, b) => {
            if (a[sortType] > b[sortType] ) {
                return 1;
              }
              if (a[sortType] < b[sortType] ) {
                return -1;
              }
              return 0;
            });
    } else {
        sortedSongsList.reverse();
        sortType = `reverse-${action.sortType}`
    }
    return updateObject(state, {loading: false, fetchedSongsList: sortedSongsList, sortType: sortType, curPage: 1}) 
}

const setCurPage = (state, action) => {
    return updateObject(state, {curPage: action.pageNum}) 
}

const setResPerPage = (state, action) => {
    return updateObject(state, {curResPerPage: action.resPerPage, curPage: 1}) 
}

const setFilterOptions = (state, action) => {
    const uniqData = [];
    uniqData.push([...new Set(state.fetchedSongsList.map(item => item.singer))]);
    uniqData.push([...new Set(state.fetchedSongsList.map(item => item.ganre))]);
    uniqData.push([...new Set(state.fetchedSongsList.map(item => item.year))]);
    return updateObject(state, {fiterData: uniqData})  
}

const onSetFilter = (state, action) => {
    return updateObject(state, { [action.filterField]: action.filterParam, curPage: 1})  
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_START: return fetchDataStart(state, action);
        case actionTypes.FETCH_DATA_SUCCESS: return fetchDataSuccess(state, action);
        case actionTypes.RENDER_FETCH_DATA: return renderData(state, action);
        case actionTypes.FETCH_DATA_FAIL: return fetchDataFail(state, action);
        case actionTypes.ON_SORTING_ITEMS: return onSorting(state, action);
        case actionTypes.SET_CURRENT_PAGE: return setCurPage(state, action);
        case actionTypes.SET_RES_PER_PAGE: return setResPerPage(state, action);
        case actionTypes.SET_FILTER_OPTIONS: return setFilterOptions(state, action);
        case actionTypes.ON_SET_FILTER_HANDLER: return onSetFilter(state, action);
        default: return state;
    }    
}

export default reducer;
