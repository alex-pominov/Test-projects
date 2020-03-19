import React from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Table from './components/Table/Table';
import TextPresentation from './components/TextPresentation/TextPresentation';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App(props) {

  React.useEffect(() => {
    props.getDataFromCsv();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <ErrorBoundary>
      <div className="container">
        { props.isViewTypeTable ? <Table /> : <TextPresentation /> }
        <button onClick={() => props.changeViewType()}>Change view type</button>
      </div>
    </ErrorBoundary>
  );
}

/**
 * -----------------------CONNECT REDUX STORE-----------------------
*/
const mapStateToProps = state => {
  return {
    isViewTypeTable: state.isViewTypeTable
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDataFromCsv: () => dispatch(actions.getDataFromCsv()),
    changeViewType: () => dispatch(actions.changeViewType())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);