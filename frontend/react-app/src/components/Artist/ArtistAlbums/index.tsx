import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { getArtistAlbums } from '../../../adapters/httpSpotifyApi';

import './artistalbums.scss';

interface IResponseProps {
  [key: string]: any;
}

function ArtistAlbums() {
  const [albums, setAlbums] = useState<null | IResponseProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchArtistAlbums = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const res = await getArtistAlbums();
    setAlbums(res?.data?.items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchArtistAlbums();
  }, [fetchArtistAlbums]);

  return (
    <div className={'artist-albums'}>
      {!isLoading && albums?.length <= 0 ? (
        <p className={'artist-albums__none'}>Aucun album disponible.</p>
      ) : (
        albums?.map(function showInfos(album: IResponseProps, idx: number) {
          return (
            <div className={'artist-albums__card'} key={idx}>
              <Link className={'artist-albums__card__link'} to={`/album/${album.id}`}>
                <div>
                  <img src={album.images[1].url} alt="" />
                </div>
                <div className={'artist-albums__card__link__album'}>
                  <h3>{album.name}</h3>
                </div>
              </Link>
              <div className={'artist-albums__card__artist'}>
                {album.artists.length <= 1 ? (
                  <a href={album.artists[0].external_urls.spotify}>{album.artists[0].name}</a>
                ) : (
                  albums.artists.map(function showName(artist: IResponseProps, idx: number) {
                    return idx != albums.artists.length - 1 ? `${artist.name}, ` : `${artist.name}`;
                  })
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ArtistAlbums;
