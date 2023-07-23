import "./ImgBanner.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const VideoBanner = () => {
  return (
    <div className="imgBanner">
      <div className="container">
        <div className="item1">
          <h1>SkilBazaar Business</h1>
          <h1>A solution built for business</h1>
          <p>Upgrade to a curated experience to access vetted talent and exclusive tools</p>

          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Talent matching
          </div>

          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Dedicated account management
          </div>

          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Team collaboration tools
          </div>

          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Business payment solutions
          </div>

          <button>Explore SkilBazaar Business</button>
        </div>

        <div className="item2">
          <img src="./img/imgBanner.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default VideoBanner