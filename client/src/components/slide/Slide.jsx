import { Slider } from "infinite-react-carousel"
import "./Slide.scss"

const Slide = ({children, slidesToShow}) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider dots slidesToShow={slidesToShow}>
          {children}
        </Slider>
      </div>
    </div>
  )
}

export default Slide