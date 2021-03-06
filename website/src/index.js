import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from "./store/reducers/rootReducer";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import 'firebase/auth'
import 'firebase/firestore'
import { getFirestore, reduxFirestore} from 'redux-firestore';
import { reactReduxFirebase, getFirebase} from "react-redux-firebase";
import firebaseConfig from './config/firebaseConfig'
import * as firebase from 'firebase'

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebaseConfig),
        reactReduxFirebase(firebase,firebaseConfig),
        reactReduxFirebase(firebase, {rrfConfig, attachAuthIsReady: true})
    )
);
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}><App/></Provider>,
        document.getElementById('root')
    )
});

