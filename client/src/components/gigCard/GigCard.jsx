import { Link } from "react-router-dom"
import "./GigCard.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { FaStar } from "react-icons/fa"
import { useQuery } from "react-query"
import newRequest from "../../utils/createRequest"

const GigCard = ({ item }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest
        .get(
          `/users/${item.userId}`
        ).then((res) => {
          return res.data
        })
  })

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />

        <div className="info">
          {isLoading ? (
            "Loadind"
          ) : error ? (
            "Something Went Wrong"
          ) : (
            <div className="user">
              <img src={data.img || "img/dummy_profile.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}

          <p className="desc">{item.title}</p>

          <div className="star">
            <FaStar className="icon" />
            <span>{!isNaN(item.totalStars / item.starNumber) ? Math.round(item.totalStars / item.starNumber) : 0}</span>
          </div>
        </div>

        <div className="line"></div>
        <div className="details">
          <FontAwesomeIcon icon={faHeart} />
          <div className="price">
            <span>Starting At</span>
            <h2>₹{item.price}</h2>
          </div>
        </div>
      </div>
    </Link >
  )
}

export default GigCard