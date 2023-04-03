import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from './3819552.jpg';

type Props = {
    poster?: string,
    name?: string,
    description?: string,
    mainId?: any
}
const MovieFilterlist: FC<Props> = ({ mainId, poster, name, description}) => {
    return (
        <div className="movie-card movie-car2">
            <Link className="overlaylink" to={`/newsdetails/${mainId}`}></Link>
            {/* <a href="/list" className="overlaylink"></a> */}
            {poster !== undefined && poster.match("w200null") ? <img src={logo} alt="No imag" className="w-550 img-fluid"  /> :<img src={poster} alt=""
                className="w-550 img-fluid" /> }
           
            <div className="on-hover">
                <div className="on-hover-absolute">
                    <h4>{name}</h4>
                    <h6>{description}</h6>
                    <p><a href="#"><i className="fa fa-plus mr-2"></i>Watchlist</a></p>
                </div>
            </div>
        </div>
    )
}


export default MovieFilterlist  