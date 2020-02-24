import React from 'react';
import { connect } from 'react-redux';
import FilterType from './FilterType/FilterType';
import classes from './FilterPannel.module.css';
import * as actions from '../../store/index';

const FilterPannel = (props) => {

    return (
        <div className={classes.FilterPannel}>
            <FilterType title="Singer" options={props.fiterData[0]} onChange={(e) => props.onSetFilterHandler(e.target.value, 'filterSinger')} />
            <FilterType title="Ganre" options={props.fiterData[1]} onChange={(e) => props.onSetFilterHandler(e.target.value, 'filterGanre')}  />
            <FilterType title="Year" options={props.fiterData[2]} onChange={(e) => props.onSetFilterHandler(e.target.value, 'filterYear')}  />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fiterData: state.fiterData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetFilterHandler: (filterParam, filterField) => dispatch(actions.onSetFilter(filterParam, filterField))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterPannel);