import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ContentSlider from "../components/ContentSlider"
import ListItem from '../components/ListItem';
import MainSlider from '../components/MainSlider';
import ReviewItem from '../components/ReviewItem';
import { fetchDetail } from '../redux/action/detailAction';
import logo from './3819552.jpg';

type Props = {
    detailData?: any,
    fetchDetail?: any
}

const Detail: FC<Props> = ({ detailData, fetchDetail }) => {

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
    }, [detailData]);

    useEffect(() => {
        fetchDetail(id)// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <>
            <section className="mx-4">
                <div className="container review-section ">
                    <div className="section-padding">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 pl-lg-1">
                                <div className="movie-review-image">
                                {detailData.poster_path == null ? <img src={logo}  alt="" className='w-100'/> : 
                                    <img src={`${process.env.REACT_APP_IMDB_IMAGE_URL}${detailData.poster_path}`} alt="" className='w-100'/> }
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-8 my-auto">
                                <div className="row">
                                    <div className="col-md-12 col-lg-12">
                                        <h2 className="movie-name-review">{detailData && detailData.title}</h2>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-12">
                                        {/* <p className="movie-year">&nbsp;2022 - English - Action - 2h 11m</p> */}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-12">
                                        <p className="movie-realsedate">&nbsp;Release Date: <span>{detailData && detailData.release_date}</span>
                                        </p>
                                    </div>
                                    <div className="col-md-12 col-lg-5 col-12">
                                        <div className="footer-menu my-2 my-lg-0">
                                            <a href="#" className="social-media-reel"><i className="fa fa-plus ml-0"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-eye"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-thumbs-up"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-thumbs-down"></i></a>
                                            <a href="#" className="social-media-reel"><i className="fa fa-share-alt"></i></a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-12 my-auto">
                                        <a href="#">
                                            <p className="movie-watchtrailer"><i className="fa fa-play"></i> &nbsp;Watch Trailer</p>
                                        </a>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <h4 className="movie-overview">Overview</h4>
                                        <p className="movie-overview-2">{detailData && detailData.overview}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-6">
                                        <h4 className="movie-overview">Actor</h4>
                                        {
                                            detailData && detailData.credits && detailData.credits.cast.map((cast: any, index: number) => {
                                                actorsArray.push(cast.name);
                                            })
                                        }
                                        <p className="movie-overview-2">{actorsArray.join(',')}</p>                                      
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <h4 className="movie-overview">Screenplay</h4>
                                        {
                                            detailData && detailData.credits && detailData.credits.crew.filter((crew: any) => crew.known_for_department === 'Writing').map((cast: any, index: number) => {
                                                screenplayArray.push(cast.name);
                                            })
                                        }
                                        <p className="movie-overview-2">{screenplayArray.join(',')}</p>
                                    </div>
                                    <div className="col-lg-5 col-md-12">
                                        <h4 className="movie-overview">Director</h4>
                                        {
                                            detailData && detailData.credits && detailData.credits.crew.filter((crew: any) => crew.known_for_department === 'Directing').map((cast: any, index: number) => {
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
                                                <p className="movie-rent"><span>{detailData.vote_average}</span>/10</p>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="movie-slide5 movie-slide-mobile mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6  col-7  movie-headings">
                            <h2 className="sectional-heading fs-20 section-name">Reviews</h2>
                        </div>
                        <div className="col-md-6  col-5  movie-headings">
                            <a href="#" className="sectional-heading fs-20 view-btn">View All <i className="fa fa-angle-right"
                                aria-hidden="true"></i> </a>
                        </div>
                    </div>
                    <div className="row">
                        {
                            detailData && detailData.reviews && detailData.reviews.results.length > 0 &&
                            detailData.reviews.results.map((item: any, index: number) => {
                                // let imgUrl = item.author_details.avatar_path.includes('http') ? item.author_details.avatar_path.substring(1) : `${process.env.REACT_APP_IMDB_ORIGINAL_IMAGE_URL}${item.author_details.avatar_path}`;
                                 let imgUrl =  `${process.env.REACT_APP_IMDB_ORIGINAL_IMAGE_URL}${item.author_details.avatar_path}`;
                               
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
                <div className="container-fluid container-padding2">
                    <div className="row">
                        <ContentSlider title="Similar Movies" data={detailData && detailData.similar && detailData.similar.results} />
                    </div>
                </div>
            </section>
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        detailData: state.detailReducer.detailData,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchDetail: (id: any) => dispatch(fetchDetail(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
