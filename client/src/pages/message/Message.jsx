import { Link, useParams } from 'react-router-dom'
import "./Message.scss"
import newRequest from '../../utils/createRequest'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const { id } = useParams()

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(
        `/messages/${id}`
      ).then((res) => {
        return res.data
      })
  })

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest?.post(`/messages`, message)
    },
    onSuccess: () => {
      queryClient?.invalidateQueries(["messages"])
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    })
    e.target[0].value = ""
  }

  return (
    <div className='message'>
      <div className="container">
        <span className='breadcrumbs'>
          <Link to="/messages">Messages</Link> {">"}  {">"}
        </span>

        {isLoading
          ? ("Loading")
          : error
            ? ("Something Went Wrong")
            : (

              <div className="messages">

                {data.map((m, ind) => (
                  <div className={m.userId === currentUser._id ? "owner item" : "item"} key={ind}>
                    <p>{m.desc}</p>
                  </div>
                ))}

              </div>
            )}

        <form className="write" onSubmit={handleSubmit}>
          <textarea placeholder='Write a message' name="" id="" cols="30" rows="10"></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message