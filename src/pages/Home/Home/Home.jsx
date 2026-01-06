import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarships from '../TopScholarships/TopScholarships';
import SuccessStories from '../SuccessStories/SuccessStories';
import ContactUs from '../ContactUs/ContactUs';


const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <SuccessStories></SuccessStories>
      <ContactUs></ContactUs>
      </div>
  );
};

export default Home;