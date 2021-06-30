import { useCallback, useEffect, useState } from 'react';

import { getMySavedAlbums } from '../../../adapters/httpSpotifyApi';

import './myalbums.scss';

interface IResponseProps {
  [key: string]: any;
}

function MyAlbums() {
  const [myAlbums, setMyAlbums] = useState<null | IResponseProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMySavedAlbums = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    const res = await getMySavedAlbums();
    setMyAlbums(res?.data?.items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMySavedAlbums();
  }, [fetchMySavedAlbums]);

  return (
    <div className={'my-albums'}>
      {!isLoading && myAlbums?.length <= 0 ? (
        <p className={'my-albums__none'}>Aucun album préféré.</p>
      ) : (
        myAlbums?.map(function showInfos(album: IResponseProps, idx: number) {
          return (
            <div className={'my-albums__card'} key={idx}>
              <a className={'my-albums__card__link'} href={album.album.external_urls.spotify}>
                <div>
                  <img src={album.album.images[1].url} alt="" />
                </div>
                <div className={'my-albums__card__link__album'}>
                  <h3>{album.album.name}</h3>
                </div>
              </a>
              <div className={'my-albums__card__artist'}>
                {album.album.artists.length <= 1 ? (
                  <a href={album.album.artists[0].external_urls.spotify}>{album.album.artists[0].name}</a>
                ) : (
                  album.album.artists.map(function showName(artist: IResponseProps, idx: number) {
                    return idx != album.album.artists.length - 1 ? (
                      <a href={artist.external_urls.spotify} key={idx}>{artist.name}, </a>
                    ) : (
                      <a href={artist.external_urls.spotify} key={idx}>{artist.name}</a>
                    );
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

export default MyAlbums;
