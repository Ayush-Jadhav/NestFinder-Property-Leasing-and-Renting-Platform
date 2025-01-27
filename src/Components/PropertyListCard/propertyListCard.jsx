import React, { useState, useEffect } from "react";
import "./propertyListCard.css"; 
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowDropDownLine} from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteProperty } from "../../Services/Operations/propertyApi";
import { useNavigate } from "react-router-dom";
import { setPropCardData } from "../../Redux/Slices/propUpdateSlice";


const PropertyCard = ({property,setConfirmationModal,dropDown=1}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.user);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const address = `${property.location.street}, ${property.location.locality}, ${property.location.city}, ${property.location.state}`

  useEffect(() => {
    console.log({property});
    if (property.images.length > 0 && property.videos.length === 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
      }, 4000); // Slide every 4 seconds
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [property.images, property.videos]);

  const updateCard = ()=>{
    dispatch(setPropCardData(property));
    navigate("/dashboard/property/update");
  }

  return (
    <div className="property-card">
      <div className="media-section">
        {property.videos.length > 0 ? (
          <video
            src={property.videos[0].url}
            controls
            autoPlay
            loop
            className="media-video"
          ></video>
        ) : (
          <div className="image-slider">
            {property.images.map((image, index) => (
              currentImageIndex===index && <img key={index} src={image.url} alt={`Property Image ${index + 1}`} className="slider-image"/>
            ))}
          </div>
        )}
      </div>
      <div className="info-section">
        <div className="heading">
        <h2 className="property-type">{property.kindOfProperty}</h2>
        {dropDown===1 && <div className="dropdown">
            <p className={property.active==="Active" ? "property-active" : "property-inactive"}>{property.active}<IoMdArrowDropdown /></p> 
            <div className="dropdownContainer">
                <span className="downArrow"></span>
                <div className="dropdownList">
                    <ul>
                        <li onClick={updateCard}>Update</li>
                        <li onClick={() =>
                            setConfirmationModal({
                              text1: "Are you sure?",
                              text2: "You want to delete this property from rent list.",
                              btn1Text: "Delete",
                              btn2Text: "Cancel",
                              btn1Handler: () => dispatch(deleteProperty(token,property._id)),
                              btn2Handler: () => setConfirmationModal(null),
                            })}>Delete</li>
                    </ul>
                </div>
            </div>
        </div>}

        </div>
        <p className="property-location">
          {address.length > 55 ? `${address.substring(0, 52)}....` : address}
        </p>
        <p className="property-tenant"><span className="keyStyle">Looking For:</span> {property.lookingFor}</p>
        <p className="property-tenant"><span className="keyStyle">Plot Area:</span> {property.plotArea} sq.ft.</p>
        <p className="property-furnishing"><span className="keyStyle">Furnishing:</span> {property.furnishing}</p>
        <p className="property-tenant"><span className="keyStyle">Suitable For:</span> {property.willingToGive}</p>
        <p className="property-price"><span className="keyStyle">Price:</span> ₹{property.price}</p>
        {
          dropDown===0 && <div className="owner-details">
            <p className="owner-name"><span className="keyStyle">Owner Name:</span> {property.userId?.firstName}</p>
            <p className="owner-number"><span className="keyStyle">Contact No.:</span> {property.userId?.number}</p>
            <p className="owner-email"><span className="keyStyle">Email:</span> {property.userId?.email}</p>
          </div>
        }
      </div>
    </div>
  );
};

export default PropertyCard;
