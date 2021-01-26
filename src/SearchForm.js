import React from 'react';
import { SearchFormRow, Label } from './StoreSearch';

function SearchForm(props) {

    return (
        <>
            <SearchFormRow>
                <Label>
                    Search Type : 
                </Label>
                <select value={props.searchType} onChange={props.onSearchTypeChange}>
                    <option value="musicArtist">Music Artist</option>
                    <option value="album">Album</option>
                    <option value="song">Song</option>
                </select>
            </SearchFormRow>
            <SearchFormRow>
                <Label>
                    Search Text :
                </Label>
                <input type="text" value={props.searchText} onChange={props.onSearchTextChange} />
            </SearchFormRow>
        </>
    );
}

export default SearchForm;