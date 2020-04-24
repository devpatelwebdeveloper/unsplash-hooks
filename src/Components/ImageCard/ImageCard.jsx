import React from "react";
import { Instagram, Twitter, Download } from "../Icons/Iconpaths";

const ImageCard = ({ imageData, imageIndex, onImageClicked }) => {
  const { urls, alt_description, user, links, color } = imageData;

  return (
    <div className="masonry-brick" style={{ display: "none" }}>
      <div
        className="image-card masonry-content"
        style={{
          background: color,
        }}
        data-card-index={`${imageIndex}`}
      >
        <img className="image" src={urls.regular} alt={alt_description} />
        <div
          className="image-card--clickable-area"
          onClick={() => {
            onImageClicked(imageData);
            document.title = alt_description;
          }}
        />
        <div className="image-card--options">
          <div className="user-info">
            <a href={user.links.html} target="_blank_" tabIndex="-1">
              <img src={user.profile_image.medium} alt={user.name} />
            </a>
            <h3>{user.name}</h3>
          </div>
          <div className="links">
            <a
              className="link"
              href={`https://instagram.com/${user.instagram_username}`}
              style={{
                display: user.instagram_username ? "block" : "none",
              }}
              target="_blank_"
              tabIndex="-1"
            >
              <div className="icon instagram">{Instagram}</div>
            </a>

            <a
              className="link"
              href={`https://twitter.com/${user.twitter_username}`}
              style={{
                display: user.twitter_username ? "block" : "none",
              }}
              target="_blank_"
              tabIndex="-1"
            >
              <div className="icon twitter">{Twitter}</div>
            </a>

            <a
              className="link"
              href={`${links.download}?force=true`}
              tabIndex="-1"
            >
              <div className="icon download">{Download}</div>
            </a>
          </div>
        </div>
        <div
          className="image-card-fg"
          style={{
            background: color,
          }}
        />
      </div>
    </div>
  );
};

export default ImageCard;
