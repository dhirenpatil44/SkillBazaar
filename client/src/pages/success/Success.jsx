import { useLocation, useNavigate } from "react-router-dom"
import newRequest from "../../utils/createRequest"
import { useEffect } from "react"
import "./Success.scss"

const Success = () => {

  const { search } = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const payment_intent = params.get("payment_intent")

  useEffect(() => {
    const makeReq = async () => {
      try {
        await newRequest.put("/orders", { payment_intent })
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error)
      }
    }
    makeReq()

  }, [])

  return (
    <div className="success">
      <h1 className="">
        Payment Successful.
      </h1>
      <h3>
        We are redirecting to home page. Please wait and do not refresh page.
      </h3>
      <img src="./img/loader.gif" alt="" />
    </div>
  )
}

export default Success