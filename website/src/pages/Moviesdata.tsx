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
import { fetchLanguageApiFilterDetail } from "../redux/action/LanguageFilter";
import { fetchMovieLanguageListLoadMore } from "../redux/action/languagedataAction";
import { fetchList, fetchListLoadMore, fetchMultiList, fetchListMultiLoadMore } from '../redux/action/listAction';



type Props = {
  listData?: any;
  id?:number;
  MovieFilterData?: any;
  MovieLanguageFilterData?: any;
  fetchMovieFilterDetail?: any;
  fetchMovieLanguageFilterDetail?: any;
  totalPage?: any;
  page?: any;
  year?: any;
  language?: any;
  fetchMovieList?: any;
  fetchMovieListLoadMore?: any;
  MovieLanguageApiFilterData?: any;
  fetchLanguageApiFilterDetail?:any;
  fetchList?: any;
  fetchListLoadMore?: any;
  fetchMovieLanguageListLoadMore?:any;
  movieId?: any;
  fetchMultiList?: any;
};

const Moviesdata: FC<Props> = ({
  listData,
  MovieFilterData,
  MovieLanguageFilterData,
  fetchMovieFilterDetail,
  fetchMovieLanguageFilterDetail,
  fetchMovieList,
  totalPage,
  page,
  language,
  year,
  fetchMovieListLoadMore,
  MovieLanguageApiFilterData,
  fetchLanguageApiFilterDetail,
  movieId
  
}) => {
  let { id } = useParams();
  let { lang } = useParams();
  movieId = id;
  useEffect(() => {
    const script = document.createElement("script");
    console.log('id1122======>>>>>>>>',id);
    

    script.src = "/assets/js/developer.js";
    script.async = true;

    document.body.appendChild(script);
    if (listData) {
      fetchMovieList(page,sortByValue); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    if (id && !lang) {
      console.log("In use effect========", id)
      fetchList(id, page,sortByValue)// eslint-disable-next-line react-hooks/exhaustive-deps
  }
  else if (id && lang) {
      console.log("In use effect========0..0.012", id, lang)
      fetchMultiList(id, page, lang,sortByValue)
  }
    // if (page) {
    //   fetchMovieList(page); // eslint-disable-next-line react-hooks/exhaustive-deps
    // }
    fetchMovieFilterDetail();
    fetchMovieLanguageFilterDetail();
    fetchLanguageApiFilterDetail(language, id);
  },[]);
  

  const loadMore = () => {
    // setPage(page + 1);
    fetchMovieListLoadMore(page + 1);
    fetchListLoadMore(id, page + 1);
    fetchMovieLanguageListLoadMore(page + 1);
  };

  const [select, setSelect] = useState('Genre')
  const handleChange = (event:any) =>{
    setSelect(event.target.attributes.getNamedItem('data-name').value);
  } 

  console.log("language data===========",MovieLanguageFilterData);
  const changeValue = () => {

  }
  const [sortByValue, setsortByValue] = useState('')
  const sortBy = (event:any) => {
    var elements = document.querySelectorAll('#order-menu > .bg-primary');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('bg-primary');
    }
    setsortByValue(event.target.getAttribute("data-value"))
    event.target.classList.add("bg-primary");
    fetchMovieList(page,event.target.getAttribute("data-value"))
  }
  console.log("filter data11=========", MovieFilterData);

  // console.log("tv shows=========", listData);
  return (
    <>
      <MainSlider />
      <section className="movie-slide1 movie-slide-mobile my-2 movielistpage">
        <div className="container-fluid container-padding2">
          <div className="row mt-5 mb-2 ">
            <div className="filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>
                  <h4 className="drop-head">Filters :</h4>
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
                    Genre <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                  >
                    {MovieFilterData &&
                      MovieFilterData.length > 0 &&
                      MovieFilterData.map((item: any, index: number) => {
                        const active = item.id == movieId ? 'bg-primary' : '';
                        return (
                          <Link
                          className={"dropdown-item "+active}
                          to={`/movies/${item.id}`}
                          onClick={handleChange} data-name={item.name}
                        >
                          {item.name}
                        </Link>
                        );
                      })}
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
                          <Link className="dropdown-item" to={`/movies/${item.iso_639_1}`}>
                            {item.english_name}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="filters-container-2  filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>
                  {/* <h4 className="drop-head">Sort By :</h4> */}
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
                    Sort By <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-1-menu-button" id="order-menu"
                  >
                    <a className="dropdown-item bg-primary pointer_link" onClick={sortBy} data-value="">
                     Select Order
                    </a>
                    <a className="dropdown-item pointer_link" onClick={sortBy} data-value="popularity.asc">
                      popularity.asc
                    </a>
                    <a className="dropdown-item pointer_link" onClick={sortBy} data-value="popularity.desc">
                      popularity.desc
                    </a>
                    <a className="dropdown-item pointer_link" onClick={sortBy} data-value="release_date.asc">
                      release_date.asc
                    </a>
                    <a className="dropdown-item pointer_link" onClick={sortBy} data-value="release_date.desc">
                      release_date.desc
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row movielistrow">
            {
            listData &&
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
    MovieLanguageApiFilterData:state.LanguageFilterReducer.MovieLanguageApiFilterData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMovieList: (page: number,sort_by:any) => dispatch(fetchMovieList(page,sort_by)),
    fetchMovieListLoadMore: (page: number) =>dispatch(fetchMovieListLoadMore(page)),
    fetchMovieFilterDetail: () => dispatch(fetchMovieFilterDetail()),
    fetchMovieLanguageFilterDetail: () => dispatch(fetchMovieLanguageFilterDetail()),
    fetchLanguageApiFilterDetail: (id: any,language: any) => dispatch(fetchLanguageApiFilterDetail(language,id)),
 
    fetchList: (id: any, page: number,sort_by:any) => dispatch(fetchList(id, page,sort_by)),
    fetchListLoadMore: (id: any, page: number) =>dispatch(fetchListLoadMore(id, page)),
    fetchMultiList: (id: any, page: number, lang: any,sort_by:any) => dispatch(fetchMultiList(id, page, lang,sort_by)),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Moviesdata);
