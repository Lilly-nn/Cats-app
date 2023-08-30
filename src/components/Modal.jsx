"use client"
import { useRef, useState } from "react";

export default function Modal({isOpen, setIsOpen}) {
  const [isDragged, setIsDragged] = useState(false);
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

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
        setFiles([...files, droppedFiles]);
    }
    setIsDragged(false);
  }

  function handleChange(e) {
    let selectedFiles = [...e.target.files];
    setFiles([...files, selectedFiles]);
  }

  return (
    isOpen && (
        <div className='modal__container'>
            <input multiple type="file" className="hidden" ref={inputRef} onChange={(e) => handleChange(e)}/>
            <button className="modal__close" onClick={() => setIsOpen(false)}>
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
                <img src="/assets/upload-bg.png" className='img__placeholder'/>
                <p className="instructions"><span className="bold">Drag here</span> your file or <button className="bold" onClick={() => inputRef.current.click()}>Click here</button> to upload</p>
            </div>
            <div className="modal__footer">
                {!files.length 
                    ?   
                    <h6 className='img__status'>No file selected</h6>
                    : 
                    <h6 className='img__status'>{files.length}
                    <span>{files.length > 1 ? "files selected" : "file selected"}</span></h6>
                }
              
            </div>
        </div>
    )
    
  )
}
