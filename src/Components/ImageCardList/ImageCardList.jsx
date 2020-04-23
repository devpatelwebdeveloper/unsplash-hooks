import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import "./ImageCardList.scss";

const ImageCardList = ({ images, onImageClicked }) => {
  return (
    <div className="masonry">
      {images.map((image, index) => (
        <ImageCard
          imageData={image}
          key={image.id}
          imageIndex={index}
          onImageClicked={(img) => onImageClicked(img)}
        />
      ))}
    </div>
  );
};

export default ImageCardList;
