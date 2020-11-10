import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Spinner, gga, balti } from './Utilities'
import { ArtistCard, ArtistTable } from './Artist'
import data from './data.json'
import api from './api.json'
import { ReactComponent as Brand } from './assets/brand.svg'
import { ReactComponent as Bizerte } from './assets/bizerte.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";

class Home extends React.Component {
  loading = true;

  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillUnmount() {
  }

  loadData() {
    const endpoint = api.url + 'channels?part=snippet%2CcontentDetails%2Cstatistics'
    const apiKey = api.key

    this.setState({
      loading: true
    })

    this.state.artists.map((artist, index) =>
      fetch(endpoint
        + '&id=' + artist.youtube
        + '&key=' + apiKey)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            if (result.items && result.items[0]) {
              const newArtist = {
                ...artist,
                avatar: result.items[0].snippet.thumbnails.default.url,
                subs: result.items[0].statistics.subscriberCount ? result.items[0].statistics.subscriberCount : 0,
                views: result.items[0].statistics.viewCount,
                videos: result.items[0].statistics.videoCount,
                uploads: result.items[0].contentDetails.relatedPlaylists.uploads,
                year: (new Date(result.items[0].snippet.publishedAt)).getFullYear()
              }
              this.setState({
                artists: this.state.artists.map(artist => artist.key === newArtist.key ? newArtist : artist),
              })
              this.loadUploads(newArtist, index)
            }
          },
          (error) => {
            console.log(error)
          }
        )
    )
  }

  loadUploads(artist, index) {
    const endpoint = api.url + 'playlists?part=snippet%2CcontentDetails%2Cplayer'
    const apiKey = api.key

    fetch(endpoint
      + '&id=' + artist.uploads
      + '&key=' + apiKey)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.items && result.items[0]) {
            const newArtist = {
              ...artist,
              player: result.items[0].player.embedHtml,
            }
            this.setState({
              artists: this.state.artists.map(artist => artist.key === newArtist.key ? newArtist : artist),
            })

            if (index == this.state.artists.length - 1) {
              this.sortBySubs(true)
              //this.sortByAvg()
              this.setState({
                loading: false
              })
            }
          }
        },
        (error) => {
          console.log(error)
        }
      )
  }

  sortBySubs(desc) {
    this.setState({
      artists: this.state.artists.sort((artist1, artist2) => desc ? artist2.subs - artist1.subs : artist1.subs - artist2.subs),
    })
  }

  sortByAvg() {
    this.setState({
      artists: this.state.artists.sort((artist1, artist2) => artist2.views / artist2.videos - artist1.views / artist1.videos),
    })
  }


  render() {
    if (this.state.loading) {
      return (
        <Spinner />
      )
    }
    else {
      return (
        <div className="home">
          <header className="App-header">
            <div className="container">
              <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={0} delay={1000}>
                <img src={gga}></img>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInUp" duration={2} animatePreScroll={true} animateOnce={true} offset={0}>
                <Brand />
                <h1 className="display-1">Welcome to the Tunisian Billboard</h1>
              </ScrollAnimation>
            </div>
          </header>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🔎 Discover</h2>
              <ArtistCard artist={this.state.artists[20 + Math.floor(Math.random() * (this.state.artists.length - 21))]} />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🚀 Best of 2020</h2>
              <ArtistCard artist={this.state.artists.find(artist => artist.key == 4)} />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">👑 King</h2>
              <ArtistCard artist={this.state.artists[0]} />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🥊 Unbeatable</h2>
              <ArtistCard artist={this.state.artists.find(artist => artist.key == 6)} />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🔥 Top 5 New Tunisian Artists on Youtube</h2>
              <ArtistTable artists={this.state.artists.filter(artist => (new Date()).getFullYear() - artist.year < 3).slice(0, 5)} />
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🌊 Top 5 Tunisian Artists from Bizerte on Youtube</h2>
              <div className="row">
                <div className="col-sm-12 col-md-3 d-flex justify-content-center align-items-center pb-3">
                  <Bizerte />
                </div>
                <div className="col">
                  <ArtistTable artists={this.state.artists.filter(artist => artist.region == "Bizerte").slice(0, 5)} />
                </div>
              </div>
            </section>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeIn" duration={2} animateOnce={true} offset={300}>
            <section className="container mb-5">
              <h2 className="h2 mb-3">🏆 Top 20 Tunisian Artists on Youtube</h2>
              <ArtistTable artists={this.state.artists.slice(0, 20)} />
            </section>
          </ScrollAnimation>
        </div>
      );
    }
  }
}

export default Home;
