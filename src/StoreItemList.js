import React, { useState } from 'react';
import {
  useRecoilValue,
  useRecoilState
} from 'recoil';
import InfiniteScroll from 'react-infinite-scroll-component';

import searchTextState from './searchTextState';
import searchTypeState from './searchTypeState';
import itemsVisibleState from './itemsVisibleState';
import itemsState from './itemsState';

const searchItem = (e, searchText, searchType, setItems, setResultsToDisplay, setSearchText, setComments, setItemsVisible) => {
  e.preventDefault();

  if (searchText.trim() === "") {
    alert("Please enter what you want to search for");
    setSearchText("");
    return false;
  }

  setItems([]);
  setResultsToDisplay([]);
  setComments([]);

  fetch('https://itunes.apple.com/search?term=' + searchText + "&entity=" + searchType + "&limit=200")
    .then(response => response.json())
    .then(response => {
      setItems(response['results']);
      if (response['results'].length > 0) {
        setResultsToDisplay(response['results'].slice(0, 10));
      }
    })
    .catch(error => console.log(' Error ' + error));

  setSearchText('');
  setItemsVisible(true);
}

const searchViews = (e, collectionName, setComments) => {
  e.preventDefault();

  setComments([]);

  fetch('http://localhost:3001/api/albums/views?collectionName=' + collectionName)
    .then(response => response.json())
    .then(response => {
      setComments(response);

      if (response.length === 0) {
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

  fetch('http://localhost:3001/api/albums/update?collectionName=' + collectionName + '&newComment=' + newComment + '&oldComment=' + oldComment + '&liked=' + liked)
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


function StoreItemList() {

  const [pageToDisplay, setPageToDisplay] = useState(1);
  const [resultsToDisplay, setResultsToDisplay] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentCollectionName, setCommentCollectionName] = useState('');

  const [items, setItems] = useRecoilState(itemsState);
  const [searchText, setSearchText] = useRecoilState(searchTextState);
  const [itemsVisible, setItemsVisible] = useRecoilState(itemsVisibleState);

  const searchType = useRecoilValue(searchTypeState);

  const onNewCommentTextChange = (event) => {
    setNewComment(event.target.value);
  };


  const onCommentCollectionNameTextChange = (event) => {
    setCommentCollectionName(event.target.value);
  };

  return (
    <div>

      Search : <button onClick={e => searchItem(e, searchText, searchType, setItems, setResultsToDisplay, setSearchText, setComments, setItemsVisible)} >Search</button>
      <br />
      <br />
      <br />
      <br />

      { itemsVisible &&
        <div>
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
              {items != null && items.length > 0 && "Records"}

              <InfiniteScroll
                dataLength={resultsToDisplay.length}
                next={() => {
                  setResultsToDisplay(items.slice(0, (pageToDisplay + 1) * 10));
                  setPageToDisplay(pageToDisplay + 1);
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
                      <div>{searchType === 'album' && data.collectionName && <button onClick={e => searchViews(e, data.collectionName, setComments)}>View Comments</button>}</div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </div>
          </div>
        </div>

      }

    </div>
  );
}

export default StoreItemList;