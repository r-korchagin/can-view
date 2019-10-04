import React from 'react';

/* stores */
import PgnListStore from '../../store/pgnListStore';

function SearchPanel() {
    /* jshint ignore:start */
    return (
        <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
                <input onChange={(e) => PgnListStore.setfilter(e.target.value)} type="text" name="q" className="form-control" placeholder="Search..."/>
                <span className="input-group-btn">
                    <button type='submit' name='search' id='search-btn' className="btn btn-flat">
                        <i className="fa fa-search"></i></button>
                </span>
            </div>
        </form>
    );
    /* jshint ignore:end */
}

export default SearchPanel;