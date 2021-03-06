import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import firebase from 'firebase';

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import OrderHistory from './pages/OrderHistory';
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import { StoreProvider } from "./utils/GlobalState";
import 'semantic-ui-css/semantic.min.css';
import { useDarkMode } from './components/Themes/useDarkMode';
import { lightTheme, darkTheme } from "./components/Themes/Themes";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/Themes/GlobalStyles";
import Toggle from './components/Themes/Toggler'
import { Message } from "semantic-ui-react";


const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql'
})

// const App = () => 
  
  const firebaseConfig = {
  apiKey: "AIzaSyAPYUQl3v49glJc2H1WErSHVGgejiqEfxo",
  authDomain: "food-baby-682db.firebaseapp.com",
  databaseURL: "https://food-baby-682db-default-rtdb.firebaseio.com",
  projectId: "food-baby-682db",
  storageBucket: "food-baby-682db.appspot.com",
  messagingSenderId: "696002118688",
  appId: "1:696002118688:web:c7b3e92a1806d71bb92845",
  measurementId: "G-L9R64LNE17"
};

  const onMessageListener = () =>
    new Promise((resolve) => {
      messaging.onMessage((payload) => {
        resolve(payload)
      })
    })


  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const messaging = firebase.messaging();
  // this is the listener for any message being created by firebase. It is either passed to the onMessageListener below if the page is active
  // or the backgroundMessageHandler in the client/public/firebase-messaging-sw.js if the page is not the main focus.
  // Currently there are no notifications that would run where the page wouldn't be in focus
  messaging.onMessage(payload => {
    console.log('onMessage:', payload)
  });

  function App() {

    const [theme, themeToggler] = useDarkMode();

    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    const [show, setShow] = useState(false)
    const [notification, setNotification] = useState({ title: '', body: '' });
    // This is the active listener for when the webpage is in focus and firebase function will pass the payload to the message component.
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({ title: payload.notification.title, body: payload.notification.body })
    }).catch(err => console.log('failed: ', err));
    const handleDismiss = () => {
      setShow(false)

    }

    return (

      <ApolloProvider client={client}>

        <Router>
          <ThemeProvider theme={themeMode}>
            <>
              <GlobalStyles />
              <div>
         
                <StoreProvider>
                  <Nav />
                  <Toggle theme={theme} toggleTheme={themeToggler} />
                  {/* shows up when there is a new notification sent from firebase messaging and the screen is active */}
                  {(show) && <Message
                    onDismiss={() => handleDismiss()}
                    show={show}
                    header={notification.title}
                    content={notification.body}
                  />}
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/orderHistory" component={OrderHistory} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/success" component={Success} />
                    <Route component={NoMatch} />
                  </Switch>
                </StoreProvider>
                
              </div>
            </>
          </ThemeProvider>
        </Router>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js"></script>
        <script src="https://www.gstatic.com/firebasejs/8.3.2/firebase-database.js"></script>
      </ApolloProvider>
    );
  }

  export default App;
