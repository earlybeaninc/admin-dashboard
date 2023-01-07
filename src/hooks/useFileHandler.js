/* eslint-disable no-alert */
import { useState } from 'react';

const useFileHandler = (initState) => {
  const [imageFile, setImageFile] = useState(initState);
  const [isFileLoading, setFileLoading] = useState(false);

  const onFileChange = (event, { name }) => {
    const val = event.target.value;
    const img = event.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.jpeg|\.png)$/i;

    setFileLoading(true);
    if (!regex.exec(val)) {
      alert('File type must be JPEG or PNG', 'error');
      setFileLoading(false);
    } else if (size > 2) {
      alert('File size exceeded "2MB", consider optimizing your image', 'error');
      setFileLoading(false);
    } else {
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        setImageFile({
          ...imageFile,
          [name]: { file: img, url: e.target.result }
        });
        setFileLoading(false);
      });
      reader.readAsDataURL(img);
    }
  };

  return {
    imageFile,
    setImageFile,
    isFileLoading,
    onFileChange
  };
};

export default useFileHandler;
