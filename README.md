![image_2024-06-08_223942990](https://github.com/blope12/file-uploder/assets/148343881/5910dbbf-51d8-4bac-9435-b1a1b51a374f)



### README.md

# File Uploader

This project is a simple file uploader built using React, allowing users to drag and drop files, view previews, and download or delete files. It supports image, video, and text file types.

## Features

- Drag and drop file upload
- Preview images, videos, and text files
- Download and delete individual files
- Delete and download all files at once

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/blope12/file-uploder.git
   cd file-uploder
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Project

To start the development server, run:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

## How to Use

1. **Upload Files**:
   - Drag and drop your files into the drop zone, or click the drop zone to select files from your file system.
   - The files will be previewed below the drop zone.

2. **Preview Files**:
   - Images and videos will be displayed as previews.
   - Text files will show their content.

3. **Download Files**:
   - Click the "دانلود" button next to each file to download it.
   - Click the "دانلود همه" button to download all files at once.

4. **Delete Files**:
   - Click the "حذف" button next to each file to remove it.
   - Click the "حذف همه" button to remove all files at once.

## Code Explanation

### `FileUploader.js`

This is the main component responsible for the file upload functionality.

```javascript
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
```

### CSS Styles

The CSS styles for the application.

```css
body {
    margin: 0;
    padding: 0;
    background-color: rgb(29, 29, 29);
}

* {
    font-family: "Poetsen One", sans-serif;
    text-decoration: none;
    list-style-type: none;
}

.dropzone {
    background: linear-gradient(to right, #1c4066,#2466ac);
    border-radius: 40px;
    padding: 20px;
    display: flex;
    text-align: center;
    cursor: pointer;
    height: 100px;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    color: white;
    margin-bottom: 20px;
}

.file-list {
    list-style-type: none;
    display: flex;
    gap: 20px;
    margin-top: 50px;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.file-item {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    height: 300px;
    max-width: 300px;
    background-color: rgb(17, 17, 17);
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 10px;
    color: white;
    text-align: center;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
}

.file-item:hover {
    background-color: rgb(82, 82, 82);
}

.file-preview {
    position: relative;
    width: 300px;
    height: 200px;
    border-radius: 30px;
    margin-bottom: 10%;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.button {
    padding: 5px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    text-align: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
}

.button:hover {
    font-size: 22px;
}
```

This should provide a clear, detailed, and well-formatted README file for your project.
