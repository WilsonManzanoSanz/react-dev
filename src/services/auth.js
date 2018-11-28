import firebase from '../database/firebase';
import store from '../redux/store';
import { addUser, removeUser } from "../redux/actions/actions";
import { hosting , headers } from './constants/constant';

/* const headers = {
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
  'Content-Type': "application/json" 
};
*/
const provider = new firebase.auth.GoogleAuthProvider();
const providerFb = new firebase.auth.FacebookAuthProvider();

class AuthService {
  constructor(){
    this.initializeUser();
    this.user = null;
    this.initializeUser = this.initializeUser.bind(this);
    this.getUserFromServer = this.getUserFromServer.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.fbSignIn = this.fbSignIn.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.loginWithEmailAndPassword = this.loginWithEmailAndPassword.bind(this);
    console.log('Initialize AuthService...');
    this.request = null;
    this.loading = false;
  }

  initializeUser(){
    //firebase.auth().onAuthStateChanged((user) => {
      //if (user) {
        if (localStorage.getItem(`loggedUser`)) {
          this.user = JSON.parse(localStorage.getItem(`loggedUser`));
          headers.Authorization = `Token ${this.user.api_token}`;
          console.log('User is logged', this.user);
          store.dispatch(addUser(this.user));
          //store.dispatch(addUser({name:'Yuye'}));
        }/* else {
          if(!this.loading){
            this.loading = true;
            this.getUserFromServer(user).then(responseUser => {
              if(responseUser.success){
                this.saveUser(responseUser.data);
              }else {
                Promise.reject(responseUser.message);
              }
              this.loading = false;
            }).catch(error => {
              console.error(error);
              this.loading = false;
            });  
          }
        }
      }
    }, error => console.error(error));*/
  }

  googleSignIn(){
    return new Promise((resolve, reject) => {
       firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const newUser = {
          displayName:result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          id: result.user.id,
        };
        this.registerUser(newUser).then(response => console.log(response)).catch(error => console.error(error));
        resolve(result);
        // ...
      }).catch((error)=>{
        // Handle Errors here.
        console.log(error);
        reject(error);
        // ...
      });
    });
  }


  fbSignIn(){
    return new Promise((resolve, reject) => {
       firebase.auth().signInWithPopup(providerFb).then((result) =>{
        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const newUser = {
          displayName:result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          id: result.user.id,
        };
        this.registerUser(newUser).then(response => console.log(response)).catch(error => console.error(error));
        resolve(result);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log(error);
        reject(error);
        // ...
      });
    });
  }
  
  
  loginWithEmailAndPassword(email, password){
     //Promise((resolve, reject) => {
      //firebase.auth().signInWithEmailAndPassword(email, password).then((response)=>{
       return fetch(`${hosting}/api/v1/auth/login`,
            {
          method: 'POST',
          headers: headers,
          body:JSON.stringify({email:email, password:password})
        }).then(response =>  response.json())
      .catch(error => console.error(error));
      /*}).catch(error => {
        console.error(error);
        reject(error);
      });
    });*/
  }

  getUserFromServer(user) {
    return fetch(`${hosting}/api/v1/users/${user.id}`,
        {
      mode: 'cors',
      headers: headers
    }).then(response => response.json());
  }

  registerUser(user) {
    //const newUser = {...user, id: firebase.auth().currentUser.id};
    return fetch(`${hosting}/api/v1/users/`,
        {
      method: 'POST',
      headers: headers,
      body:JSON.stringify(user)
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }
  
  saveUser({establishment, user,establishment_schedule}){
    this.user = user
    if(establishment){
      this.user.establishment = establishment;
      this.user.establishment.schedule = establishment_schedule;
      this.user.establishment.position = {lat: parseFloat(establishment.latitude), lng: parseFloat(establishment.longitude)};
    }
    headers.Authorization = `Token ${user.api_token}`;
    localStorage.setItem(`loggedUser`, JSON.stringify(this.user));
    store.dispatch(addUser(this.user));
  }

  getCurrentUser(){
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (this.user) {
          resolve(this.user);
        } else {
          if (user){
            this.getUserFromServer(firebase.auth().currentUser).then(responseUser => {
            resolve(responseUser);
            }).catch(error => console.error(error));
          } else {
            resolve(null);
          }
        }
      });
    });
  }
  
  getAllTheUsers(name, role = 'admin'){
    const url = new URL(`${hosting}/api/v1/users`);
    const params = { name: name, not_role: role};
    url.search = new URLSearchParams(params)
    console.log(headers);
    return fetch(url,
                {headers:headers,
                }).then(response => response.json());
  }
  
  uploadImage(id, file) {
    // Create a root reference
    return new Promise((resolve, reject) => {
      const  storageRef = firebase.storage().ref().child(`photo/${id}`);
      storageRef.put(file).then((snapshot)=> {
        snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL)).catch(error => reject(error));
      });
    });
  }

  signOut(){
    //return firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      localStorage.removeItem(`loggedUser`);
      store.dispatch(removeUser());
      store.getState();
    /*}).catch((error) => {
      console.error(error);
      // An error happened.
    });*/
  }
} 
const auth = new AuthService();

export {auth};
  