"use client"
import Service from "@/API/Service";
import { checkIfImage } from "@/utils/checkIsImg";
import { generateUserToken } from "@/utils/generateUserToken";
import { useRef, useState } from "react";

export default function Modal({isOpen, setIsOpen}) {
  const [isDragged, setIsDragged] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const inputRef = useRef();
  const userToken = generateUserToken();
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function dragStartHandler(e) {
    e.preventDefault();
    setIsDragged(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setIsDragged(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    let droppedFiles = [...e.dataTransfer.files];
    if(droppedFiles) {
        showImgPreview(droppedFiles[0])
    }
    setIsDragged(false);
  }

  function handleChange(e) {
    let selected = e.target.files[0];
    showImgPreview(selected)
  }

  function showImgPreview(file) {
    const isImage = checkIfImage(file);
    if(isImage) {
      setSelectedFile(file);
      setSelectedImg({
        src: URL.createObjectURL(file),
        name: file.name});
    }
  }

  async function uploadImg() {
    setLoading(true);
    setUploadResult(null);
    const status = await Service.uploadImage(selectedFile, userToken);
    switch(status) {
      case 201: setUploadResult('Thanks for the Upload - Cat found!'); break;
      case 400: setUploadResult('No Cat found - try a different one'); break;
    }
    resetImg();
    setLoading(false);
  }

  function resetImg() {
    setSelectedImg(null); 
    setSelectedFile(null);
  }

  function closeModal() {
    setIsOpen(false); 
    resetImg(); 
    setUploadResult(null); 
  }


  return (
    isOpen && (
        <div className='modal__container'>
            <input type="file" className="hidden" ref={inputRef} onChange={(e) => handleChange(e)}/>
            <button className="modal__close" onClick={closeModal}>
                <img src="/assets/icons/close-20.svg"/>
            </button>
            <div className='modal__header'>
                <h5>Upload a .jpg or .png Cat Image</h5>
                <span>Any uploads must comply with the <a>upload guidelines</a> or face deletion.</span>
            </div>
            <div className='img__drop' 
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
                onDrop={(e) => onDropHandler(e)}
            >
                <img src={!selectedImg ? "/assets/upload-bg.png" : selectedImg.src} className={`${selectedImg ? "img__content" : ""}`}/>
                {!selectedImg && (
                  <p className="instructions"><span className="bold">Drag here</span> your file or <button className="bold" onClick={() => inputRef.current.click()}>Click here</button> to upload</p>
                  ) 
                }
             
            </div>
            <div className="modal__footer">
                {!selectedFile 
                    ?   
                    <h6 className='img__status'>No file selected</h6>
                    : 
                    <h6 className='img__status'>{`Image file name: ${selectedImg.name}`}</h6>
                }
                {selectedImg && (
                     <button disabled={loading} className={`btn-upload ${loading ? "active" : ""}`} onClick={uploadImg}>
                      {loading ? "Uploading..." :  "Upload photo"}
                      {loading && <img src="assets/loader.svg"/>}
                      </button>
                )}
                {uploadResult && <h5 className="upload-status">{uploadResult}</h5>}
            </div>
        </div>
    )
    
  )
}
