import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {UserHeader} from './../../../components/auth/user-header';

const users = [
  {
    displayName:'Wilson Manzano',
    email:'wilson.manzanosanz@gmail.com',
    photoURL:'https://www.cmgsite.com/wp-content/uploads/2015/12/SQUARE25-600x600.jpg',
    uid:'akomfnaOFANPfnao'
  },
  {
    displayName:'Fashion Fever',
    email:'fashion@gmail.com',
    photoURL:'https://www.maximus.com/sites/all/themes/maximus/assets/images/homepage-image.jpg',
    uid:'akomfnaOFANPfnao'
  },
  {
    displayName:'Gabriel Coronado',
    email:'gabriel@gmail.com',
    photoURL:'https://cdn.images.express.co.uk/img/dynamic/galleries/x701/389530.jpg',
    uid:'akomfnaOFANPfnao'
  },
  {
    displayName:'El Kausa ',
    email:'thekausa2018@gmail.com',
    photoURL:'https://s.hdnux.com/photos/76/44/35/16402286/3/920x920.jpg',
    uid:'akomfnaOFANPfnao'
  },
];

class UserProfiles extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    const userCards = users.map((value) => {
      return  <div className="card"><UserHeader user={value}/></div>
    });
    return (
      <div className="center-card">
          <h3>Choose an staff</h3>
          {userCards}
      </div>
    );
  }
}

UserProfiles.propTypes = {
  user: PropTypes.object
};

export {UserProfiles};