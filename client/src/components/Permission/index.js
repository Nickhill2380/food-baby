import React from "react";
import firebase from 'firebase';
import {Label, Icon} from 'semantic-ui-react';



function Permission () {

    const messaging= firebase.messaging();

    function gainPermission() {
        messaging.requestPermission()
        .then(function() {
            console.log('Have permission');
            return messaging.getToken(); 
        })
        .then( function (token) {
            // firebase.database().ref('users/' + this.currentUid + '/notificationTokens/' + token).set(true)
            console.log(token);
        })
        .catch(function(err) {
            console.log(err);
        })
    };

    function removePermission() {
        messaging.deleteToken();
        console.log('token removed')
    };

    return (
        <>
        <Label as='a' color='red' >
            Turn notifications on 
        <Icon className="big" aria-label="turn notifications on" name="envelope outline" onClick={gainPermission} />
        </Label>
        
        <Label as='a' color='green'>
            Turn notifications off 
        <Icon className="big" aria-label="turn notifications off" name="envelope open outline" onClick={removePermission} />
        </Label>
        </>
    )
};

export default Permission;