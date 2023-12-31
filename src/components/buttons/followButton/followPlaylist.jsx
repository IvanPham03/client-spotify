import React from 'react';

import Button from './followButton';
import withUserActions from '../../../hoc/userHoc';

const followPlaylistBtn = ({ following, followPlaylist, unfollowPlaylist }) => {
  const onClick = following ? unfollowPlaylist : followPlaylist;
  return <Button  />;
};

export default withUserActions(followPlaylistBtn);
