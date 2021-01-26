import React from 'react';

import StoreSearch from './StoreSearch';
import StoreItemList from './StoreItemList';

function MusicStore() {
  return (
    <div>
      <StoreSearch/>
      <StoreItemList/>
    </div>
  );
}

export default MusicStore;