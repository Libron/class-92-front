import React from 'react';

import imageNotAvailable from '../../../assets/images/noImg.png';
import {apiURL} from "../../../constants";

const AvatarThumbnail = props => {
  let image = imageNotAvailable;

  if (props.image) {
    image = apiURL + '/uploads/' + props.image;
  }

  return <img src={image} className="avatar-thumbnail" alt="Product" />;
};

export default AvatarThumbnail;