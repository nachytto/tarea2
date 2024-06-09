import React, { useEffect, useState } from 'react';
import { useLikes } from '../components/LikesContext';
import { createClient } from 'pexels';

export const Favoritos = () => {
  const { likes } = useLikes();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const client = createClient('hHn0MQpqe1pmewb2UlVCA99TGC9j9OQ2cmgClw2PolozWWzq4MRCEFLi');

    const fetchFavoriteImages = async () => {
      const imagePromises = likes.map(async (id) => {
        const photo = await client.photos.show({ id });
        return photo;
      });

      const favoriteImages = await Promise.all(imagePromises);
      setImages(favoriteImages);
    };

    fetchFavoriteImages();
  }, [likes]);

  return (
    <div className="container-favoritos">
      <section>
        <h1>Imagenes Favoritas</h1>
        <div className="image-container">
          {images.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.src.medium} alt={image.photographer} className='img' />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
