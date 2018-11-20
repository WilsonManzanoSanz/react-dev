import { hosting, headers, host } from './constants/constant';
import firebase from '../database/firebase';

class PlaceService {
  constructor(){
    this.postPlace = this.postPlace.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.getPlace = this.getPlace.bind(this);
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
          {
           method:'GET', 
           headers: headers,
          }).then(response => response.json())
      .then(responseJSON => {
        const mapResponse = responseJSON.data.map(value => {
        value.latitude = parseFloat(value.latitude);
        value.longitude = parseFloat(value.longitude);
          return value;
        });
        return mapResponse;
      })
    .catch(error => console.error(error));
  }
  
   getPlace(id) {
    return fetch(`${hosting}/api/v1/establishments/${id}`, 
          {
      method:'GET',
      headers: headers,
      }).then(response => response.json())
       .then(value => {
        value.data.latitude = parseFloat(value.data.latitude);
        value.data.longitude = parseFloat(value.data.longitude);
        return value;
    })
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
  