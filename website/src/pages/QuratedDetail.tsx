import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentSlider from "../components/ContentSlider"
import ListItem from '../components/QuratedListItem';
import MainSlider from '../components/MainSlider';
import ReviewItem from '../components/ReviewItem';
import { fetchQuratedDataDetail } from '../redux/action/QuratedDetailAction';

type Props = {
    QuratedDetailData?: any,
    fetchQuratedDataDetail?: any
}

const QuratedDetail: FC<Props> = ({ QuratedDetailData, fetchQuratedDataDetail }) => {

    let { id } = useParams();
    const data = [
        {
            poster: './assets/images/Reel-Martini/img_4.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_5.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_6.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_7.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_8.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_9.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_10.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_11.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_12.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_13.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
        {
            poster: './assets/images/Reel-Martini/img_14.png',
            name: 'Movie Name',
            description: '2022 -Hindi - Mythology'
        },
    ]
    var actorsArray: any = [];
    var screenplayArray: any = [];
    var directorArray: any = [];

    useEffect(() => {
        setTimeout(() => {            
            const script = document.createElement('script');            
            script.src = "/assets/js/developer.js";
            script.async = true;    
            document.body.appendChild(script);    
            return () => {
                document.body.removeChild(script);
            }
        }, 1000);
    }, [QuratedDetailData]);

    useEffect(() => {
        fetchQuratedDataDetail(id)// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    console.log(QuratedDetailData)

    return (
        <>
            <section className="mx-4">
                <div className="container review-section ">
                    <div className="section-padding">
                        <div className="row">
                            {/* <div className="col-md-6 col-lg-4 pl-lg-1">
                                <div className="movie-review-image">
                                    <img src={`${process.env.REACT_APP_API_URL}/${QuratedDetailData.image}`} alt="" />
                                </div>
                            </div> */}
                            <div className="col-md-12 col-lg-12 my-auto">
                                <div className="row">
                                    {/* <div className="col-md-12 col-lg-12">
                                    <h4 className="movie-overview">Title</h4>
                                        <h2 className="movie-name-review">{QuratedDetailData && QuratedDetailData.title}</h2>
                                    </div> */}
                                    <div className="col-md-12 col-lg-6 col-12">
                                        {/* <p className="movie-year">&nbsp;2022 - English - Action - 2h 11m</p> */}
                                    </div>
                                    {/* <div className="col-md-12 col-lg-6 col-12">
                                        <p className="movie-realsedate">&nbsp;Release Date: <span>{QuratedDetailData && QuratedDetailData.release_date}</span>
                                        </p>
                                    </div> */}
                                    {/* <div className="col-md-12 col-lg-5 col-12">
                                        <div className="footer-menu my-2 my-lg-0">
                                            <a href="#" className="social-media-reel"><i className="fa fa-plus ml-0"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-eye"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-thumbs-up"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-thumbs-down"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-share-alt"></i></a>
                                        </div>
                                    </div> */}
                                    {/* <div className="col-md-12 col-lg-6 col-12 my-auto">
                                        <a href="#">
                                            <p className="movie-watchtrailer"><i className="fa fa-play"></i> &nbsp;Watch Trailer</p>
                                        </a>
                                    </div> */}
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        {/* <h4 className="movie-overview">Description</h4> */}
                                        <p className="movie-overview-2">
                                            {QuratedDetailData && <div className='meet' dangerouslySetInnerHTML={{__html: QuratedDetailData.description}}></div>}
                                        </p>
                                    </div>
                                </div>

                                {/* <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <h4 className="movie-overview">Actor</h4>
                                        {
                                            QuratedDetailData && QuratedDetailData.credits && QuratedDetailData.credits.cast.map((cast: any, index: number) => {
                                                actorsArray.push(cast.name);
                                            })
                                        }
                                        <p className="movie-overview-2">{actorsArray.join(',')}</p>                                      
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <h4 className="movie-overview">Screenplay</h4>
                                        {
                                            QuratedDetailData && QuratedDetailData.credits && QuratedDetailData.credits.crew.filter((crew: any) => crew.known_for_department === 'Writing').map((cast: any, index: number) => {
                                                screenplayArray.push(cast.name);
                                            })
                                        }
                                        <p className="movie-overview-2">{screenplayArray.join(',')}</p>
                                    </div>
                                    <div className="col-lg-5 col-md-12">
                                        <h4 className="movie-overview">Director</h4>
                                        {
                                            QuratedDetailData && QuratedDetailData.credits && QuratedDetailData.credits.crew.filter((crew: any) => crew.known_for_department === 'Directing').map((cast: any, index: number) => {
                                                directorArray.push(cast.name);
                                            })
                                        }
                                        <p className="movie-overview-2">{directorArray.join(',')}</p>
                                    </div>
                                    <div className="col-md-12 col-lg-4">
                                        <h4 className="movie-overview">Where to Watch</h4>
                                        <div className="movie-border row">
                                            <div className="col-md-6 col-6">
                                                <img src="/assets/images/Reel-Martini/img_detail_3.png" alt="" />
                                            </div>
                                            <div className="col-md-6 col-6 my-auto">
                                                <p className="movie-rent mb-2">Rent</p>
                                                <p className="movie-rent">$ 2.99 HD</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4">
                                        <h4 className="movie-overview">Rating</h4>
                                        <div className="movie-border row">
                                            <div className="col-md-6 col-6">
                                                <img src="/assets/images/Reel-Martini/Img_IMDB.png" alt="" />
                                            </div>
                                            <div className="col-md-6 col-6 my-auto">
                                                <p className="movie-rent mb-2">Rating</p>
                                                <p className="movie-rent"><span>{QuratedDetailData.vote_average}</span>/10</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4">
                                        <h4 className="movie-overview">Rating</h4>
                                        <div className="movie-border row">
                                            <div className="col-md-6 col-6">
                                                <img src="/assets/images/Reel-Martini/img_rotten.png" alt="" />
                                            </div>
                                            <div className="col-md-6 col-6 my-auto">
                                                <p className="movie-rent mb-2">Rating</p>
                                                <p className="movie-rent"><span>5.7</span>/10</p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="movie-slide5 movie-slide-mobile mt-5">
                <div className="container">
                    {/* <div className="row">
                        <div className="col-md-6  col-7  movie-headings">
                            <h2 className="sectional-heading fs-20 section-name">Reviews</h2>
                        </div>
                        <div className="col-md-6  col-5  movie-headings">
                            <a href="#" className="sectional-heading fs-20 view-btn">View All <i className="fa fa-angle-right"
                                aria-hidden="true"></i> </a>
                        </div>
                    </div> */}
                    <div className="row">
                        {
                            QuratedDetailData && QuratedDetailData.reviews && QuratedDetailData.reviews.results.length > 0 &&
                            QuratedDetailData.reviews.results.map((item: any, index: number) => {
                                let imgUrl = item.author_details.avatar_path.includes('http') ? item.author_details.avatar_path.substring(1) : `${process.env.REACT_APP_IMDB_ORIGINAL_IMAGE_URL}${item.author_details.avatar_path}`;
                                return (
                                    <div className="col-lg-6 col-md-6 col-12 pl-lg-0" key={`rewiew-${item.id}`}>
                                        <div className="inner-padding">
                                            <ReviewItem profileImage={imgUrl} name={item.author} username={item.author_details.username} description={item.content} date={item.created_at} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <section className="movie-slide1 movie-slide-mobile">
                {/* <div className="container-fluid container-padding2">
                    <div className="row">
                        <ContentSlider title="Similar Movies" data={QuratedDetailData && QuratedDetailData.similar && QuratedDetailData.similar.results} />
                    </div>
                </div> */}
            </section>
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        QuratedDetailData: state.QuratedDetailReducer.QuratedDetailData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchQuratedDataDetail: (id: any) => dispatch(fetchQuratedDataDetail(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuratedDetail);
