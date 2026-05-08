import React from 'react';
import Brands from '../../components/brands/Brands';
import Banner from '../../components/Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import WhyChooseUs from '../../components/whyChooseUs/WhyChooseUs';
import FAQ from '../../components/faq/FAQ';
import Testimonials from '../../components/testimonials/Testimonials';
import StatsBar from '../../components/stats/StatsBar';
import CategoryGrid from '../../components/categories/CategoryGrid';
import Newsletter from '../../components/newsletter/Newsletter';
import OurStory from '../../components/story/OurStory';
import BundleSection from '../../components/bundles/BundleSection';


const Home = () => {
    const brands = useLoaderData()

    return (
        <div className='home-section'>
            <Banner></Banner>
            <StatsBar></StatsBar>
            <Brands brands ={brands}></Brands>
            <OurStory></OurStory>
            <BundleSection></BundleSection>
            <CategoryGrid></CategoryGrid>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;