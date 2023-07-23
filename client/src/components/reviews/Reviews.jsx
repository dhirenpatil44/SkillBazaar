import "./Reviews.scss"
import Review from "../../components/review/Review"
import { useMutation, useQuery, useQueryClient } from "react-query"
import newRequest from "../../utils/createRequest.js"
import { useState } from "react"

const Reviews = ({ gigId }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['reviews'],
    queryFn: () =>
      newRequest.get(
        `/reviews/${gigId}`
      ).then((res) => {
        return res.data
      })
  })

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"])
      setErrorMsg("yes")
    },
    onError: () => {
      setErrorMsg("You alredy created review")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star })
  }

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {/* <p>{errorMsg}</p> */}
      {isLoading
        ? "Loading"
        : error
          ? "Something Went Wrong!"
          : data.map((review) => <Review key={review._id} review={review} />
          )}

      <div className="add">
        <h3>Add Review</h3>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <form action="" onSubmit={handleSubmit} className="addForm">
          <input type="text" placeholder="Write your opinion..." />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Reviews