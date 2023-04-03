import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ContentSlider from "../components/ContentSlider";
import ListItem from "../components/ListItem";
import MainSlider from "../components/MainSlider";
// import { fetchList, fetchListLoadMore } from "../redux/action/listAction";
import {
  fetchMovieList,
  fetchMovieListLoadMore,
} from "../redux/action/moviesdataAction";
import { fetchMovieFilterDetail } from "../redux/action/moviesFilter";
import { fetchLanguageApiFilterDetail } from "../redux/action/LanguageFilter";
import { fetchMovieLanguageFilterDetail } from "../redux/action/movielanguageFilter";
import { fetchMovieLanguageListLoadMore } from "../redux/action/languagedataAction";
import {
  fetchList,
  fetchListLoadMore,
  fetchMultiList,
  fetchListMultiLoadMore,
} from "../redux/action/listAction";

type Props = {
  listData?: any;
  totalPage?: any;
  page?: any;
  year?: any;
  languageId?: any;
  fetchList?: any;
  MovieFilterData?: any;
  MovieLanguageApiFilterData?: any;
  MovieLanguageFilterData?: any;
  fetchListLoadMore?: any;
  fetchMovieList?: any;
  fetchMovieListLoadMore?: any;
  fetchMovieLanguageListLoadMore?: any;
  fetchMovieFilterDetail?: any;
  fetchMovieLanguageFilterDetail?: any;
  fetchLanguageApiFilterDetail?: any;
  movieId?: any;
  fetchMultiList?: any;
  langId?: any;
};

const List: FC<Props> = ({
  listData,
  fetchList,
  totalPage,
  page,
  languageId,
  year,
  fetchListLoadMore,
  MovieFilterData,
  MovieLanguageFilterData,
  fetchMovieFilterDetail,
  fetchMovieList,
  MovieLanguageApiFilterData,
  fetchMovieLanguageFilterDetail,
  fetchLanguageApiFilterDetail,
  movieId,
  fetchMultiList,
  langId,
}) => {
  let { id } = useParams();

  let { lang } = useParams();
  movieId = id;
  // console.log("MovieId",movieId);

  langId = lang;
  // console.log("lang11",langId);

  // langId = id;
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/assets/js/developer.js";
    script.async = true;

    document.body.appendChild(script);
    if (id) {
      // console.log("In use effect========", id);
      // console.log("id1212", id);
      fetchList(id, page,sortByValue);
      // fetchLanguageList(id,page)
      // fetchList(id, page); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    if (id && !lang) {
      fetchList(id, page,sortByValue);
      // fetchLanguageList(id,page)
      // console.log("In use effect========", id);
      // fetchList(id, page); // eslint-disable-next-line react-hooks/exhaustive-deps
    } else if (id && lang) {
      console.log(id);
      // console.log("In use effect11========0..0.012", id, lang);
      fetchMultiList(id, page, lang,sortByValue);
    }
    fetchMovieFilterDetail();
    fetchMovieLanguageFilterDetail();
    fetchLanguageApiFilterDetail(languageId, id);
  }, []);
  const loadMore = () => {
    // setPage(page + 1);
    fetchListLoadMore(id, page + 1);
    fetchMovieListLoadMore(page + 1);
    fetchMovieLanguageListLoadMore(page + 1);
  };
  const [select, setSelect] = useState("Genre");
  const [sortByValue, setsortByValue] = useState('')
  const handleChange = (event: any) => {
    var regex = /^[0-9]+$/;
    var value = event.target.attributes.getNamedItem("data-id").value;
    if (value.match(regex)) {
      setSelect(event.target.attributes.getNamedItem("data-name").value);
    }
    fetchList(event.target.attributes.getNamedItem("data-id").value, page,sortByValue);
  };

  const languageChange = (event: any) => {
    fetchMultiList(
      event.target.attributes.getNamedItem("data-movieid").value,
      page,
      event.target.attributes.getNamedItem("data-id").value,sortByValue
    );
  };
  const sortBy = (event:any) => {
    var elements = document.querySelectorAll('#order-menu > .bg-primary');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('bg-primary');
    }
    event.target.classList.add("bg-primary");
    setsortByValue(event.target.getAttribute("data-value"))
    if(id && lang){
      fetchMultiList(id,page, lang,event.target.getAttribute("data-value"))
    }else{
      fetchList(id, page,event.target.getAttribute("data-value")) 
    }
    
  }
  // setSelect()
  //   console.log("movies data==========>>>>>>>>>>>>>", MovieFilterData);
  // console.log("api language===========", MovieLanguageApiFilterData);
  //   console.log("detail=========", listData);
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
                    {select} <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                  >
                    {MovieFilterData &&
                      MovieFilterData.length > 0 &&
                      MovieFilterData.map((item: any, index: number) => {
                        const active = item.id == movieId ? "bg-primary" : "";
                        return (
                          <Link
                            className={"dropdown-item " + active}
                            to={`/movies/${item.id}`}
                            onClick={handleChange}
                            data-id={item.id}
                            data-name={item.name}
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
                      MovieLanguageFilterData.map(
                        (item: any, index: number) => {
                          const active =
                            item.iso_639_1 == langId ? "bg-primary" : "";
                          var regex = /^[0-9]+$/;
                          if (movieId.match(regex)) {
                            return (
                              <Link
                                className={"dropdown-item " + active}
                                onClick={languageChange}
                                data-movieid={movieId}
                                data-id={item.iso_639_1}
                                to={`/movies/${movieId}/${item.iso_639_1}`}
                              >
                                {item.english_name}
                              </Link>
                            );
                          } else {
                            return (
                              <Link
                                className={"dropdown-item " + active}
                                onClick={handleChange}
                                data-movieid={movieId}
                                data-id={item.iso_639_1}
                                to={`/movies/${item.iso_639_1}`}
                              >
                                {item.english_name}
                              </Link>
                            );
                          }
                        }
                      )}

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

            <div className="filters-container-2  filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>{/* <h4 className="drop-head">Sort By :</h4> */}</div>
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
                  aria-labelledby="dropdown-3-menu-button"
                  id="order-menu"
                  >
                     <a className="dropdown-item bg-primary pointer_link"  onClick={sortBy} data-value="">
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

          {listData.length > 0 ? (
            <div className="row movielistrow">
              {listData
                ? listData &&
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
                          name={item.title}
                          description={item.release_date}
                        />
                      </div>
                    );
                  })
                  
                : MovieLanguageApiFilterData &&
                  MovieLanguageApiFilterData.length > 0 &&
                  MovieLanguageApiFilterData.map((item: any, index: number) => {
                    return (
                      <div
                        className={`customcol movie-page-images`}
                        key={`list-item-${index}`}
                      >
                        {/* <ListItem poster={item.poster} name={item.name} description={item.description} /> */}
                        <ListItem
                          mainId={item.id}
                          poster={`${process.env.REACT_APP_IMDB_IMAGE_URL}${item.poster_path}`}
                          name={item.title}
                          description={item.release_date}
                        />
                      </div>
                    );
                  })}
            </div>
          ) : (
            <div className="nodata">
              <br />
              <br />
              <br />
              <br />
              <p>No Data Avalible</p>
              <br />
              <br />
              <br />
              <br />
            </div>
          )}

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
    listData: state.listReducer.listData,
    totalPage: state.listReducer.totalPage,
    page: state.listReducer.page,
    MovieLanguageApiFilterData:
      state.LanguageFilterReducer.MovieLanguageApiFilterData,
    MovieLanguageFilterData:
      state.movielanguageFilterReducer.MovieLanguageFilterData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMovieList: (page: number,sort_by:any) => dispatch(fetchMovieList(page,sort_by)),
    fetchMovieListLoadMore: (page: number) =>
      dispatch(fetchMovieListLoadMore(page)),
    fetchMovieFilterDetail: () => dispatch(fetchMovieFilterDetail()),
    fetchList: (id: any, page: number,sort_by:any) => dispatch(fetchList(id, page,sort_by)),
    fetchLanguageApiFilterDetail: (language: any, id: number) =>
      dispatch(fetchLanguageApiFilterDetail(language, id)),
    fetchListLoadMore: (id: any, page: number) =>
      dispatch(fetchListLoadMore(id, page)),
    fetchMovieLanguageFilterDetail: () =>
      dispatch(fetchMovieLanguageFilterDetail()),
    fetchMultiList: (id: any, page: number, lang: any,sort_by:any) =>
      dispatch(fetchMultiList(id, page, lang,sort_by))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(List);
// function fetchMultiList(id: string, page: any, lang: string) {
//   throw new Error("Function not implemented.");
// }
