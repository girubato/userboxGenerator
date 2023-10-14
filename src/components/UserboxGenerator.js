import React, { useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import html2canvas from 'html2canvas';
import './UserboxGenerator.css';

function UserboxGenerator() {
  const [text, setText] = useState('cat im a kitty cat and i dance dance dance');
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#FFA2F1');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [borderColor, setBorderColor] = useState('#FB6DEF');
  const [userImage, setUserImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const userboxRef = useRef();

  const handleTextInput = (event) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserImage(imageUrl);
    }
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleLoadImage = () => {
    setUserImage(imageUrl);
  };

  const handleDownload = () => {
    html2canvas(userboxRef.current, { useCORS: true }).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'userbox.png';
      link.click();
    });
  };

  return (
    <div className="userbox-container">
      <h2>Userbox Generator</h2>

      <div className="userbox-preview" ref={userboxRef}>
        <div
          className="userbox"
          style={{
            backgroundColor,
            border: `2px solid ${borderColor}`,
            width: '240px',
            height: '50px',
            display: 'flex',
          }}
        >
          <div className="user-image" style={{ minWidth: '50px', height: '50px', float: 'left' }}>
            {userImage && (
              <img
                src={userImage}
                alt="User Avatar"
                style={{
                  minHeight: '50px',
                  minWidth: '50px',
                  maxHeight: '100%',
                  maxWidth: '100%',
                }}
              />
            )}
          </div>
          <div
            className="user-description"
            style={{
              color: textColor,
              maxWidth: 'calc(100% - 50px)',
              display: 'flex',
              alignItems: 'center',
              wordWrap: 'break-word',
              fontSize: `${fontSize}px`,
              borderLeft: `2px solid ${borderColor}`,
              paddingLeft: '5px',
            }}
          >
            {text}
          </div>
        </div>
      </div>

      <div className="input-section">
        <label htmlFor="userbox-text">Text: </label>
        <input type="text" id="userbox-text" value={text} onChange={handleTextInput} />
      </div>

      <div className="fontsize-section">
        <label htmlFor="fontSize">Font Size: </label>
        <input type="number" id="fontSize" value={fontSize} onChange={handleFontSizeChange} />
      </div>

      <div className="color-section">
        <div className="color-picker">
          <h3>Background Color</h3>
          <SketchPicker color={backgroundColor} onChange={(color) => setBackgroundColor(color.hex)} />
        </div>
        <div className="color-picker">
          <h3>Text Color</h3>
          <SketchPicker color={textColor} onChange={(color) => setTextColor(color.hex)} />
        </div>
        <div className="color-picker">
          <h3>Border Color</h3>
          <SketchPicker color={borderColor} onChange={(color) => setBorderColor(color.hex)} />
        </div>
      </div>

      <div className="image-upload">
        Upload an image: {}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div className="image-url-section">
        <label htmlFor="imageUrl">Image URL: </label>
        <input type="text" id="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        <button onClick={handleLoadImage}>Load Image</button>
      </div>

      <button onClick={handleDownload}>Download Userbox</button>
    </div>
  );
}

export default UserboxGenerator;
