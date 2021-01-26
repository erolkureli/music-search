import React from 'react';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import searchTextState from './searchTextState';
import searchTypeState from './searchTypeState';
import itemsVisibleState from './itemsVisibleState';
import SearchForm from './SearchForm';


export const SearchFormRow = styled.div`
    padding: 10px;
    background-color: #c4edf7;
`;

export const Label = styled.label`
    width: 120px;
    display: inline-block;
`;

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
        <>
        <SearchForm searchType={searchType} onSearchTypeChange={onSearchTypeChange} searchText={searchText} onSearchTextChange={onSearchTextChange}/>
            {/*<SearchFormRow>
                <Label>
                    Search Type : 
                </Label>
                <select value={searchType} onChange={onSearchTypeChange}>
                    <option value="musicArtist">Music Artist</option>
                    <option value="album">Album</option>
                    <option value="song">Song</option>
                </select>
            </SearchFormRow>
            <SearchFormRow>
                <Label>
                    Search Text :
                </Label>
                <input type="text" value={searchText} onChange={onSearchTextChange} />
            </SearchFormRow>*/}
        </>
    );
}

export default StoreSearch;