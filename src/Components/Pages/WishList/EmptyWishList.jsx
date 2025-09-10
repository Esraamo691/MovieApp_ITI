import React from "react";
import HeartIcon from "../../../assets/heart.svg";
import BrokeHeart from "../../../assets/BrokeHeart.svg";
import "./EmptyWishList.css";

function EmptyWishList() {
  return (
    <div className="empty-wishlist-container">

      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 fixed-top w-100 empty-wishlist-header"
      >
        <h5 className="m-0 fw-bold">Movie App</h5>
        <div className="d-flex align-items-center gap-1">
          <img 
            src={HeartIcon} 
            alt="heart-icon" 
            width="20"
            height="20" 
          />
          <span>Favourite</span>
        </div>
      </header>
       
      {/* Title */}
      <h3 className="fw-bold text-start px-4">
        Watch list
      </h3>
 
      {/* Content */}
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center empty-wishlist-content"
      >
        <img
          src={BrokeHeart}
          alt="empty-heart"
          width="212"
        />
        {/* <i class="fa-solid fa-heart-crack"></i> */}
        <p className="mt-3 fs-4">Favourite is Empty...</p>

        <button 
          className="btn btn-warning mt-3 px-5 w-25 rounded-3 empty-wishlist-button"
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default EmptyWishList;


