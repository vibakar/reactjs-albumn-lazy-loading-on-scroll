import CarouselSlider from 'react-carousel-slider';

function Album(props) {
    
    return (
        <>
            <div className="album">
                <h4 className="ml-5">{props.albumInfo.title}</h4>
                <p className="ml-5">
                    <span>Id: {props.albumInfo.id}</span>&nbsp;
                    <span>UserId: {props.albumInfo.userId}</span>
                </p>
                <hr></hr>
                <CarouselSlider key={props.album.id + 1000} slideCpnts={props.album}></CarouselSlider>
            </div>
        </>
    )
}

export default Album;