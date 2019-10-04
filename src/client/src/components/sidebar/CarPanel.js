import React from 'react';
import { observer } from 'mobx-react';

import menuStore from '../../store/menuStore';

const CarPanel = observer(() => {
    /* jshint ignore:start */
    return (
            <div className="user-panel" onClick = {()=>{menuStore.toggleCarModal()}}>
                    <div className="pull-left image">
                        <img src="/img/car_view.png" className="img-circle" alt="Car View" />
                        </div>
                        <div className="pull-left info">
                        <p>{menuStore.vehicaleName}</p>
                        <a href="index.html" onClick = {e=>{e.preventDefault(); menuStore.toggleCarModal()}}><i className="fa fa-circle text-success"></i> Online</a>
                    </div>
            </div>
    );
    /* jshint ignore:end */
});

export default CarPanel;