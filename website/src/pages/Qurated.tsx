import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ContentSlider from "../components/ContentSlider";
import ListItem from "../components/QuratedListItem";
import MainSlider from "../components/MainSlider";
import {
    fetchQuratedList,
    fetchQuratedListLoadMore,
} from "../redux/action/quratedAction";

type Props = {
  listData?: any;
  totalPage?: any;
  page?: any;
  fetchQuratedList?: any;
  fetchQuratedListLoadMore?: any;
};

const Qurated: FC<Props> = ({
  listData,
  fetchQuratedList,
  totalPage,
  page,
  fetchQuratedListLoadMore,
}) => {
  // let { id } = useParams();
  useEffect(() => {
    const script = document.createElement('script');
    
    script.src = "/assets/js/developer.js";
    script.async = true;

    document.body.appendChild(script);
    if (page) {
    fetchQuratedList(page); // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  const loadMore = () => {
    // setPage(page + 1);
    fetchQuratedListLoadMore(page + 1);
  };

  console.log("Qurated content=========", listData);
  return (
    <>
      <MainSlider />
      <section className="movie-slide1 movie-slide-mobile my-2 movielistpage">
        <div className="container-fluid container-padding2">
          {/* <div className="row mt-5 mb-2 ">
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
                    Genre <i className="fa fa-angle-down ml-2"></i>
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdown-3-menu-button"
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
                    aria-labelledby="dropdown-4-menu-button"
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
          </div> */}

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
                    <ListItem mainId={item._id} poster={`${process.env.REACT_APP_API_URL}/${item.image}`} name={item.title} description={item.description} />
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
    listData: state.quratedReducer.listData,
    totalPage: state.quratedReducer.totalPage,
    page: state.quratedReducer.page,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchQuratedList: (page: number) => dispatch(fetchQuratedList(page)),
    fetchQuratedListLoadMore: (page: number) => dispatch(fetchQuratedListLoadMore(page)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qurated);
