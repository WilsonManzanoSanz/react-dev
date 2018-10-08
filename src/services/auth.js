import firebase from '/database/firebase';
import store from '/redux/store';
import { addUser } from "/redux/actions/actions";
const headers = {
  'Access-Control-Allow-Origin':'*',
  'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET, OPTIONS',
  'Content-Type': "application/json" 
};

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
    console.log('Initialize AuthService...');
    this.request = null;
    this.loading = false;
  }

  initializeUser(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (localStorage.getItem(`user_${user.uid}`)) {
          this.user = JSON.parse(localStorage.getItem(`user_${user.uid}`));
          console.log('User is logged', this.user);
          store.dispatch(addUser(this.user));
        } else {
          if(!this.loading){
            this.loading = true;
            const newUser = { 
              displayName : user.displayName,
              email: user.email,
              uid: user.uid
            };
            console.log('loading', this.loading);
            this.getUserFromServer(user).then(responseUser => {
              if(responseUser.success){
                console.log('User is logged', this.user);
                this.user = responseUser.data;
                localStorage.setItem(`user_${user.uid}`, JSON.stringify(responseUser.data));
                store.dispatch(addUser(this.user));
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
    }, error => console.error(error));
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
          uid: result.user.uid,
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
          uid: result.user.uid,
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

  getUserFromServer(user) {
    return fetch(`https://backend-react-wilsonmanzanosanz244290.codeanyapp.com/api/users/${user.uid}`,
        {
      mode: 'cors',
      headers: headers
    }).then(response => response.json());
  }

  registerUser(user) {
    const newUser = {...user, uid: firebase.auth().currentUser.uid};
    return fetch(`https://backend-react-wilsonmanzanosanz244290.codeanyapp.com/api/users/`,
        {
      method: 'POST',
      headers: headers,
      body:JSON.stringify(newUser)
    }).then(response => response.json()).catch(error=> console.error(error));
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

  signOut(){
    return firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      localStorage.getItem(`user_${this.user.uid}`);
    }).catch((error) => {
      console.errror(error);
      // An error happened.
    });
  }
} 
const auth = new AuthService();

export {auth};
  