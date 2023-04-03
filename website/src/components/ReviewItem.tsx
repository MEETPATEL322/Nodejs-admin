import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';


type Props = {
    profileImage?: string,
    name?: string,
    username?: string,
    description?: string,
    date?: string,
}

const ReviewItem: FC<Props> = ({ profileImage, name, username, description, date }) => {
    return (
        <div className="row">
            <div className="col-lg-2 col-md-3 pr-lg-0">
                <img src={profileImage} alt={name} className="user-profile-image rounded-circle " />
            </div>
            <div className="col-lg-10 col-md-9 pl-lg-0">
                <div className="d-lg-flex d-block d-md-flex">
                    <div className="lh-1">
                        <p className="code-profile">A review by {name}</p>
                        <p className="code-deatils">Written by <span>{username}</span> on <span>{date}</span></p>
                    </div>
                </div>
                <div className="review-code-data"><ReadMoreReact text={description} readMoreText="See More..." /></div>
            </div>
        </div>
    )
}


export default ReviewItem  