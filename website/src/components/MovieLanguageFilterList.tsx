import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    poster?: string,
    name?: string,
    description?: string,
    mainId?: any
}
const MovieLanguageFilterList: FC<Props> = ({ mainId, poster, name, description}) => {
    return (
        <div className="movie-card movie-car2">
            <Link className="overlaylink" to={`/newsdetails/${mainId}`}></Link>
            {/* <a href="/list" className="overlaylink"></a> */}
            <img src={poster} alt=""
                className="w-550 img-fluid" />
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


export default MovieLanguageFilterList  