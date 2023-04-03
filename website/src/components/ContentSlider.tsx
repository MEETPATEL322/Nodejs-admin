/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import NewsList from "./NewsListitem";
import QuratedList from "./QuratedListItem";


type Props = {
  title?: string;
  categoryId?: any;
  data?: [];
};

const ContentSlider: FC<Props> = ({ title, categoryId, data }) => {
  return (
    <div
      className="MultiCarousel"
      data-items="1,3,5,9"
      data-slide="1"
      id="MultiCarousel1"
      data-interval="1000"
    >
      {title === "Curated Content" ? (
                  <Link
                  className="sectional-heading fs-20 section-name float-left pt-2"
                  to={`/curatedcontent/${categoryId}`}
                >
                  {title}&nbsp; <i className="fa fa-angle-right"></i>
                </Link>
                ) : title === "News Content" ? (
                  <Link
                  className="sectional-heading fs-20 section-name float-left pt-2"
                  to={`/news/${categoryId}`}
                >
                  {title}&nbsp; <i className="fa fa-angle-right"></i>
                </Link>
                ) : (
                  <Link
                  className="sectional-heading fs-20 section-name float-left pt-2"
                  to={`/movies/${categoryId}`}
                >
                  {title}&nbsp; <i className="fa fa-angle-right"></i>
                </Link>
                )}
      {/* <a href="/list" className="sectional-heading fs-20 section-name float-left pt-2">{title}&nbsp; <i className="fa fa-angle-right"></i></a> */}
      <a className="rightLst1 right-left next-full">
        <i className="fa fa-angle-right"></i>
      </a>
      <a className="leftLst1 right-left prev-full">
        <i className="fa fa-angle-left"></i>
      </a>
      <div className="MultiCarousel-inner owl-carousel owl-carousel0 owl-theme">
        {data &&
          data.map((item: any, index: number) => {
            return (
              <div className={`item`} key={`list-item-${index}`}>
                {/* {
                                    title === 'Curated Content' ?
                                    <ListItem mainId={item._id} 
                                    poster={`${process.env.REACT_APP_API_URL}/${item.image}`} 
                                    name={item.title} description={item.description} />
                                    : 
                                    <ListItem mainId={item.id} 
                                    poster={`${process.env.REACT_APP_IMDB_IMAGE_URL}${item.poster_path}`} 
                                    name={item.title} description={item.release_date} />
                                } */}
                {title === "Curated Content" ? (
                  <QuratedList  
                    mainId={item._id}
                    poster={`${process.env.REACT_APP_API_URL}/${item.image}`}
                    name={item.title}
                    description={item.description}
                    
                  />
                ) : title === "News Content" ? (
                  <NewsList
                    mainId={item._id}
                    poster={`${process.env.REACT_APP_API_URL}/${item.newsimage}`}
                    name={item.newstitle}
                    
                    // description={item.newsdescription}
                  />
                ) : (
                  <ListItem
                    mainId={item.id}
                    poster={`${process.env.REACT_APP_IMDB_IMAGE_URL}${item.poster_path}`}
                    name={item.title}
                    description={item.release_date}
                  />
                )}
                
              </div>
            );
          })}
      </div>

      <a className=" rightLst right-left next-single">
        <i className="fa fa-angle-right"></i>
      </a>
      <a className=" leftLst right-left prev-single">
        <i className="fa fa-angle-left"></i>
      </a>

      <div className="sectional-padding"></div>
    </div>
  );
};

export default ContentSlider;
