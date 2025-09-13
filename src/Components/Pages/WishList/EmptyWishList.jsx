import React from "react";
import crackedHeart from "../../../assets/cracked heart.svg";
import style from "./EmptyWishList.module.css";

function EmptyWishList() {
  return (
    <div className={`${style.emptyWishlistContainer} text-center d-flex flex-column justify-content-center align-items-center`}>
      <div className={`${style.emptyWishlistContent} `}>

        <img src={crackedHeart} alt="cracked-heart" className={`${style.icon} `}/>
        <p className={`${style.emptyText}`}>Favourite is Empty..</p>
      </div>
    </div>
  );
}

export default EmptyWishList;


