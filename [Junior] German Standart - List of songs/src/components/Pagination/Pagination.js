import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/index';
import classes from './Pagination.module.css';

const Pagination = (props) => {
    let pagination = [];
    const paginationWithDots = [];

    if (props.pagesAmount > 1) {
        const [left, right] = [props.curPage-2, props.curPage+3]
        for (let i = 1; i < props.pagesAmount; i++) {
            if (i === 1 || i === props.pagesAmount-1 || (i >= left && i < right)) {
                pagination.push( i ) 
            }
        }
    }
    if(pagination.length) {
        let l;
        for (let i of pagination) {
            if (l) {
                if (i - l === 2) {
                    paginationWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    paginationWithDots.push(`...`);
                }
            }
            paginationWithDots.push(i);
            l = i;    
        }
        pagination = Object.keys(paginationWithDots).map(i => (
                <li className={paginationWithDots[i] === `...` ? null : classes.Page}
                onClick={paginationWithDots[i] === `...` ? null : () => props.onPageSelectHandler(paginationWithDots[i])} 
                style={paginationWithDots[i] !== props.curPage ? null : {color: 'red'}}
                key={i}> {paginationWithDots[i]} </li>
        ))
    }

    return pagination;
}

const mapStateToProps = state => {
    return {
        pagesAmount: state.pagesAmount,
        curPage: state.curPage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPageSelectHandler: (curPage) => dispatch(actions.setCurPage(curPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);