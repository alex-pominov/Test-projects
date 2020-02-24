import * as actionTypes from './actionTypes';
import axios from 'axios';

/**
 * ----------------------FETCH_DATA----------------------
 */
export const fetchDataStart = () => {
    return {
        type: actionTypes.FETCH_DATA_START
    }
}

export const fetchDataSuccess = (songsList) => {
    return {
        type: actionTypes.FETCH_DATA_SUCCESS,
        songsList: songsList
    }
}

export const fetchDataFail = (error) => {
    return {
        type: actionTypes.FETCH_DATA_FAIL,
        error: error
    }
}

export const fetchDataOnloading = () => {
    return async dispatch => {
        try {
            dispatch(fetchDataStart());
            const response = await axios.get('https://song-list-b37e7.firebaseio.com/songs.json');
            const songsArr = [];
            Object.keys(response.data).map(key => {
                return songsArr.push({
                    id: key,
                    singer: response.data[key].artist,
                    song: response.data[key].title,
                    ganre: response.data[key].ganre,
                    year: response.data[key].year
                });
            });
            dispatch(fetchDataSuccess(songsArr));
            dispatch(renderFetchData());
            dispatch(setFilterOptions());
        } catch (error) {
            dispatch(fetchDataFail(error))
        }
    }
}

/**
 * ----------------------SORT_DATA----------------------
 */
export const onSorting = (sortType) => {
    return {
        type: actionTypes.ON_SORTING_ITEMS,
        sortType: sortType
    }
}

export const sorting = (sortType) => {
    return dispatch => {
        dispatch(onSorting(sortType));
        dispatch(renderFetchData());
    }
}

/**
 * ----------------------Pagination & ResPerPage----------------------
 */
export const curPage = (pageNum) => {
    return {
        type: actionTypes.SET_CURRENT_PAGE,
        pageNum: pageNum
    }
}

export const setCurPage = (pageNum) => {
    return dispatch => {
        dispatch(curPage(pageNum));
        dispatch(renderFetchData());
    }
}

export const resultsPerPage = (resPerPage) => {
    return {
        type: actionTypes.SET_RES_PER_PAGE,
        resPerPage: resPerPage
    }
}

export const setResPerPage = (resPerPage = 10) => {
    return dispatch => {
        dispatch(resultsPerPage(resPerPage));
        dispatch(renderFetchData());
    }
}

/**
 * ----------------------FILTER_DATA----------------------
*/
export const setFilterOptions = () => {
    return {
        type: actionTypes.SET_FILTER_OPTIONS
    }
}

export const setFilter = (filterParam, filterField) => {
    return {
        type: actionTypes.ON_SET_FILTER_HANDLER,
        filterParam: filterParam,
        filterField: filterField
    }
}


export const onSetFilter = (filterParam, filterField) => {
    return dispatch => {
        dispatch(setFilter(filterParam, filterField));
        dispatch(renderFetchData());
    }
}

/**
 * ----------------------RENDER_DATA----------------------
*/
export const renderFetchData = () => {
    return {
        type: actionTypes.RENDER_FETCH_DATA,
    }
}