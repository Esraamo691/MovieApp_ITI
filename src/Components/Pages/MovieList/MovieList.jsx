import React from "react";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";
import img5 from "../../../assets/img5.jpg";
import img6 from "../../../assets/img6.jpg";
import style from '../MovieList/MovieList.module.css'
export default function MovieList() {
  return (
    <>
      <div className="container vh-100 bg-warning-subtle mt-5">
        <div className="row">
          <div className="col-lg-2">
            <div className="card bg-white">
              <div className="image">
                <img src={img1} className=" w-100 img-fluid" />
              </div>
              <div className="down d-flex">
                <div className="text">
                  <p className=" fw-bold m-0">Lorem, ipsum.</p>
                  <p>2-6-2025</p>
                  
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
