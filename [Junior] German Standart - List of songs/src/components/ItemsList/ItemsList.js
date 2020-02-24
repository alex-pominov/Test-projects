import React, { useEffect } from 'react';
import {connect} from 'react-redux';

import classes from './ItemsList.module.css';
import ItemList from './ItemList/ItemList';
import * as actions from '../../store/index';
import Spinner from '../UI/Spinner/Spinner';
import Pagination from '../Pagination/Pagination';

const ItemsList = (props) => {

    useEffect(() => {
        props.loadDataOnInit();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const combineSongsList = props.songs.map(song => {
            return <ItemList 
                key={song.id}
                singer={song.singer} 
                song={song.song} 
                ganre={song.ganre} 
                year={song.year} />
    }); 

    let availableResPerPage = [];
    if (props.resPerPage) {
        for (let res = 0; res < props.resPerPage.length; res++) {
            availableResPerPage.push(<li 
                className={classes.Page}
                onClick={() => props.setResultsPerPage(props.resPerPage[res])}
                style={props.resPerPage[res] !== props.curResPerPage ? null : {color: 'red'}}
                key={res}> {props.resPerPage[res]} </li>) 
        }
    }

    let list = (
        <React.Fragment>
            <div className={classes.ListTitle}>
                <ul onClick={(e) => props.singerSorting(e.target.textContent.toLowerCase())}>
                    <li>Singer</li>
                    <li>Song</li>
                    <li>Ganre</li>
                    <li>Year</li>
                </ul>
            </div>
            <div className={classes.SongsList}>
                {combineSongsList}
            </div>
            <div style={{width: '80%', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <ul className={classes.Pagination}>
                        <Pagination />
                    </ul>
                </div>
                <div>
                    <ul className={classes.Pagination}>
                        {availableResPerPage}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );

    if (props.loading) {
        list = <Spinner />
    };

    return list;
}

const mapStateToProps = state => {
    return {
        songs: state.songsList,
        loading: state.loading,
        curResPerPage: state.curResPerPage,
        resPerPage: state.resultsPerPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadDataOnInit: () => dispatch(actions.fetchDataOnloading()),
        singerSorting: (sortType) => dispatch(actions.sorting(sortType)),
        setResultsPerPage: (resPerPage) => dispatch(actions.setResPerPage(resPerPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);