import React from 'react';
import { Accordion, Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import ImageUpload from '../ImageUpload';

import { UPDATE_CURRENT_MENU_ITEM } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MENU_ITEM } from '../../utils/mutations';

const MenuForm = (props) => {
    const [state, dispatch] = useStoreContext();
    const { itemPreview } = state;
    const { index } = props;
    const [addMenuItem] = useMutation(ADD_MENU_ITEM);

    const courses = [
        { key: '0', value: 'appetizers', text: 'appetizers' },
        { key: '1', value: 'mains', text: 'mains' },
        { key: '2', value: 'desserts', text: 'desserts' },
        { key: '3', value: 'drinks', text: 'drinks' }
    ]

    const handleChange = event => {
        const { name, value } = event.target    

        // updates GlobalStore for live function render and to handle form save
        switch (true) {
            // specifically targets semantic ui's select form
            case (event.target.getAttribute('role') === 'option'): 
                
                // gets course type selected
                const selectedOption = event.target.querySelector('span').textContent
                
                dispatch({
                    type: UPDATE_CURRENT_MENU_ITEM,
                    itemPreview: {
                        ...itemPreview,
                        course: selectedOption
                    }
                });

                break;
            case (name === 'price'):
                // parses an integer from form data
                const priceInt = parseInt(value);

                dispatch({ 
                    type: UPDATE_CURRENT_MENU_ITEM,
                    itemPreview: {
                        ...itemPreview,
                        price: priceInt
                    }
                });

                break;
            default: 
                dispatch({
                    type: UPDATE_CURRENT_MENU_ITEM,
                    itemPreview: { 
                        ...itemPreview, 
                        [name]: value 
                    }
                });
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const mutationResponse = await addMenuItem({ variables: {
                menuItem: itemPreview
            }});

            return mutationResponse;
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Accordion.Content active={state.activeIndex === index}>
            <Form onSubmit={handleFormSubmit}>
                <Form.Input 
                    label='Name' 
                    name='name'
                    placeholder='Enter the name of the menu item' 
                    onChange={handleChange} 
                />
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label htmlFor='form-price'>Price</label>
                        <input 
                            type='number' 
                            name='price' 
                            min='0' 
                            onChange={handleChange} 
                            id='form-price'
                        />
                    </Form.Field> 
                    <Form.Select 
                        fluid 
                        label='Course'
                        name='course'
                        placeholder='Select the Course' 
                        options={courses} 
                        onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Field>
                    <label htmlFor='form-image-upload'>Image</label>
                    <ImageUpload />
                </Form.Field>
                <Form.TextArea 
                    label='Description' 
                    name='description'
                    placeholder='Enter a short description of the menu item.' 
                    onChange={handleChange} 
                />
                    <Button type='submit'>Save</Button>
            </Form>
        </Accordion.Content>
    );
};

export default MenuForm;