import { hosting, headers,  } from './constants/constant';
import firebase from '../database/firebase';

class PlaceService {
  constructor(){
    this.postPlace = this.postPlace.bind(this);
    this.putPlace = this.putPlace.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.getPlace = this.getPlace.bind(this);
    this.relationPlace = this.relationPlace.bind(this);
    this.postPlaceSchedule = this.postPlaceSchedule.bind(this);
    this.converToAMFM = this.converToAMFM.bind(this);
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
  
  putPlace(place) {
    return fetch(`${hosting}/api/v1/establishments/${place.id}`,
        {
      method: 'PUT',
      headers: headers,
      body:JSON.stringify(place)
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }

  getPlaces(pageNum) {
    const url = new URL(`${hosting}/api/v1/establishments/`);
    const params = { page: pageNum};
    url.search = new URLSearchParams(params);
    return fetch(url, 
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
  
  postPlaceSchedule(days, placeId){
    return new Promise((resolve, reject) => {
      let postDays = {schedule:[], establishment_id:placeId};
      const daysArray = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      days = this.converToAMFM(days);
      for (let i = 0; i < 5; i++) {
        postDays.schedule.push({day:daysArray[i], start_hour:`${days.week_start}:00:00`, end_hour:`${days.week_end}:00:00`});
      }
      postDays.schedule.push({day:daysArray[5], start_hour:`${days.saturday_start}:00:00`, end_hour:`${days.saturday_end}:00:00`});
      postDays.schedule.push({day:daysArray[6], start_hour:`${days.holidays_start}:00:00`, end_hour:`${days.holidays_end}:00:00`});
      fetch(`${hosting}/api/v1/apertures/`, {
        method:'POST',
        headers:headers,
        body:JSON.stringify(postDays)
      }).then( response => resolve(response.json()))
      .catch(error => console.error(error));
    });
  }
  
  converToAMFM(days){
    days.week_start = parseInt(days.week_start) + 12;
    days.week_end = parseInt(days.week_end) + 12;
    days.saturday_start = parseInt(days.saturday_start) + 12;
    days.saturday_end = parseInt(days.saturday_end) + 12;
    days.holidays_start = parseInt(days.holidays_start) + 12;
    days.holidays_end = parseInt(days.holidays_end) + 12;
    return days;
  }
  
  relationPlace(userId, placeId, workerVp = 1){
    return fetch(`${hosting}/api/v1/relations/`,
        {
      method: 'POST',
      headers: headers,
      body:JSON.stringify({user_id: userId, establishment_id: placeId, relation_type_vp: workerVp})
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }
  
  getInfoFromRelation(relationId){
    return fetch(`${hosting}/api/v1/relations/${relationId}`,
        {
      method: 'GET',
      headers: headers,
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }
  
  deleteRelation(user, place){
    const url = new URL(`${hosting}/api/v1/relations/`);
    const params = { user: user, place: place};
    url.search = new URLSearchParams(params);
    return fetch(url,
        {
      method: 'DELETE',
      headers: headers,
    }).then(response => response.json()
    ).catch(error=> console.error(error));
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
  