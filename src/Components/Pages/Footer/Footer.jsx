import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css"; 

const teamMembers = [
  { name: "Esraa Mohamed", linkedin: "https://www.linkedin.com/in/esraa-mohamed-955222320/" },
  { name: "Eman Samy", linkedin: "https://www.linkedin.com/in/eman-samy-46566a366/" },
  { name: "Fatma Adel", linkedin: "https://www.linkedin.com/in/FatemaAdel/" },
  { name: "Marwa Bassuoni", linkedin: "https://www.linkedin.com/in/marwa-atlam-9a7369359/" },
  { name: "Shahd Saied", linkedin: "https://www.linkedin.com/in/shahd-saied/" },

];

const Footer = () => {
  return (
    <footer className={`${styles.footer} pt-5`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className={styles.textMint}>MovieStan</h5>
            <p className={styles.about}>
              A simple Movie App built with React that allows users to browse movies, search, and view detailed information. Designed with a clean UI using Context API and React Router for smooth navigation
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className={styles.textMint}>Other Links</h5>
            <ul className="list-unstyled">
              <li><Link className={styles.footerLink} to="/movies">Movies</Link></li>
              <li><Link className={styles.footerLink} to="/tv-show">TV Shows</Link></li>
              <li><Link className={styles.footerLink} to="/watch-list">Favourite</Link></li>
            </ul>
          </div>


          <div className="col-md-4 mb-4">
            <h5 className={styles.textMint}>Our Team</h5>
            <ul className="list-unstyled">
              {teamMembers.map((member, idx) => (
                <li key={idx}>
                  <a
                    className={styles.footerLink}
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {member.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
         &copy; 2025 MovieStan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;