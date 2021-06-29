import './player.scss';

interface IPlayersProps {
  [key: string]: string;
}

function Player({ name, artist, image }: IPlayersProps) {
  return (
    <div className={'player'}>
      {!name ? (
        <div>Aucun audio en lecture.</div>
      ) : (
        <>
          <div className={'player__track'}>
            <img src={image} alt="" />
            <div className={'player__track__infos'}>
              <div className={'player__track__infos__name'}>{name}</div>
              <div className={'player__track__infos__artist'}>{artist}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Player;
