import React from 'react';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import LogoShowcase from '../components/home/LogoShowcase';
import Categories from '../components/home/Categories';
import FavoriteProducts from '../components/home/FavoriteProducts';
import SpecialProduct from '../components/home/SpecialProduct';
import NewProducts from '../components/home/NewProducts';
import CatalogPreview from '../components/home/CatalogPreview';
import Steps from '../components/home/Steps';
import Testimonials from '../components/home/Testimonials';
import ClientsMarquee from '../components/home/ClientsMarquee';
import AboutBand from '../components/home/AboutBand';
import useScrollReveal from '../hooks/useScrollReveal';

export default function HomePage({ onOpenLightbox }) {
  useScrollReveal();

  return (
    <div id="page-home" className="page active">
      <Hero />
      <Marquee />
      <LogoShowcase />
      <Categories />
      <FavoriteProducts onOpenLightbox={onOpenLightbox} />
      <SpecialProduct />
      <NewProducts />
      <CatalogPreview onOpenLightbox={onOpenLightbox} />
      <Steps />
      <Testimonials />
      <ClientsMarquee />
      <AboutBand />
    </div>
  );
}
