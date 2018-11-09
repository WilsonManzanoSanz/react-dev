import { hosting, headers } from './constants/constant';

class PlaceService {
  constructor(){
    this.postPlace = this.postPlace.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    console.log('Initialize PlaceService...');
  }
  
  postPlace(place) {
    return fetch(`${hosting}/api/v1/establishments`,
        {
      method: 'POST',
      headers: headers,
      body:JSON.stringify(place)
    }).then(response => response.json()
    ).catch(error=> console.error(error));
  }

  getPlaces() {
    return fetch(`${hosting}/api/v1/establishments`,
        {
      mode: 'cors',
      headers: headers
    }).then(response => response.json());
  }
  
}

const placeService = new PlaceService();

export {placeService};
  