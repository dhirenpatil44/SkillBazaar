import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import newRequest from "../../utils/createRequest.js"
import CheckoutForm from "../../components/checkoutForm/CheckoutForm"

const stripePromise = loadStripe("pk_test_51NWLyaSAOe6VVb9x4Rx7pazAQqnmLkVC3pfttbNPOheu9jFyZDMTjK4EePaDnFGjqL6MBcHMUDT4ejVpKwZXj6ZH00kS1rwV6b");

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("")

  const { id } = useParams()

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
        setClientSecret(res.data.clientSecret)
      } catch (error) {
        console.log(error)
      }
    }
    makeRequest()
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay