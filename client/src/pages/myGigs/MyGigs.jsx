import { Link } from "react-router-dom"
import "./MyGigs.scss"
import { FaTrash } from "react-icons/fa"
import { useMutation, useQuery, useQueryClient } from "react-query"
import newRequest from "../../utils/createRequest"

const MyGigs = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(
        `gigs?userId=${currentUser._id}`
      ).then((res) => {
        return res.data
      })
  })
  
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"])
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }


  return (
    <div className="myGigs">
      {isLoading
        ? ("Loading")
        : error
          ? ("Something Went Wrong")
          : (
            <div className="container">
              <div className="title">
                <h2>Gigs</h2>
                <Link to="/add">
                  <button>Add New Gig</button>
                </Link>
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Action</th>
                  </tr>

                  {data.map((gig) => (
                    <tr key={gig._id}>
                      <td>
                        <img src={gig.cover} className="art" />
                      </td>
                      <td>{gig.title}</td>
                      <td>{gig.price}</td>
                      <td>{gig.sales}</td>
                      <td>
                        <FaTrash
                          className="delete"
                          onClick={() => handleDelete(gig._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </div>
  )
}

export default MyGigs