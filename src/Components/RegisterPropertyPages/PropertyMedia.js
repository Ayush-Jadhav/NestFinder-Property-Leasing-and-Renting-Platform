import React, { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../IconBtn";
import { MdOutlineCancel } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import "./Register page Style/propertyMedia.css";
import { postProperty } from "../../Services/Operations/propertyApi";
import { useNavigate } from "react-router-dom";

export const PropertyMedia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const propData = useSelector((state) => state.prop);
  const { token } = useSelector((state)=> state.user);

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const updatedImages = [...imageFiles, ...files].slice(0, 4); // Limit to 4 images
      setImageFiles(updatedImages);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...imageFiles];
    updatedImages.splice(index, 1);
    setImageFiles(updatedImages);
  };

  const removeVideo = () => {
    setVideoFile(null);
  };

  const previewFiles = () => {
    // Generate previews for images
    const imagePreviews = imageFiles.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    // Generate preview for video
    const videoPreview = videoFile
      ? new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(videoFile);
          reader.onloadend = () => resolve(reader.result);
        })
      : Promise.resolve(null);

    Promise.all([...imagePreviews, videoPreview]).then((previews) => {
      setImagePreviews(previews.slice(0, -1)); // Image previews
      setVideoPreview(previews.at(-1)); // Video preview
    });
  };

  const handleFileUpload = () => {
    try {
      if (imageFiles.length < 2 || !propData.prop) {
        throw new Error("Upload all required details.");
      }

      setLoading(true);
      const formData = new FormData();

      // Append images to FormData dynamically
      imageFiles.forEach((file, index) =>
        formData.append(`image_${index + 1}`, file)
      );

      if (videoFile) {
        formData.append("video", videoFile);
      }

      console.log("key and key value");
      Object.keys(propData.prop).forEach(key => {
        formData.append(key, propData.prop[key]);
        console.log(key,propData.prop[key]);
      });

      dispatch(postProperty(token, formData,navigate)); // Dispatch upload action
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    previewFiles();
  }, [imageFiles, videoFile]);

  return (
    <div className="property-media">
      <h2 className="form-section-title">How Your Property Looks</h2>
      <div className="property-media__header">
        <div className="property-media__actions">
          {/* Image Input and Preview */}
          <button
            onClick={handleImageClick}
            disabled={loading}
            className="property-media__button"
          >
            Select Images (Max 4)
          </button>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/png, image/jpeg, image/gif"
            multiple
          />
          <div className="property-media__preview">
            {imagePreviews.map((src, index) => (
              <div key={index} className="property-media__preview-item">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="property-media__image"
                />
                <button
                  className="property-media__remove"
                  onClick={() => removeImage(index)}
                >
                  <RxCross2 />
                </button>
              </div>
            ))}
            {imageFiles.length < 1 && (
              <span className="error-message-media">
                Upload at least two images.
              </span>
            )}
          </div>

          {/* Video Input and Preview */}
          <button
            onClick={handleVideoClick}
            disabled={loading}
            className="property-media__button"
          >
            Select Video (1)
          </button>
          <input
            type="file"
            ref={videoInputRef}
            onChange={handleVideoChange}
            className="hidden"
            accept="video/mp4, video/webm, video/ogg"
          />
          {videoPreview && (
            <div className="property-media__preview">
              <div className="property-media__preview-item">
                <video
                  src={videoPreview}
                  controls
                  className="property-media__video"
                ></video>
                <button
                  className="property-media__remove"
                  onClick={removeVideo}
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <IconBtn
        text={loading ? "Uploading..." : "Submit"}
        onclick={handleFileUpload}
      >
        {!loading && <FiUpload className="property-media__icon" />}
      </IconBtn>
    </div>
  );
};
