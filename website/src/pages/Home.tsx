import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import ContentSlider from "../components/ContentSlider"
import MainSlider from '../components/MainSlider';
import { fetchHomeContent } from '../redux/action/homeAction';

type Props = {
    homeData ?: [],
    fetchHomeContent ?: any
  }

const Home : FC<Props> = ({homeData, fetchHomeContent})=> {
    useEffect(() => {   
            const script = document.createElement('script');
    
            script.src = "/assets/js/developer.js";
            script.async = true;
    
            document.body.appendChild(script);       

        return () => {
            document.body.removeChild(script);
        }
    }, [homeData]);

    useEffect(() => {
        fetchHomeContent()// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <MainSlider />
            {
                homeData && homeData.length > 0 && homeData.map((content:any, index: number) => {
                    return (  
                        <section className="movie-slide1 movie-slide-mobile" key={`slider-section-${index}`}>
                            <div className="container-fluid container-padding2">
                                <div className="row">
                                    <ContentSlider 
                                    title={content.title}
                                    categoryId={content.category_id} 
                                    data={content.data} />
                                </div>
                            </div>
                        </section>
                    )
                })
            }
        </>
    )
}

const mapStateToProps = (state : any) => {
    return {
        homeData:state.homeReducer.homeData,
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        fetchHomeContent: () => dispatch(fetchHomeContent()),
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(Home);