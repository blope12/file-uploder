import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUploader() {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: generatePreview(file)
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDelete = (fileToDelete) => {
    setFiles((prevFiles) => prevFiles.filter(({ file }) => file !== fileToDelete));
  };

  const generatePreview = (file) => {
    const fileType = file.type.split('/')[0];

    if (fileType === 'image') {
      return <img src={URL.createObjectURL(file)} alt={file.name} className="file-preview" />;
    } else if (fileType === 'video') {
      return <video controls src={URL.createObjectURL(file)} className="file-preview" />;
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles(prevFiles => prevFiles.map(f => f.file === file ? { ...f, preview: <pre className="file-preview">{reader.result}</pre> } : f));
      };
      reader.readAsText(file);
      return <pre className="file-preview">Loading text...</pre>;
    } else {
      return <p>Cannot preview this file type</p>;
    }
  };

  const handleDeleteAll = () => {
    setFiles([]);
  };

  const handleDownloadAll = () => {
    files.forEach(({ file }) => downloadFile(file));
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*,video/*,text/plain',
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>please drop your file here</p>
      </div>
      <ul className="file-list">
        {files.map(({ file, preview }, index) => (
          <li key={index} className="file-item">
            <div>
              <span>{file.name} - {file.size} bytes</span>
            </div>
            <div>
              <div className="file-preview-container">{preview}</div>
            </div>
            <div className='btnn'>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(file); }} className="button">حذف</button>
              <button onClick={(e) => { e.stopPropagation(); downloadFile(file); }} className="button">دانلود</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button onClick={handleDeleteAll} className="button">حذف همه</button>
        <button onClick={handleDownloadAll} className="button">دانلود همه</button>
      </div>
    </div>
  );
}

export default FileUploader;
