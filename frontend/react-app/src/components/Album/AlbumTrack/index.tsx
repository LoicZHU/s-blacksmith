import './albumtrack.scss';

interface IProps {
  [key: string]: any;
}

function AlbumTrack(props: IProps) {
  const handleClick = (): void => {
    props.setPreview({
      previewUrl: props.item.preview_url,
      name: props.item.name,
      artist: props.album.artists[0].name,
      image: props.album.images[1].url,
    });
  };

  const convertMsToMnAndS = (millisec: number): string => {
    const min = Math.floor(millisec / 60000);
    const sec = +((millisec % 60000) / 1000).toFixed(0);
    return `${min}:${sec < 10 ? 0 : ''}${sec}`;
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`album-track`}
      key={props.item.id}
      onClick={() => props.selectTrackIndex(props.index)}
      onDoubleClick={handleClick}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={'album-track__number'} onClick={handleClick}>
        <div>{props.index + 1}</div>
      </div>
      <div className={`album-track__infos ${props.isPlaying ? 'album-track__infos--playing' : ''}`}>
        <div className={`album-track__infos__track ${props.isPlaying ? 'album-track__infos__track--playing' : ''}`}>
          <cite>{props.item.name}</cite>
        </div>
        <div>
          {props.item.artists.length <= 1 ? (
            <a href={props.item.artists[0].external_urls.spotify}>{props.item.artists[0].name}</a>
          ) : (
            props.item.artists.map((artist: any, idx: number) => {
              return idx != props.item.artists.length - 1 ? (
                <a href={artist.external_urls.spotify}>{artist.name}, </a>
              ) : (
                <a href={artist.external_urls.spotify}>{artist.name}</a>
              );
            })
          )}
        </div>
      </div>
      <div className={'album-track__duration'}>
        <span>{convertMsToMnAndS(props.item.duration_ms)}</span>
      </div>
    </div>
  );
}

export default AlbumTrack;
