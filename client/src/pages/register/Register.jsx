import { useState } from "react"
import "./Register.scss"
import upload from "../../utils/upload"
import newRequest from "../../utils/createRequest"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const [file, setFile] = useState(null)

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: ""
  })


  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file)
    // console.log(url)

    try {
      await newRequest.post("auth/register",{
        ...user,
        img: url
      })
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />

          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
          />

          <label htmlFor="">Profile Picture</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file" />

          <label htmlFor="">Country</label>
          <input
            name="country"
            type="text"
            onChange={handleChange}
            placeholder="Usa"
          />

          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>

            <label className="switch">
              <input type="checkbox" onChange={handleSeller}/>
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="tel"
            onChange={handleChange}
            placeholder="+1 234 567 89"
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            onChange={handleChange}
            rows="10">
          </textarea>
        </div>
      </form>
    </div>
  )
}

export default Register