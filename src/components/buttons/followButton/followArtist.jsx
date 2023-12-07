import React from 'react';

import Button from './followButton';
import withUserActions from '../../../hoc/userHoc';

const followArtistBtn = ({ following, followArtist, unfollowArtist }) => {
  const onClick = following ? unfollowArtist : followArtist;
  return <Button  />;
};

export default withUserActions(followArtistBtn);
