import React, { useState } from 'react';
import {
  useRecoilValue,
  useRecoilState
} from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';

import searchTextState from './searchTextState';
import searchTypeState from './searchTypeState';
import artistsState from './artistsState';

const searchArtist = (e, searchText, searchType, setArtists, setResultsToDisplay, setSearchText, setComments) => {
  e.preventDefault();

  setArtists([]);
  setResultsToDisplay([]);
  setComments([]);

  fetch('https://itunes.apple.com/search?term=' + searchText + "&entity=" + searchType + "&limit=200")
    .then(response => response.json())
    .then(response => {
      setArtists(response['results']);
      if (response['results'].length > 0) {
        setResultsToDisplay(response['results'].slice(0, 10));
      }
    })
    .catch(error => console.log(' Error ' + error));

  setSearchText('');
}

const searchViews = (e, collectionName, setComments) => {
  e.preventDefault();

  setComments([]);

  fetch('http://localhost:3001/api/albums/views?collectionName=' + collectionName)
    .then(response => response.json())
    .then(response => {
      setComments(response);

      if(response.length === 0){
        alert("Add the first comment !");
      }
    })
    .catch(error => console.log(' Error ' + error));

}

const addView = (e, collectionName, newComment, setNewComment, setCommentCollectionName) => {
  e.preventDefault();

  fetch('http://localhost:3001/api/albums/add?collectionName=' + collectionName + '&newComment=' + newComment)
    .then(response => response.json())
    .then(response => {
      alert("Comment has been recorded");
    })
    .catch(error => console.log(' Error ' + error));

  setNewComment('');
  setCommentCollectionName('');

}

const updateView = (e, collectionName, oldComment, newComment, liked, setNewComment, setCommentCollectionName) => {
  e.preventDefault();

  fetch('http://localhost:3001/api/albums/update?collectionName=' + collectionName + '&newComment=' + newComment + '&oldComment='+oldComment + '&liked=' + liked)
    .then(response => response.json())
    .then(response => {
      alert("Comment has been updated");
    })
    .catch(error => console.log(' Error ' + error));

  setNewComment('');
  setCommentCollectionName('');

}

const likeUnlike = (e, collectionName, comment, liked) => {
  e.preventDefault();

  const newLiked = liked === "0" ? "1" : "0";

  fetch('http://localhost:3001/api/albums/toggleLike?collectionName=' + collectionName + '&comment=' + comment + '&liked=' + newLiked)
    .then(response => response.json())
    .then(response => {
      alert("Comment has been updated");
    })
    .catch(error => console.log(' Error ' + error));

}


function ArtistList() {

  const [pageToDisplay, setPageToDisplay] = useState(1);
  const [resultsToDisplay, setResultsToDisplay] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentCollectionName, setCommentCollectionName] = useState('');

  const [artists, setArtists] = useRecoilState(artistsState);
  const [searchText, setSearchText] = useRecoilState(searchTextState);

  const searchType = useRecoilValue(searchTypeState);

  const onNewCommentTextChange = (event) => {
    setNewComment(event.target.value);
  };


  const onCommentCollectionNameTextChange = (event) => {
    setCommentCollectionName(event.target.value);
  };

  return (
    <div>

      Search : <button onClick={e => searchArtist(e, searchText, searchType, setArtists, setResultsToDisplay, setSearchText, setComments)} >Search</button>
      <br />
      <br />
      <br />
      <br />

      <div>Album : <input type="text" value={commentCollectionName} onChange={onCommentCollectionNameTextChange} /></div>
      <div>Comment : <input type="text" value={newComment} onChange={onNewCommentTextChange} /></div>
      <div>{searchType === 'album' && <button onClick={e => addView(e, commentCollectionName, newComment, setNewComment, setCommentCollectionName)}>Add New Comment</button>}</div>

      {comments.length > 0 && "Comments"}
      {comments.map((data, i) => {
        return (
          <div style={{ padding: '20px' }} key={i} >
            <div>{data.collectionName}</div>
            <div>{data.comment}</div>
            <div>Liked : {<input type="checkbox" checked={data.liked === "1"} onClick={e => likeUnlike(e, data.collectionName, data.comment, data.liked)} />}</div>
            <div><button onClick={e => updateView(e, data.collectionName, data.comment, newComment, data.liked, setNewComment, setCommentCollectionName)}>Update Comment</button></div>
          </div>
        )
      })}

      <div>
        <div>
          {artists != null && artists.length > 0 && "Records"}

          <InfiniteScroll
            dataLength={resultsToDisplay.length}
            next={() => {
              setResultsToDisplay(artists.slice(0, (pageToDisplay + 1) * 10));
              setPageToDisplay(pageToDisplay + 1);
              console.log("next pageToDisplay", pageToDisplay);
              console.log('artists.length', artists.length);
              console.log('resultsToDisplay.length', resultsToDisplay.length);
            }
            }
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            hasMore={true}
            loader={<h4>No record found...</h4>}
            scrollableTarget="scrollableDiv"
          >
            {resultsToDisplay.map((data, i) => {
              return (
                <div style={{ padding: '20px' }} key={i} >
                  <div>{searchType === 'album' && data.collectionName}</div>
                  <div>{data.artistName}</div>
                  <div>{data.primaryGenreName}</div>
                  <div>{data.artistId}</div>
                  <div>{searchType === 'album' && <button onClick={e => searchViews(e, data.collectionName, setComments)}>View Comments</button>}</div>
                </div>
              )
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default ArtistList;