import { Link, useLocation, useNavigate } from "react-router-dom"
import "./Navbar.scss"
import { useEffect, useState } from "react"
import newRequest from "../../utils/createRequest"

const Navbar = () => {

  const navigate = useNavigate()

  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, [])

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const handleLogOut = async () => {
    try {
      await newRequest.post("auth/logout");
      localStorage.setItem("currentUser", null)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">SkillBazaar</span>
            <span className="dot">.</span>
          </Link>
        </div>

        <div className="links">
          <span>Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}

          {!currentUser &&
            <Link to="/login">
              <button className={active || pathname !== "/" ? "btn1" : "btn"}>Sign In</button>
            </Link>
          }

          {!currentUser &&
            <Link to="register">
              <button className={active || pathname !== "/" ? "btn1" : "btn"}>Join</button>
            </Link>
          }

          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser?.img || "/img/dummy_profile.jpg"} />
              <span>{currentUser?.username}</span>

              {open && <div className="options">
                {currentUser?.isSeller && (
                  <>
                    <Link to="/mygigs" className="link">Gigs</Link>
                    <Link to="/add" className="link">Add New Gig</Link>
                  </>
                )}
                <Link to="/orders" className="link">Orders</Link>
                <Link to="/messages" className="link">Messages</Link>

                <Link
                  className="link"
                  onClick={handleLogOut}
                >
                  Logout
                </Link>
              </div>}

            </div>
          )}

        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <div className="line"></div>
          <div className="menu">

            <Link className="link menulink" to="/">
              Graphics & Design
            </Link>

            <Link className="link" to="/">
              Video & Animation
            </Link>

            <Link className="link" to="/">
              Writing & Translation
            </Link>

            <Link className="link" to="/">
              AI Services
            </Link>

            <Link className="link" to="/">
              Digital Marketing
            </Link>

            <Link className="link" to="/">
              Music & Audio
            </Link>

            <Link className="link" to="/">
              Programming & Tech
            </Link>

            <Link className="link" to="/">
              Business
            </Link>

            <Link className="link" to="/">
              Lifestyle
            </Link>
          </div>
          <div className="line"></div>
        </>
      )}

    </div>
  )
}

export default Navbar 