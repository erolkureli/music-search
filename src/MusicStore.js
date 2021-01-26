import React from 'react';

import ArtistSearch from './ArtistSearch';
import ArtistList from './ArtistList';

function MusicStore() {
  return (
    <div>
      <ArtistSearch/>
      <ArtistList/>
    </div>
  );
}

export default MusicStore;