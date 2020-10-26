import React from 'react';
import ApiService from '../services/api.service';
import Album from './Album';

export default class AlbumList extends React.Component {
    constructor() {
        super();
        this.state = {
            albumList: [],
            albums: []
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.getAlbumList();
    }

    handleScroll = () => {
        let prevScroll = 500;
        if(window.scrollY > prevScroll) {
            this.getSingleAlbum();
            prevScroll+= 300;
        }
    }

    getAlbumList() {
        ApiService.getAlbumnList()
        .then(resp => {
            this.setState({albumList: resp.data});
            this.getInitialAlbum();
        });
    }

    getSingleAlbum() {
        let albumId = this.state.albums.length;
        if(albumId < this.state.albumList.length) {
            ApiService.getAlbum(this.state.albumList[albumId].id)
            .then(resp => {
                let photos = [];
                resp.data.forEach(p => {
                    photos.push(
                        <>
                            <img src={p.url} alt={p.title}></img>
                            <p>{p.id}</p>
                        </>
                    );
                });
                let albums = [...this.state.albums, photos];
                this.setState({albums: albums});
            });
        }
    }

    getInitialAlbum() {
        let promise = [];
        let albumsArr = [];
        this.state.albumList.slice(0, 3).forEach(album => {
            promise.push(ApiService.getAlbum(album.id));
        });

        Promise.all(promise).then(resp => {
            resp.forEach((album, index) => {
                let photos = [];
                album.data.forEach(p => {
                    photos.push( <>
                        <img src={p.url} alt={p.title}></img>
                        <p>{p.id}</p>
                    </>)
                });
                albumsArr.push(photos);
            });
            this.setState({albums: albumsArr});
        });
    }

    render() {
        return (
            <>

            { 
            this.state.albums.length > 0 && this.state.albums.map((a, i) => {
                return <Album key={i} albumInfo={this.state.albumList[i]} album={this.state.albums[i]}></Album>
            })
            }
            </>
        )
    }
}