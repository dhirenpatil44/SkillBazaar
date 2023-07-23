import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import "./Review.scss"
import { useQuery } from "react-query"
import newRequest from "../../utils/createRequest.js"

const Review = ({ review }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(
        `/users/${review.userId}`
      ).then((res) => {
        return res.data
      })
  })

  return (
    <div className="review">

      {isLoading
        ? "Loading"
        : error
          ? "Something Went Wrong"
          : (
            <div className="user">
              <img src={data.img || "/img/dummy_profile.jpg"} className="pp" />
              <div className="info">
                <span>{data.username}</span>
                <div className="country">
                  <span>{data.country}</span>
                </div>
              </div>
            </div>
          )}

      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, ind) => (
            <FaStar key={ind} />
          ))
        }

        <span>{review.star}</span>
      </div>

      <p>
        {review.desc}
      </p>

      <div className="helpful">
        <span>Helpful?</span>
        <FaThumbsUp className="like" />
        <p>Yes</p>
        <FaThumbsDown className="like" />
        <p>No</p>
      </div>
      <hr />
    </div>
  )
}

export default Review