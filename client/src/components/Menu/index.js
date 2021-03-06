import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Header } from 'semantic-ui-react';

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_ALL_COURSES, UPDATE_MENU_LIST } from '../../utils/actions';
import { QUERY_ALL_MENU_ITEMS, QUERY_ALL_COURSES } from '../../utils/queries';
import { filterMenu, idbPromise } from '../../utils/helpers';
import MenuItem from '../MenuItem/index';


function Menu() {
    const [state, dispatch] = useStoreContext();
    const { loading, data } = useQuery(QUERY_ALL_MENU_ITEMS, {
        fetchPolicy: 'no-cache'
    });
    const { loading: coursesLoading, data: coursesData } = useQuery(QUERY_ALL_COURSES);
   
    useEffect(() => {
        
        if (data) {
            dispatch({ 
                type: UPDATE_MENU_LIST,
                menuItems: data.menuItems
            });
            
            // save to indexedDB
            data.menuItems.forEach(item => {
                idbPromise('menuItems', 'put', item);
            });
        }
        
        if (coursesData) {
            dispatch({
                type: UPDATE_ALL_COURSES,
                allCourses: coursesData.course
            });
                    
            // save to indexedDB
            coursesData.course.forEach(course => {
                idbPromise('courses', 'put', course);
            });
        }
        
        if (!loading && !coursesLoading) {
            idbPromise('menuItems', 'get').then(item => {
                dispatch({
                    type: UPDATE_MENU_LIST,
                    menuItems: item
                });
            });

            idbPromise('courses', 'get').then(course => {
                dispatch({ 
                    type: UPDATE_ALL_COURSES,
                    allCourses: course
                });
            });
        }

    }, [data, loading, coursesLoading, coursesData, dispatch]);

    function capitalize(title) {
        return title.toUpperCase();
    };

    return (
        <div>
            <Header size='large' className='menu-title'><span className='mobile-menu'>MENU</span></Header>

            {/* renders each menu course */}
            {state.allCourses.map(course => (
                <div key={course._id} className='course-wrapper'>
                    <Header size='medium' className='course-title'>{capitalize(course.name)}</Header>
                    <Card.Group className='card-group'>

                        {/* renders each menu item */}
                        {filterMenu(state.menuItems, course.name).map(item => (
                            <MenuItem
                                key={item._id}
                                _id={item._id}
                                image={item.image}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                            />
                        ))}

                    </Card.Group>
                </div>
            ))}

        </div>
    );
};

export default Menu;