import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const PreviewImage = ({ imgurl }) => {
  const [croppedImg, setCroppedImg] = useState(null);
  const [zoomVal, setZoomVal] = useState(0);
  const cropperRef = useRef(null);

  useEffect(() => {
    setZoomVal(0);
  }, [imgurl]);

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
        className="slider absolute top-[17.2rem] lg:top-[21rem]"
        onChange={handleZoomChange}
        id="myRange"
      />
    </>
  );
};

export default PreviewImage;
