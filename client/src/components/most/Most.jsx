import { FaSortDown } from "react-icons/fa"
import GigCard from "../../components/gigCard/GigCard"
import "./Most.scss"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import newRequest from "../../utils/createRequest"
import { useLocation } from "react-router-dom"

const Most = () => {

  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState("sales")
  const minRef = useRef()
  const maxRef = useRef()

  const { search } = useLocation()

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['most'],
    queryFn: () =>
      newRequest.get(
        `/gigs`
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


  return (
    <div className="most">
      <div className="container">
        <h2>Most Viewed </h2>
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

export default Most
