import { FaSortDown } from "react-icons/fa"
import GigCard from "../../components/gigCard/GigCard"
import "./Gigs.scss"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import newRequest from "../../utils/createRequest"
import { useLocation } from "react-router-dom"

const Gigs = () => {

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("sales")
  const minRef = useRef()
  const maxRef = useRef()

  const { search } = useLocation()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest.get(
        `/gigs?${search}?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
      ).then((res) => {
        return res.data
      })
  })

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  useEffect(() => {
    refetch()
  }, [sort])


  const apply = () => {
    refetch()
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">SkillBazaar {'>'} Graphics & Design {'>'}</span>
        <h1>AI Artist</h1>
        <p>Explore the boundaries of art and technology with SkillBazaar AI artists</p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={apply}>Apply</button>
          </div>

          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : sort === "price" ? "Price" : "Newest"}</span>
            <FaSortDown className="icon" onClick={() => setOpen(!open)} />
            {open && (<div className="rightMenu">

              {sort === "sales" ? (
                <span onClick={() => reSort("createdAt")}>Newest</span>
              ) : (
                <span onClick={() => reSort("sales")}>Best Selling</span>
              )}
              <span onClick={() => reSort("price")}>Price</span>
            </div>
            )}
          </div>
        </div>

        <div className="cards">
          {isLoading
            ? "Loading"
            : error
              ? "Something Went Wrong"
              :
              data.map((gig, ind) => (
                <GigCard key={ind} item={gig} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default Gigs
