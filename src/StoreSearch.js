import React from 'react';
import {
    useRecoilState
} from 'recoil';

import searchTextState from './searchTextState';
import searchTypeState from './searchTypeState';
import itemsVisibleState from './itemsVisibleState';

function StoreSearch() {

    const [searchText, setSearchText] = useRecoilState(searchTextState);
    const [searchType, setSearchType] = useRecoilState(searchTypeState);
    const [itemsVisible, setItemsVisible] = useRecoilState(itemsVisibleState);

    const onSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const onSearchTypeChange = (event) => {
        setItemsVisible(false);
        setSearchType(event.target.value);
    };

    return (
        <div>
            Search Type : <select value={searchType} onChange={onSearchTypeChange}>
                <option value="musicArtist">Music Artist</option>
                <option value="album">Album</option>
                <option value="song">Song</option>
            </select>
            <br /><br />
            Search Text : <input type="text" value={searchText} onChange={onSearchTextChange} />
        </div>
    );
}

export default StoreSearch;