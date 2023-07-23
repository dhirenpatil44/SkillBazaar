import { useState } from 'react'
import "./Featured.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"

const Featured = () => {
  const [input, setInput] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`)
  }

  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
          <Link to="/gigs" className='link'>
            <button className='explore'>
              Explore All Items on SkillBazaar
            </button>
          </Link>
          <h1>Find the right <i>freelance</i></h1>
          <h1><i>service</i>, right away</h1>
          <div className="search">
            <div className="searchInput">
              <FontAwesomeIcon icon={faSearch} className='icon' />
              <input
                type="text"
                placeholder='Web Design'
                onChange={(e) => setInput(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>Wordpress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>

        <div className="right">
          <img src="./public/img/bg_hero.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Featured