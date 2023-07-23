import { FaCheck, FaClock, FaStar } from "react-icons/fa"
import "./Gig.scss"
import { Slider } from "infinite-react-carousel"
import { useQuery } from "react-query"
import newRequest from "../../utils/createRequest"
import { Link, useParams } from "react-router-dom"
import Reviews from "../../components/reviews/Reviews"

const Gig = () => {

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(
        `/gigs/single/${id}`
      ).then((res) => {
        return res.data
      })
  })

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest
        .get(
          `/users/${userId}`
        ).then((res) => {
          return res.data
        }),
    enabled: !!userId,
  })

  return (
    <div className="gig">
      {isLoading ? (
        "Loading"
      ) : error ? (
        "Something Went Wrong"
      ) : <div className="container">
        <div className="left">
          <span className="breadCrumbs">
            SkillBazaar {">"} Graphics & Design {">"} Image Generation
          </span>
          <h1>{data.title}</h1>

          {isLoadingUser ? (
            "Loading"
          ) : (
            errorUser
          ) ? (
            "SomeThing Went Wrong"
          ) : <div className="user">
            <img className="pp" src={dataUser.img || "/img/dummy_profile.jpg"} alt="" />
            <span>{dataUser.username} |</span>
            <div className="stars">
              {/* {Array(Math.round(data.totalStars / data.starNumber))
                .fill()
                .map((item, i) => (
                  <FaStar key={i} />
                ))
              } */}

              {Math.round(data.totalStars / data.starNumber) > 0
                ? Array(Math.round(data.totalStars / data.starNumber))
                  .fill()
                  .map((item, i) => (
                    <FaStar key={i} />
                  ))
                : "No star rating available"
              }

              <span>
                {!isNaN(data.totalStars / data.starNumber) ? Math.round(data.totalStars / data.starNumber) : 0}
              </span>
            </div>
          </div>}

          <Slider slidesToShow={1} className="slider">
            {data.images.map((img) => (
              <img src={img} key={img} />
            ))}
          </Slider>

          <h3>About this gig</h3>
          <p>
            {data.desc}
          </p>

          {isLoadingUser ? (
            "Loading"
          ) : (
            errorUser
          ) ? (
            "SomeThing Went Wrong"
          ) : <div className="seller">
            <h2>About the Seller</h2>
            <div className="user">
              <img src={dataUser.img || "/img/dummy_profile.jpg"} alt="" />
              <div className="info">
                <span>{dataUser.username}</span>
                <div className="stars">
                  {/* {Array(Math.round(data.totalStars / data.starNumber))
                    .fill()
                    .map((item, i) => (
                      <FaStar key={i} />
                    ))
                  } */}

{Math.round(data.totalStars / data.starNumber) > 0
    ? Array(Math.round(data.totalStars / data.starNumber))
        .fill()
        .map((item, i) => (
          <FaStar key={i} />
        ))
    : "No star rating available"
  }

                  <span>
                    {!isNaN(data.totalStars / data.starNumber) ? Math.round(data.totalStars / data.starNumber) : 0}
                  </span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>

            <div className="box">
              <div className="items">

                <div className="item">
                  <div className="title">From</div>
                  <div className="desc">{dataUser.country}</div>
                </div>

                <div className="item">
                  <div className="title">Member Since</div>
                  <div className="desc">May 2019</div>
                </div>

                <div className="item">
                  <div className="title">Avg. Response Time</div>
                  <div className="desc">4 hours</div>
                </div>

                <div className="item">
                  <div className="title">Last delivery</div>
                  <div className="desc">about 6 hours</div>
                </div>

                <div className="item">
                  <div className="title">Language</div>
                  <div className="desc">English, Hindi</div>
                </div>
              </div>

              <hr />
              <p>
                {dataUser.desc}
              </p>
            </div>
          </div>}

          <Reviews gigId={id} />

        </div>

        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>₹ {data.price}</h2>
          </div>

          <p>{data.shortDesc}</p>
          <div className="details">
            <div className="item">
              <FaClock />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
          </div>

          <div className="features">

            {data.features.map((feature) => (
              <div className="item" key={feature}>
                <FaCheck className="check" />
                <span>{feature}</span>
              </div>
            ))}

          </div>
          <Link to={`/pay/${id}`}>
            <button>Continue</button>
          </Link>
        </div>
      </div>}
    </div>
  )
}

export default Gig