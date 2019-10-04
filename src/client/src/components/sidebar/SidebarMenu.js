import React from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

/* stores */
import PgnListStore from '../../store/pgnListStore';

/* styles */
import './sidebar.css';

const SidebarMenu = observer(() => {
    return (
    /* jshint ignore:start */
    <ul className="sidebar-menu">
        <li className="header">Parameter Group Label</li>
        {PgnListStore.getList.map((el,index) => (
            <li key={index} className="treeview">
                <a href="index.html" 
                onClick={(e)=>{e.preventDefault(); PgnListStore.checkList(el.name)}} 
                className= {cn({'check-menu':el.checked? true : false})}>
                <i className="fa fa-files-o"></i>
                <span>{el.name}</span>
                <span className="label label-primary pull-right">{el.count}</span>
                </a>
            </li>
        ))}
    </ul>
    /* jshint ignore:end */
    );}
    );


export default SidebarMenu;