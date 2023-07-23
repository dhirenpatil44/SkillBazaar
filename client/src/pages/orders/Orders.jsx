import "./Orders.scss"
import { FaEnvelope } from "react-icons/fa"
import newRequest from "../../utils/createRequest"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      newRequest.get(
        `/orders`
      ).then((res) => {
        return res.data
      })
  })

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  }

  return (
    <div className="orders">
      {isLoading
        ? ("Loading...")
        : error
          ? ("Something Went Wrong")
          : (
            <div className="container">
              <div className="title">
                <h2>Orders</h2>
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Contact</th>
                  </tr>

                  {data.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <img src={order.img} className="art" />
                      </td>
                      <td>{order.title}</td>
                      <td>{order.price}</td>
                      <td> <FaEnvelope className="mail" onClick={() => handleContact(order)} /> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </div>
  )
}

export default Orders