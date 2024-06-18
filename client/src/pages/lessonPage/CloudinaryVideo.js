import React from 'react';

const CloudinaryVideo = ({ publicId, width, height }) => {
  const cloudinaryUrl = `https://res.cloudinary.com/your_cloud_name/video/upload/${publicId}.mp4`;

  return (
    <video width={width} height={height} controls>
      <source src={cloudinaryUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default CloudinaryVideo;
