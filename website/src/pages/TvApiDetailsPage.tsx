import { title } from "process";
import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ContentSlider from "../components/ContentSlider";
import ListItem from "../components/ListItem";
import MainSlider from "../components/MainSlider";
import {
  fetchMovieList,
  fetchMovieListLoadMore,
} from "../redux/action/moviesdataAction";
import { fetchMovieFilterDetail } from "../redux/action/moviesFilter";
import { fetchMovieLanguageFilterDetail } from "../redux/action/movielanguageFilter";
import { tvApiDetailsFilter } from "../redux/action/tvApiDetailsFilter";
// import { tvApiDetails } from "../redux/action/tvApiDetailsFilter";



type Props = {
  listData?: any;
  MovieFilterData?: any;
  MovieLanguageFilterData?: any;
  fetchMovieFilterDetail?: any;
  fetchMovieLanguageFilterDetail?: any;
  totalPage?: any;
  page?: any;
  fetchMovieList?: any;
  fetchMovieListLoadMore?: any;
  tvApiDetailsFilter?:any;
};

const TvApiDetailsPage: FC<Props> = ({
  listData,
  MovieFilterData,
  MovieLanguageFilterData,
  fetchMovieFilterDetail,
  fetchMovieLanguageFilterDetail,
  fetchMovieList,
  totalPage,
  page,
  fetchMovieListLoadMore,
  tvApiDetailsFilter
}) => {
  // let { id } = useParams();
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/assets/js/developer.js";
    script.async = true;

    document.body.appendChild(script);
    if (page) {
      fetchMovieList(page); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    fetchMovieFilterDetail();
    fetchMovieLanguageFilterDetail();
    tvApiDetailsFilter();
  }, []);

  const loadMore = () => {
    // setPage(page + 1);
    fetchMovieListLoadMore(page + 1);
  };

//   console.log("language data===========",MovieLanguageFilterData);
  

//   console.log("filter data123=========", MovieFilterData);

//   console.log("tv shows=========", listData);
console.log("tv detailsApi",tvApiDetailsFilter);
  return (
    <>
      <MainSlider />
      <section className="movie-slide1 movie-slide-mobile my-2">
        <div className="container-fluid container-padding2">
          <div className="row mt-5 mb-2 ">
            <div className="col-md-12 col-lg-5 col-12 filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>
                  <h4 className="drop-head">Filters :</h4>
                </div>
                <div className="dropdown filter drop1">
                  <button
                    className="btn btn-default dropdown-toggle"
                    type="button"
                    id="dropdown-1-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sources <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-1-menu-button"
                  >
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      First Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Second Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Third Action
                    </a>
                  </div>
                </div>

                <div className="dropdown filter drop2">
                  <button
                    className="btn dropdown-toggle "
                    type="button"
                    id="dropdown-2-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Type <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-2-menu-button"
                  >
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      First Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Second Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Third Action
                    </a>
                  </div>
                </div>

                <div className="dropdown filter drop3">
                  <button
                    className="btn dropdown-toggle "
                    type="button"
                    id="dropdown-3-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Genre12345 <i className="fa fa-angle-down ml-2"></i>
                  </button>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                  >
                    {MovieFilterData &&
                      MovieFilterData.length > 0 &&
                      MovieFilterData.map((item: any, index: number) => {
                        return (
                          <a className="dropdown-item" href={`/${item.id}`}>
                            {item.name}
                          </a>
                        );
                      })}

                    {/* <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Advanture
                    </a>
                    <a className="dropdown-item" href="#">
                      Animation
                    </a> */}
                  </div>
                </div>

                <div className="dropdown filter drop4">
                  <button
                    className="btn dropdown-toggle "
                    type="button"
                    id="dropdown-4-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Language <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                  >
                    {MovieLanguageFilterData &&
                      MovieLanguageFilterData.length > 0 &&
                      MovieLanguageFilterData.map((item: any, index: number) => {
                        return (
                          <a className="dropdown-item" href={`/${item.id}`}>
                            {item.english_name}
                          </a>
                        );
                      })}

                    {/* <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Advanture
                    </a>
                    <a className="dropdown-item" href="#">
                      Animation
                    </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-6 col-12 filters-container-2  filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>
                  <h4 className="drop-head">Sort By :</h4>
                </div>
                <div className="dropdown filter drop5">
                  <button
                    className="btn dropdown-toggle "
                    type="button"
                    id="dropdown-1-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    All Movies <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-1-menu-button"
                  >
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      First Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Second Action
                    </a>
                    <a className="dropdown-item" href="#">
                      <input type="checkbox" />
                      Third Action
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 mb-5  ">
            <div className="col-md-10 col-lg-6 col-10">
              <div className="filters d-flex">
                <p className="filters-1">
                  Amazon Prime{" "}
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </p>
                <p className="filters-1">
                  Netflix{" "}
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </p>
                <p className="filters-1">
                  Clear All{" "}
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <span>hello</span>

          <div className="row movielistrow">
            {listData &&
              listData.length > 0 &&
              listData.map((item: any, index: number) => {
                return (
                  <div
                    className={`customcol movie-page-images`}
                    key={`list-item-${index}`}
                  >
                    {/* <ListItem poster={item.poster} name={item.name} description={item.description} /> */}
                    <ListItem
                      mainId={item.id}
                      poster={`${process.env.REACT_APP_IMDB_IMAGE_URL}${item.poster_path}`}
                      name={item.original_title}
                      //   description={item.description}
                    />
                  </div>
                );
              })}
          </div>
          {totalPage > page && (
            <div className="col-md-12 text-center">
              <button className="loadmore" onClick={() => loadMore()}>
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    MovieFilterData: state.movieFilterReducer.MovieFilterData,
    MovieLanguageFilterData: state.movielanguageFilterReducer.MovieLanguageFilterData,
    listData: state.moviesdataReducer.listData,
    totalPage: state.moviesdataReducer.totalPage,
    page: state.moviesdataReducer.page,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMovieList: (page: number,sort_by:any) => dispatch(fetchMovieList(page,sort_by)),
    fetchMovieListLoadMore: (page: number) =>
      dispatch(fetchMovieListLoadMore(page)),
    fetchMovieFilterDetail: () => dispatch(fetchMovieFilterDetail()),
    fetchMovieLanguageFilterDetail: () => dispatch(fetchMovieLanguageFilterDetail()),
    tvApiDetailsFilter: () => dispatch(tvApiDetailsFilter()),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TvApiDetailsPage);
