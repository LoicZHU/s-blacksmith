import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactHowler from 'react-howler';

import Login from '../Login';
import Menu from '../Menu';
import AlbumTrack from './AlbumTrack';
import Player from './Player';
import { getAlbum } from '../../adapters/httpSpotifyApi';

import './album.scss';

interface IResponseProps {
  [key: string]: any;
}

interface IPreviewState {
  [key: string]: string;
}

function Album() {
  const [album, setAlbum] = useState<null | IResponseProps>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<null | number>(null);
  const [preview, setPreview] = useState<null | IPreviewState>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const fetchAlbum = useCallback(async (): Promise<void> => {
    setIsLoading(false);
    const res = await getAlbum(id);
    setAlbum(res.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchAlbum();
  }, [fetchAlbum]);

  const handleClickOnTrack = ({ previewUrl, name, artist, image }: any): void => {
    setPreview({ previewUrl, name, artist, image });

    const isCurrentPreviewUrlEqualsToClickedPreview = preview && previewUrl === preview['previewUrl'];

    if (isCurrentPreviewUrlEqualsToClickedPreview) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
    isCurrentPreviewUrlEqualsToClickedPreview ? setIsPlaying(!isPlaying) : setIsPlaying(true);
  };

  const selectTrack = (index: number): void => {
    index != selectedTrackIndex ? setSelectedTrackIndex(index) : setSelectedTrackIndex(null);
  };

  const isTokenInLocalStorage: string | null = localStorage.getItem('access_token');
  const albumYear: string = album?.release_date.split('-')[0];

  return (
    <>
      {!isTokenInLocalStorage ? (
        <Login />
      ) : (
        <div className={'album'}>
          <div className={'album__menu'}>
            <Menu />
          </div>
          <div className={'album__body'}>
            {!isLoading && album && (
              <div className={'album__body__infos'}>
                <img src={album.images[1].url} alt="" />
                <div className={'album__body__infos__description'}>
                  <div>ALBUM</div>
                  <h2>{album.name}</h2>
                  <div className={'album__body__infos__description__text'}>
                    <span>
                      {album.artists.length <= 1 ? (
                        <a href={album.artists[0].external_urls.spotify}>{album.artists[0].name}</a>
                      ) : (
                        album.artists.map((artist: IResponseProps, idx: number) => {
                          return idx != album.artists.length - 1 ? (
                            <a href={album.artists[0].external_urls.spotify}>{artist.name}, </a>
                          ) : (
                            <a href={album.artists[0].external_urls.spotify}>{artist.name}</a>
                          );
                        })
                      )}
                    </span>
                    <span>{albumYear}</span>
                    <span>
                      {album.total_tracks <= 1 ? `${album.total_tracks} chanson` : `${album.total_tracks} chansons`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className={'album__titles'}>
              <h3>TITRES</h3>
              {!isLoading && album?.tracks?.items.length <= 0 ? (
                <p>Aucun audio disponible.</p>
              ) : (
                <>
                  {album?.tracks?.items.map((item: IResponseProps, idx: number) => (
                    <div
                      className={`album__titles__album-track ${
                        idx == selectedTrackIndex ? 'album__titles__album-track--selected' : ''
                      }`}
                      key={idx}
                    >
                      <AlbumTrack
                        index={idx}
                        item={item}
                        album={album}
                        setPreview={handleClickOnTrack}
                        setIsPlaying={handleClickOnTrack}
                        selectTrackIndex={selectTrack}
                        isPlaying={isPlaying}
                      />
                    </div>
                  ))}
                  <div className={'album__titles__rights'}>
                    {album?.copyrights.map((item: IResponseProps, idx: number) => (
                      <small key={idx}>{item.text}</small>
                    ))}
                  </div>
                </>
              )}
            </div>
            {preview && <ReactHowler src={preview['previewUrl']} html5={true} playing={isPlaying} />}

            <div className={'album__player'}>
              <Player {...preview} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Album;
