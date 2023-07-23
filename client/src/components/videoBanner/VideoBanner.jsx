import "./VideoBanner.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const VideoBanner = () => {
  return (
    <div className="videoBanner">
      <div className="container">
        <div className="item1">
          <h1>A whole world of freelance talent at your fingertips.</h1>

          {/* 1.  */}
          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Stick to your budget
          </div>
          <p>
            Find the right service for every price point. No hourly rates, just project-based pricing.
          </p>

          {/* 2. */}
          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Get quality work done quickly
          </div>
          <p>
            Hand your project over to a talented freelancer in minutes, get long-lasting results.
          </p>

          {/* 3. */}
          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Pay when you are happy
          </div>
          <p>
            Upfront quotes mean no surprises. Payments only get released when you approve.
          </p>

          {/* 4. */}
          <div className="title">
            <FontAwesomeIcon icon={faCheckCircle} />
            Count on 24/7 support
          </div>
          <p>
            Our round-the-clock support team is available to help anytime, anywhere.
          </p>
        </div>

        <div className="item2">
          <video src="./img/video.mp4" controls poster="https://s.yimg.com/ny/api/res/1.2/TQvaSl3CWGiNagHc.I7OIA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/gobankingrates_644/103bde22e453e90b226153ae0529a69b">

          </video>
        </div>
      </div>
    </div>
  )
}

export default VideoBanner