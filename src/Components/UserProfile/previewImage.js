import { useState, useRef } from "react";
import Cropper from "react-cropper";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "cropperjs/dist/cropper.css";

// This Component is responsible for displaying modal(pop up) where a user
// can edit their uploaded image using Cropper.js
const PreviewImage = ({ img, setModalOn, setFieldValue }) => {
  const cropperRef = useRef(null);
  const [zoomVal, setZoomVal] = useState(0);

  const handleZoomChange = (e) => {
    setZoomVal((prevZoom) => {
      handleZoom(e.target.value - prevZoom);
      return e.target.value;
    });
  };

  const handleZoom = (zoomBy) => {
    const imgEle = cropperRef.current;
    const cropper = imgEle.cropper;
    cropper.zoom(zoomBy);
  };

  const handleChoose = () => {
    const imgEle = cropperRef.current;
    const cropper = imgEle.cropper;
    const imgUrl = {
      url: cropper
        .setCropBoxData({ left: 0, top: 0, width: 288 })
        .getCroppedCanvas()
        .toDataURL(img.type),
      type: img.type,
    };
    setFieldValue("pic", imgUrl);
    setModalOn(false);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  return (
    <div className="modal-container">
      <div className="modal-content-wrapper">
        <div className="modal-content">
          <button
            type="button"
            className="image-upload-edit-btn text-white"
            onClick={handleCancel}
          >
            <AiOutlineClose />
          </button>
          <button
            type="button"
            className="image-upload-edit-btn text-white"
            onClick={handleChoose}
          >
            <AiOutlineCheck />
          </button>
        </div>
        <div className="image-section">
          <Cropper
            ref={cropperRef}
            src={img.url}
            dragMode="move"
            preview={".img-preview"}
            viewMode={0}
            background={true}
            autoCrop={true}
            autoCropArea={1}
            cropBoxMovable={false}
            cropBoxResizable={false}
            toggleDragModeOnDblclick={false}
            zoomOnTouch={false}
            zoomOnWheel={false}
          />
          <div className="img-preview"></div>
        </div>
        <input
          value={zoomVal}
          type="range"
          min="-0.3"
          max="0.3"
          step="0.02"
          className="slider"
          onChange={handleZoomChange}
          id="myRange"
        />
      </div>
    </div>
  );
};

export default PreviewImage;
