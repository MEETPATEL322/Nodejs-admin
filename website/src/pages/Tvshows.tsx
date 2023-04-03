import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
// import { useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import ContentSlider from "../components/ContentSlider";
import ListItem from "../components/TvListItem";
import MainSlider from "../components/MainSlider";
import {
  fetchTVList,
  fetchTVListLoadMore,
} from "../redux/action/tvshowsAction";

import { fetchTvFilterDetail } from "../redux/action/tvFilter";
import { fetchMovieLanguageFilterDetail } from "../redux/action/movielanguageFilter";
type Props = {
  homeData?: [];
  id?: number;
  listData?: any;
  totalPage?: any;
  page?: any;
  fetchTVList?: any;
  fetchTVListLoadMore?: any;

  fetchMovieLanguageFilterDetail?: any;
  MovieLanguageFilterData?: any;
  TvFilterData?: any;
  TvId?: any;
  fetchTvFilterDetail?: any;
};

const Tvshows: FC<Props> = ({
  homeData,
  listData,
  fetchTVList,
  totalPage,
  page,
  fetchTVListLoadMore,

  fetchMovieLanguageFilterDetail,
  MovieLanguageFilterData,
  TvFilterData,
  TvId,
  fetchTvFilterDetail,
}) => {
  const [id, setId] = useState("");
  const [lang, setLang] = useState("");
  const [sort_by, setSortBY] = useState("");
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "/assets/js/developer.js";
    script.async = true;

    document.body.appendChild(script);
    if (listData) {
      fetchTVList(id, lang, sort_by); // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    if (page) {
      fetchTVList(id, lang, sort_by);
      // fetchTVList(page); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    fetchTvFilterDetail();
    fetchMovieLanguageFilterDetail();
  }, []);

  const loadMore = () => {
    // setPage(page + 1);
    fetchTVListLoadMore(page + 1);
  };
  const [Genre, setSelectGenre] = useState("Genre");




  const [Language, setSelectLanguage] = useState("Language");

  const handleChange = (event: any) => {
    var elements = document.querySelectorAll('#genre-menu > .bg-primary');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('bg-primary');
    }
    event.target.classList.add("bg-primary");
    fetchTVList(
      event.target.attributes.getNamedItem("data-id").value,
      lang,
      sort_by
    );
    setId(event.target.attributes.getNamedItem("data-id").value);
    setSelectGenre(event.target.attributes.getNamedItem("data-name").value)
  };
  const languageChange = (event: any) => {
    var elements = document.querySelectorAll('#language-menu > .bg-primary');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('bg-primary');
    }
    event.target.classList.add("bg-primary");
    fetchTVList(
      id,
      event.target.attributes.getNamedItem("data-id").value,
      sort_by
    );
    setLang(event.target.attributes.getNamedItem("data-id").value);
    setSelectLanguage(event.target.attributes.getNamedItem("data-name").value);
  };
  const sortByChange = (event: any) => {
    var elements = document.querySelectorAll('#order-menu > .bg-primary');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('bg-primary');
    }
    event.target.classList.add("bg-primary");
    fetchTVList(
      id,
      lang,
      event.target.attributes.getNamedItem("data-id").value
    );
    setSortBY(event.target.attributes.getNamedItem("data-id").value);
  };

  console.log("language data===========", MovieLanguageFilterData);

  // console.log("list Tv data testing=========", listData);
  // console.log("tv shows=========", listData);
  return (
    <>
      <MainSlider />
      {homeData &&
        homeData.length > 0 &&
        homeData.map((content: any, index: number) => {
          return (
            <section
              className="movie-slide1 movie-slide-mobile"
              key={`slider-section-${index}`}
            >
              <div className="container-fluid container-padding2">
                <div className="row">
                  <ContentSlider
                    title={content.title}
                    categoryId={content.category_id}
                    data={content.data}
                  />
                </div>
              </div>
            </section>
          );
        })}
      <section className="movie-slide1 movie-slide-mobile my-2 movielistpage">
        <div className="container-fluid container-padding2">
          <div className="row mt-5 mb-2">
            <div className="filters-container">
              <div className="d-lg-flex d-md-flex align-items-center filters-inner-container">
                <div>
                  <h4 className="drop-head">Filters :</h4>
                </div>
                {/* <div className="dropdown filter drop1">
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
                </div> */}

                {/* <div className="dropdown filter drop2">
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
                </div> */}

                <div className="dropdown filter drop3">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdown-3-menu-button"
                    data-toggle="dropdown"
                    data-boundary="viewport"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {Genre} <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                    id="genre-menu"
                  >
                    {TvFilterData &&
                      TvFilterData.length > 0 &&
                      TvFilterData.map((item: any, index: number) => {
                        return (
                          <span
                            className="dropdown-item pointer pointer_link"
                            onClick={handleChange}
                            data-id={item.id}
                            data-name={item.name}
                          >
                            {item.name}
                          </span>
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
                    {Language} <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
                    id="language-menu"
                  >
                    {MovieLanguageFilterData &&
                      MovieLanguageFilterData.length > 0 &&
                      MovieLanguageFilterData.map(
                        (item: any, index: number) => {
                          return (
                            <span
                              className="dropdown-item pointer_link"
                              onClick={languageChange}
                              data-id={item.iso_639_1}
                              data-name={item.english_name}
                            >
                              {item.english_name}
                            </span>
                          );
                        }
                      )}
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
                    aria-labelledby="dropdown-1-menu-button"
                    id="order-menu"
                  >
                    <span
                      className="dropdown-item bg-primary pointer_link"
                      onClick={sortByChange}
                      data-id=""
                    >
                      Select Order
                    </span>
                    <span
                      className="dropdown-item pointer_link"
                      onClick={sortByChange}
                      data-id="popularity.asc"
                    >
                      popularity.asc
                    </span>
                    <span
                      className="dropdown-item pointer_link"
                      onClick={sortByChange}
                      data-id="popularity.desc"
                    >
                      popularity.desc
                    </span>
                    <span
                      className="dropdown-item pointer_link"
                      onClick={sortByChange}
                      data-id="release_date.asc"
                    >
                      release_date.asc
                    </span>
                    <span
                      className="dropdown-item pointer_link"
                      onClick={sortByChange}
                      data-id="release_date.desc"
                    >
                      release_date.desc
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row mt-4 mb-5  ">
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
          </div> */}

          {listData.length > 0 ? (
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
                        name={item.name}
                        description={item.original_name}
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
    TvFilterData: state.tvFilterReducer.TvFilterData,
    MovieLanguageFilterData:
      state.movielanguageFilterReducer.MovieLanguageFilterData,
    listData: state.tvshowsReducer.listData,
    totalPage: state.tvshowsReducer.totalPage,
    page: state.tvshowsReducer.page,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTVList: (id: number, lang: any, sort_by: any) =>
      dispatch(fetchTVList(id, lang, sort_by)),
    fetchTVListLoadMore: (page: number) => dispatch(fetchTVListLoadMore(page)),
    fetchTvFilterDetail: () => dispatch(fetchTvFilterDetail()),
    fetchMovieLanguageFilterDetail: () =>
      dispatch(fetchMovieLanguageFilterDetail()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tvshows);
