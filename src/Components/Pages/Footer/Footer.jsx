import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import styles from "../Footer/Footer.module.css";

const teamMembers = [
  {
    name: "Esraa Mohamed",
    linkedin: "https://www.linkedin.com/in/esraa-mohamed-955222320/",
  },
  {
    name: "Eman Samy",
    linkedin: "https://www.linkedin.com/in/eman-samy-46566a366/",
  },
  {
    name: "Fatma Adel",
    linkedin: "https://www.linkedin.com/in/fatma-adel-86aaa3382",
  },
  {
    name: "Marwa Atlam",
    linkedin: "https://www.linkedin.com/in/marwa-atlam-9a7369359/",
  },
  { name: "Shahd Saied", linkedin: "https://www.linkedin.com/in/shahd-saied/" },
=======
import styles from "./footer.module.css"; 

const teamMembers = [
  { name: "Esraa Mohamed", linkedin: "https://www.linkedin.com/in/esraa-mohamed-955222320/" },
  { name: "Eman Samy", linkedin: "https://www.linkedin.com/in/eman-samy-46566a366/" },
  { name: "Fatma Adel", linkedin: "https://www.linkedin.com/in/FatemaAdel/" },
  { name: "Marwa Bassuoni", linkedin: "https://www.linkedin.com/in/marwa-atlam-9a7369359/" },
  { name: "Shahd Saied", linkedin: "https://www.linkedin.com/in/shahd-saied/" },

>>>>>>> origin/eman
];

const Footer = () => {
  return (
    <footer className={`${styles.footer} pt-5`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className={styles.textMint}>MovieStan</h5>
            <p className={styles.about}>
<<<<<<< HEAD
              A simple Movie App built with React that allows users to browse
              movies, search, and view detailed information. Designed with a
              clean UI using Context API and React Router for smooth navigation
=======
              A simple Movie App built with React that allows users to browse movies, search, and view detailed information. Designed with a clean UI using Context API and React Router for smooth navigation
>>>>>>> origin/eman
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className={styles.textMint}>Other Links</h5>
            <ul className="list-unstyled">
<<<<<<< HEAD
              <li>
                <Link className={styles.footerLink} to="/movies">
                  Movies
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/tv-show">
                  TV Shows
                </Link>
              </li>
              <li>
                <Link className={styles.footerLink} to="/watch-list">
                  Favourite
                </Link>
              </li>
            </ul>
          </div>

=======
              <li><Link className={styles.footerLink} to="/movies">Movies</Link></li>
              <li><Link className={styles.footerLink} to="/tv-show">TV Shows</Link></li>
              <li><Link className={styles.footerLink} to="/watch-list">Favourite</Link></li>
            </ul>
          </div>

          
>>>>>>> origin/eman
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
<<<<<<< HEAD
        &copy; 2025 MovieStan. All rights reserved.
=======
         &copy; 2025 MovieStan. All rights reserved.
>>>>>>> origin/eman
      </div>
    </footer>
  );
};

export default Footer;
