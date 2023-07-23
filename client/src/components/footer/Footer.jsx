import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss"
import { FaFacebook, FaGlobe, FaInstagram, FaLinkedin, FaRupeeSign, FaTwitter } from "react-icons/fa";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">

          {/* 1. */}
          <div className="item">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Digital Marketing</span>
            <span>Writing & Translation</span>
            <span>Video & Animation</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Data</span>
            <span>Business</span>
            <span>Lifestyle</span>
            <span>Photography</span>
            <span>End-to-End Projects</span>
            <span>Sitemap</span>
          </div>

          {/* 2. */}
          <div className="item">
            <h2>About</h2>
            <span>Careers</span>
            <span>Press & News</span>
            <span>Partnerships</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Claims</span>
            <span>Investor Relations</span>
          </div>

          {/* 3. */}
          <div className="item">
            <h2>Support</h2>
            <span>Help & Support</span>
            <span>Trust & Safety</span>
            <span>Selling on SkilBazaar</span>
            <span>Buying on SkilBazaar</span>
            <span>SkilBazaar Guides</span>
          </div>

          {/* 4. */}
          <div className="item">
            <h2>Community</h2>
            <span>Customer Success Stories</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blogs</span>
            <span>Influencers</span>
            <span>Affiliates</span>
            <span>Podcast</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>

          {/* 5. */}
          <div className="item">
            <h2>More From SkilBazaar</h2>
            <span>SkilBazaar Enterprise</span>
            <span>SkilBazaar Business</span>
            <span>SkilBazaar Pro</span>
            <span>SkilBazaar Logo Maker</span>
            <span>Get Inspired</span>
            <span>SkilBazaar Select</span>
            <span>ClearVoice</span>
            <span>SkilBazaar Workspace</span>
            <span>Learn</span>
            <span>Working Not Working</span>
          </div>
        </div>

        <hr />
        <div className="bottom">
          <div className="left">
            <h2>SkilBazaar®</h2>
            <span>© SkilBazaar International Ltd. 2023</span>
          </div>

          <div className="right">
            <div className="social">
              <a href="https://twitter.com/dhiren_patil_03" target="_blank" rel="noreferrer"><FaTwitter className="handle" /></a>
              <a href="https://www.linkedin.com/in/dhirenpatil44/" target="_blank" rel="noreferrer"><FaLinkedin className="handle" /></a>
              <a href="https://www.instagram.com/dhiren_patil_03/" target="_blank" rel="noreferrer"><FaInstagram className="handle" /></a>
              <a href=""><FaFacebook className="handle" /></a>
            </div>

            <div className="link">
              <FaGlobe />
              <span>English</span>
            </div>

            <div className="link">
              <FaRupeeSign />
              <span>INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer