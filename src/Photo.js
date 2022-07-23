import React from "react";

const Photo = ({
  urls: { regular },
  alt_discription,
  likes,
  // this is  deep distructuring
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">
      <img src={regular} alt={alt_discription} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
