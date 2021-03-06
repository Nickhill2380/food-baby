import gql from 'graphql-tag';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_MENU_ITEM = gql`
    mutation addMenuItem($menuItem: MenuItemInput) {
        addMenuItem(menuItem: $menuItem) {
            _id
            name
            description
            image
            price
            course {
                _id
                name
            }
        }
    }

`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_ORDER = gql`
    mutation addOrder($menuItems: [ID]!) {
        addOrder(menuItems: $menuItems) {
            _id
            purchaseDate
            menuItems {
                _id
                name
                description
                price
                course {
                    _id
                    name
                }
            }
        }
    }
`;

export const DELETE_MENU_ITEM = gql`
    mutation deleteMenuItem($_id: ID!) {
        deleteMenuItem(_id: $_id) {
            _id
            name
            description
            image
            price
            course {
                _id
            }
        }
    }
`;

export const EDIT_MENU_ITEM = gql`
    mutation editMenuItem($menuItem: MenuItemInput) {
        editMenuItem(menuItem: $menuItem) {
            _id
            name
            description
            image
            price
            course {
                _id
                name
            }
        }
    }
`;