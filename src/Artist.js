import {Table, Button} from 'react-bootstrap';
import { format, YoutubeIcon, EyeIcon } from './Utilities'

function ArtistCard({artist}) {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-4 d-flex flex-column justify-content-center text-center">
        <div className="row">
          <div className="col-md-12 mb-3">
            <h3 className="display-3">{artist.name}</h3>
            <img className="rounded-circle" src={artist.avatar} height="104"></img>
          </div>
          <div className="col-sm-6 col-md-12 mb-3">
            <h5><YoutubeIcon/> Subscribers</h5>
            <h4 className="display-4">{format(artist.subs)}</h4>
          </div>
          <div className="col-sm-6 col-md-12 mb-3">
            <h5><EyeIcon/> Views</h5>
            <h4 className="display-4">{format(artist.views)}</h4>
          </div>
        </div>
      </div>
      <div className="col-sm-12 col-md d-flex flex-column justify-content-center">
        <div className="embed-responsive embed-responsive-16by9" dangerouslySetInnerHTML={{
          __html: artist.player?.slice(0, 42) + 's' + artist.player?.slice(42, artist.player.length)
          }}>
        </div>
      </div>
    </div>
  )
}

function ArtistLine(props) {
  const artist = props.artist;
  return (
    <tr>
      <td className="text-center align-middle">{props.rank}</td>
      <td className="align-middle">
        <img className="rounded-circle" src={artist.avatar} height="52"></img>  {artist.name}
      </td>
       {/*<td className="text-center align-middle">{artist.type}</td>*/}
      <td className="text-center align-middle">{format(artist.subs)}</td>
      <td className="text-center align-middle">{format(artist.views)}</td>
       {/*<td className="text-center align-middle">{format(artist.videos)}</td>
      <td className="text-center align-middle">{artist.region}</td>
      <td className="text-center align-middle">{(new Date()).getFullYear() - artist.year + 1}</td>*/}
      <td className="text-center align-middle"><Button variant="danger" href={'https://www.youtube.com/channel/'+artist.youtube} target="_blank"><YoutubeIcon/></Button></td>
    </tr>
  )
}

function ArtistTable(props) {
  return (
    <Table bordered hover responsive variant="dark">
      <thead>
        <tr>
          <th className="text-center" colSpan="1">#</th>
          <th colSpan="1">Artist</th>
          {/*<th className="text-center" colSpan="1">Type</th>*/}
          <th className="text-center" colSpan="1">Subscribers</th>
          <th className="text-center" colSpan="1">Views</th>
          {/*<th className="text-center" colSpan="1">Videos</th>
          <th className="text-center" colSpan="1">Region</th>
          <th className="text-center" colSpan="1">Channel Age</th>*/}
          <th className="text-center" colSpan="1">Channel</th>
        </tr>
      </thead>
      <tbody>
        {props.artists.map((artist, index) => <ArtistLine artist={artist} rank={index + 1} />)}
      </tbody>
    </Table>
  );
}

export {ArtistCard, ArtistLine, ArtistTable} ;