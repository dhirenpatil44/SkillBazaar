import { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload.js";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/createRequest";
import { useMutation, useQueryClient } from "react-query";

const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs")
  };


  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="AI Art"
              onChange={handleChange}
              name="title"
            />

            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInput">

                <label htmlFor="">Cover Image</label>
                <input type="file" className="file" onChange={e => setSingleFile(e.target.files[0])} />

                <label htmlFor="">Upload Images</label>
                <input type="file" multiple className="file" onChange={e => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUpload}>{uploading ? "Uploading..." : "Upload Images"}</button>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              cols="30"
              rows="16"
              placeholder="Breif Desc..."
              onChange={handleChange}
            >
            </textarea>

            <button onClick={handleSubmit}>Create Gig</button>
          </div>

          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="Web Page, etc"
              name="shortTitle"
              onChange={handleChange} />

            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              cols="30"
              rows="10"
              placeholder="Short Desc of your service"
              onChange={handleChange}
            >
            </textarea>

            <label htmlFor="">Delivery Time (in days)</label>
            <input
              type="number"
              name="deliveryTime"
              min={1}
              onChange={handleChange} />

            <label htmlFor="">Add Features</label>
            <form action="" onSubmit={handleFeature} className="add">
              <input type="text" placeholder="e.g Page Design" />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="">Price</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              min={1} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Add