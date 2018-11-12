import { hosting, headers, host } from './constants/constant';
import firebase from '../database/firebase';

class PlaceService {
  constructor(){
    this.postPlace = this.postPlace.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    console.log('Initialize PlaceService...');
  }
  
  postPlace(place) {
    return fetch(`${hosting}/api/v1/establishments/`,
        {
      method: 'POST',
      headers: headers,
      body:JSON.stringify(place)
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }

  getPlaces() {
    return fetch(`${hosting}/api/v1/establishments/`, 
          {method:'GET'}).then(response => response.json())
    .catch(error => console.error(error));
  }
  
  uploadImage(uid, file) {
    // Create a root reference
    return new Promise((resolve, reject) => {
      const  storageRef = firebase.storage().ref().child(`place/${uid}/` + new Date().toString());
      storageRef.put(file).then((snapshot)=> {
        snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL)).catch(error => reject(error));
      });
    });
  }
  
}

const placeService = new PlaceService();

export {placeService};
  