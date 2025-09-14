import React from "react";
import style from "../NotFound/NotFound.module.css";
import image from "../../assets/img.png";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div
        className={`${style.body} justify-content-center align-items-center vh-100`}
      >
        <div className="container h-100 justify-content-center align-content-center align-items-center">
          <div className="row  align-items-center">
            <div className="col-md-6">
              <div className="photo">
                <img src={image} className=" img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="NotFound-text text-center">
                <button className={`${style.btn} btn `}>
                  <Link className="text-reset text-decoration-none" to={"/"}>Back To Home Page</Link>
                </button>
                <h1 className="text-white">Uh Oh! Error 404</h1>
                <p className=" text-secondary">
                  It looks like you got lost far enough, don’t worry, try
                  returning to the homepage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
