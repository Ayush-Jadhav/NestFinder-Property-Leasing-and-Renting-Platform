import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./propertyUpdateCard.css";
import IconBtn from "../IconBtn";
import { useNavigate } from "react-router-dom";
import { updateProperty } from "../../Services/Operations/propertyApi";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";
import { MdAddCircleOutline } from "react-icons/md";

export const PropertyUpdateCard = () => {
  
const propCardData = useSelector((state) => state.propUpdate.propCardData);
const {token} = useSelector((state)=> state.user)
const navigate = useNavigate();
const dispatch = useDispatch();

const [formData, setFormData] = useState({
  ...propCardData,
  newImages: [],
  newVideos: [],
  removePhotos: [],
  removeVideos: [],
});

const [status,setStatus] = useState(propCardData?.active ?? "Inactive");

// Return early if no property data is available
if (!propCardData) {
  return <div>No property data available.</div>;
}

// Handle Input Changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Handle Image Removal
const handleRemoveImage = (index) => {
  const imageToRemove = formData.images[index];
  setFormData((prevData) => ({
    ...prevData,
    images: prevData.images.filter((_, i) => i !== index),
    removePhotos: [...prevData.removePhotos, imageToRemove],
  }));
};

// Handle New Image Uploads
const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);

  if (formData.images.length + formData.newImages.length + files.length > 4) {
    alert("You can only upload up to 4 images in total.");
    return;
  }

  setFormData((prevData) => ({
    ...prevData,
    newImages: [...prevData.newImages, ...files],
  }));
};

// Handle Video Upload
const handleVideoUpload = (e) => {
  const files = Array.from(e.target.files);

  if (files.length > 1) {
    alert("You can only upload one video.");
    return;
  }

  const newVideo = files[0];
  setFormData((prevData) => ({
    ...prevData,
    newVideos: [newVideo],
    removeVideos: prevData.videos.length ? [...prevData.removeVideos, ...prevData.videos] : [],
    videos: [], // Clear existing videos
  }));
};

// Handle Submit
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("FrontEndSide",formData)
  console.log("status",status);

  if(formData.newImages.length + formData.images.length < 2)
  {
    toast.error("At least two images require")
  }
  else{
    const data = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key === "newImages") {
          formData.newImages.forEach((image) => data.append("image[]", image));
      } else if (key === "newVideos") {
          formData.newVideos.forEach((video) => data.append("video[]", video));
      } else if (key === "removePhotos" || key === "removeVideos") {
        formData[key].forEach((item) => {
            data.append(key, item.url); // Append each URL directly
        });
      } else if (key === "images" || key === "videos") {
      } 
      else if (key==="active"){
        data.append("active",status);
      }else {
        data.append(key, formData[key]);
      }
    })


    dispatch(updateProperty(token,propCardData._id,data,navigate));
  }
}

  return (
    <form onSubmit={handleSubmit} className="propertyUpdateCard-form">
      {/* Basic Details Section */}
      <div className={`status ${status === "Active" ? "active" : "inactive"}`}>
        <div className="status-slider"></div>
        <span className="status-option" onClick={() => setStatus("Active")}>Active</span>
        <span className="status-option" onClick={() => setStatus("Inactive")}>Inactive</span>
      </div>
      <fieldset className="propertyUpdateCard-section">
        <legend className="propertyUpdateCard-legend">Basic Details</legend>
        <label className="propertyUpdateCard-label">
          Looking For:
          <select
            name="lookingFor"
            value={formData.lookingFor || ""}
            onChange={handleChange}
            className="propertyUpdateCard-select"
          >
            <option value="Sell">Sell</option>
            <option value="Rent/Lease">Rent/Lease</option>
          </select>
        </label>

        <label className="propertyUpdateCard-label">
          Kind of Property:
          <select
            name="kindOfProperty"
            value={formData.kindOfProperty || ""}
            onChange={handleChange}
            className="propertyUpdateCard-select"
          >
            <option value="Flat/Apartment">Flat/Apartment</option>
            <option value="Independent House/Villa">Independent House/Villa</option>
            <option value="Independent/Builder Floor">Independent/Builder Floor</option>
            <option value="Serviced Apartment">Serviced Apartment</option>
          </select>
        </label>

        <label className="propertyUpdateCard-label">
          Price:
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>
      </fieldset>

      {/* Location Details Section */}
      <fieldset className="propertyUpdateCard-section">
        <legend className="propertyUpdateCard-legend">Location Details</legend>
        <label className="propertyUpdateCard-label">
          Street:
          <input
            type="text"
            name="location.street"
            value={formData.location?.street || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>

        <label className="propertyUpdateCard-label">
          Locality:
          <input
            type="text"
            name="location.locality"
            value={formData.location?.locality || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>

        <label className="propertyUpdateCard-label">
          City:
          <input
            type="text"
            name="location.city"
            value={formData.location?.city || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>

        <label className="propertyUpdateCard-label">
          State:
          <input
            type="text"
            name="location.state"
            value={formData.location?.state || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>
      </fieldset>

      {/* Property Details Section */}
      <fieldset className="propertyUpdateCard-section">
        <legend className="propertyUpdateCard-legend">Property Details</legend>
        <label className="propertyUpdateCard-label">
          Willing to Give:
          <select
            name="willingToGive"
            value={formData.willingToGive || ""}
            onChange={handleChange}
            className="propertyUpdateCard-select"
          >
            <option value="Single-men">Single-men</option>
            <option value="Single-women">Single-women</option>
            <option value="Family">Family</option>
          </select>
        </label>

        <label className="propertyUpdateCard-label">
          Plot Area:
          <input
            type="number"
            name="plotArea"
            value={formData.plotArea || ""}
            onChange={handleChange}
            className="propertyUpdateCard-input"
          />
        </label>

        <label className="propertyUpdateCard-label">
          Furnishing:
          <select
            name="furnishing"
            value={formData.furnishing || ""}
            onChange={handleChange}
            className="propertyUpdateCard-select"
          >
            <option value="Furnished">Furnished</option>
            <option value="Semi-furnished">Semi-furnished</option>
            <option value="Un-furnished">Un-furnished</option>
          </select>
        </label>
      </fieldset>

      {/* Media Section (Images & Videos) */}
      <fieldset className="propertyUpdateCard-section">
        <legend className="propertyUpdateCard-legend">Media</legend>

        {/* Existing and New Image Previews */}
        <h4>Images</h4>
        <div className="propertyUpdateCard-imageSection">
          {[
            ...formData.images.map((image, index) => (
              <div key={`existing-${index}`} className="propertyUpdateCard-imageItem">
                <img
                  src={image.url}
                  alt={`Property Image ${index}`}
                  className="propertyUpdateCard-image"
                />
                <button
                  type="button"
                  className="propertyUpdateCard-removeImageButton"
                  onClick={() => handleRemoveImage(index)}
                >
                  <RxCross2 />
                </button>
              </div>
            )),
            ...formData.newImages.map((file, index) => (
              <div key={`new-${index}`} className="propertyUpdateCard-imageItem">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New Image ${index}`}
                  className="propertyUpdateCard-image"
                />
                <button
                  type="button"
                  className="propertyUpdateCard-removeImageButton"
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      newImages: prevData.newImages.filter((_, i) => i !== index),
                    }))
                  }
                >
                  <RxCross2 />
                </button>
              </div>
            )),
          ]}

        {/* Upload New Images */}
        {formData.images.length + formData.newImages.length < 4 && (
        <label 
          className="propertyUpdateCard-ImageLabel" 
          // onClick={() => document.getElementById("imageUploadInput").click()}
        >
          <IoAddSharp className="propertyUpdateCard-AddIcon" />
          <input
            id="imageUploadInput"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="propertyUpdateCard-fileInput"
            style={{ display: "none" }} // Hide the file input
          />
        </label>
        )}
        </div>

        {/* Existing and New Video Previews */}
          <h4>Video</h4>
        <div className="propertyUpdateCard-videoSection">
          {formData.videos.length > 0 && (
            <div className="propertyUpdateCard-videoItem">
              <video controls className="propertyUpdateCard-video">
                <source src={formData.videos[0].url} type="video/mp4" />
              </video>
              <button
                  type="button"
                  className="propertyUpdateCard-removeVideoButton"
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      removeVideos: formData.videos,
                      videos : []
                    }))
                  }
                >
                  <RxCross2 />
                </button>
            </div>
          )}
          {formData.newVideos.length > 0 && (
            <div className="propertyUpdateCard-videoItem">
              <video controls className="propertyUpdateCard-video">
                <source src={URL.createObjectURL(formData.newVideos[0])} type="video/mp4" />
              </video>
              <button
                type="button"
                className="propertyUpdateCard-removeVideoButton"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    newVideos: [],
                  }))
                }
              >
                <RxCross2 />
              </button>
            </div>
          )}

        {/* Upload New Video */}
        {formData.newVideos.length === 0 && (
          <label 
          className="propertyUpdateCard-VideoLabel" 
          // onClick={() => document.getElementById("videoUploadInput").click()}
          >
          <IoAddSharp className="propertyUpdateCard-AddIcon" />
          <input
            id="videoUploadInput"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="propertyUpdateCard-fileInput"
            style={{ display: "none" }} // Hide the file input
            />
          </label>
          )}
          </div>
        </fieldset>

      {/* Submit Button */}
        <div className="edit-profile-form-actions">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-Properties");
            }}
            className="edit-profile-btn-secondary"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Save" />
        </div>
    </form>
  );
};

export default PropertyUpdateCard;
