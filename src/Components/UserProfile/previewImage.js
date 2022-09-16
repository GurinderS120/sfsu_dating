import { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PreviewImage = ({ imgurl }) => {
  const [croppedImg, setCroppedImg] = useState(null);
  const [zoomVal, setZoomVal] = useState(0.01);
  const cropperRef = useRef(null);

  const handleZoomChange = (e) => {
    setZoomVal((prevZoom) => {
      if (prevZoom > e.target.value) {
        handleZoomOut(e.target.value - prevZoom);
      } else {
        handleZoomIn(e.target.value - prevZoom);
      }

      return e.target.value;
    });
  };

  const handleZoomIn = (increaseBy) => {
    const imgEle = cropperRef.current;
    const cropper = imgEle.cropper;
    cropper.zoom(increaseBy);
  };

  const handleZoomOut = (decreaseBy) => {
    const imgEle = cropperRef.current;
    const cropper = imgEle.cropper;
    cropper.zoom(decreaseBy);
  };

  return (
    <>
      <Cropper
        ref={cropperRef}
        src={imgurl}
        dragMode="move"
        style={{ height: "288px", width: "100%" }}
        aspect={1 / 1}
        //zoomTo={0.01}
        viewMode={1}
        autoCrop={false}
        background={true}
        cropBoxMovable={false}
        cropBoxResizable={false}
        minContainerHeight={288}
        minContainerWidth={288}
        minCanvasWidth={288}
        minCanvasHeight={288}
      />
      <input
        value={zoomVal}
        type="range"
        min="0"
        max="1"
        step="0.02"
        className="slider absolute"
        onChange={handleZoomChange}
        id="myRange"
      />
    </>
  );
};

export default PreviewImage;
