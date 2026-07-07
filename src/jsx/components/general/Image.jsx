import useIsVisible from '../../helpers/UseIsVisible.js';

import './Image.css';

function Image({ alt, caption, image_url, parallax = false }) {
  const [imageRef, isVisible] = useIsVisible();

  return (
    <figure className="image">
      {parallax ? (
        <div className="parallax_container" style={{ opacity: isVisible ? '1' : '0', top: isVisible ? '0px' : '50px' }}>
          <img ref={imageRef} src={image_url} alt={alt} />
        </div>
      ) : (
        <img ref={imageRef} src={image_url} alt={alt} />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default Image;
