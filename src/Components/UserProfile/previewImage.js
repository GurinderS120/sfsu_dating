import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import "cropperjs/dist/cropper.css";

const PreviewImage = ({ imgurl, setModalOn, setFieldValue }) => {
  const [croppedImg, setCroppedImg] = useState(null);
  const cropperRef = useRef(null);
  const [zoomVal, setZoomVal] = useState(0);

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

  const handleChoose = () => {
    const imgEle = cropperRef.current;
    const cropper = imgEle.cropper;
    cropper
      .crop()
      .getCroppedCanvas()
      .toBlob((blob) => {
        const imgUrl = URL.createObjectURL(blob);
        console.log(imgUrl);
        setFieldValue("pic", imgUrl);
      });
    setModalOn(false);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  return (
    <div className="bg-zinc-200 opacity-100 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center  bg-white py-12 px-24 border-4 border-sky-500 rounded-xl ">
          <div className="flex">
            <button onClick={handleCancel}>
              <AiOutlineClose />
            </button>
            <button>
              <AiOutlineCheck onClick={handleChoose} />
            </button>
          </div>
          <Cropper
            ref={cropperRef}
            src={imgurl}
            dragMode="move"
            preview=".img-preview"
            style={{ height: "288px", width: "100%" }}
            aspectRatio={16 / 9}
            viewMode={3}
            background={true}
            autoCrop={false}
            cropBoxMovable={false}
            cropBoxResizable={false}
            minContainerHeight={288}
            minContainerWidth={288}
            minCanvasWidth={288}
            minCanvasHeight={288}
            toggleDragModeOnDblclick={false}
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

          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewImage;
