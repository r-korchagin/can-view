import React from 'react';
import CarPanel from './sidebar/CarPanel';
import SearchPanel from './sidebar/SearchPanel';
import SidebarMenu from './sidebar/SidebarMenu';

function MainSidebar() {
    /* jshint ignore:start */
    return (
        <aside className="main-sidebar">
             {/* sidebar: style can be found in sidebar.less */}
            <section className="sidebar">
                
                {/* Sidebar Car panel */}
                <CarPanel/>

                {/* search form */}
                <SearchPanel/>

                {/* sidebar menu */}
                <SidebarMenu/>
            </section>
        </aside>
    );
    /* jshint ignore:end */
}

export default MainSidebar;