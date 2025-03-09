import { NavLink } from 'react-router-dom';
import "../../assets/css/header.css";
import githublogoSVG from "../../assets/svg/githubmark.svg";
import githublogoPNG from "../../assets/png/githubmark.png";
import githublogoWEBP from "../../assets/webp/githubmark.webp";
import githublogoAVIF from "../../assets/avif/githubmark.avif";
import logopng from "../../assets/png/logo.png";
import logowebp from "../../assets/webp/logo.webp";
import starkyellowSVG from "../../assets/svg/staryellow.svg";
import starkyellowPNG from "../../assets/png/staryellow.png";
import starkyellowWEBP from "../../assets/webp/staryellow.webp";
import { Link, Route, Routes } from "react-router-dom";
import { About } from "../../pages/About/mainAbout";
import { NotFound } from "../../pages/NotFound/mainNotFound";
import { Sandbox } from "../../pages/Sandbox/mainSandbox";
import { Blog } from "../../pages/Blog/mainBlog";
import { Community } from "../../pages/Community/mainCommunity";
import { Docs } from "../../pages/Docs/mainDocs";
import React from 'react';

export function HeaderNav() {
  return (
    <>
      <header className=" z-50 top-0 flex items-center justify-center sticky backdrop-blur-sm  ">
        <ul className="pt-5 pl-5 pr-5 pb-2 header-ul-container grid max-w-full items-center grid-cols-[0.7fr_2fr_1fr] grid-rows-[auto] gap-8 ml-[auto] mr-[auto] w-full">
          <li className="">
            <Link className="header-ul-left flex flex-row items-center justify-center gap-2 animate-squiggly" to="/">
              <picture>
                <source srcSet={logopng} type="image/png" />
                <source srcSet={logowebp} type="image/webp" />
                <img loading="lazy" decoding="async" className="" src={logopng} width="40" height="40" alt="logo" />
              </picture>
              <span className=" text-white">LOOGOOO</span>
              <SVGAnimation className="invisible w-0 h-0" />
            </Link>
          </li>
          <li className="header-ul-center">
            <nav className="menu">
              <NavLink className="nav-link font-ibmplexmono" to="/about">About</NavLink>
              <NavLink className="nav-link font-ibmplexmono" to="/sandbox">Sandbox</NavLink>
              <NavLink className="nav-link font-ibmplexmono" to="/blog">Blog</NavLink>
              <NavLink className="nav-link font-ibmplexmono" to="/community">Community</NavLink>
              <NavLink className="nav-link font-ibmplexmono" to="/docs">Docs</NavLink>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/sandbox" element={<Sandbox />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/community" element={<Community />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </nav>
          </li>
          <li className="flex items-center justify-around">
            <a href="http://" target="_blank" rel="noopener noreferrer" className="git-button">
              <picture>
                <source srcSet={githublogoSVG} type="image/svg+xml" />
                <source srcSet={githublogoPNG} type="image/png" />
                <source srcSet={githublogoWEBP} type="image/webp" />
                <source srcSet={githublogoAVIF} type="image/avif" />
                <img src={githublogoSVG} loading="lazy" decoding="async" width="20" height="20" alt="logo github" />
              </picture>
              <div className="flex flex-row justify-center items-center gap-1">
                <picture>
                  <source srcSet={starkyellowSVG} type="image/svg+xml" />
                  <source srcSet={starkyellowPNG} type="image/png" />
                  <source srcSet={starkyellowWEBP} type="image/webp" />
                  <img className="text-yellow-400 w-4" loading="lazy" decoding="async" src={starkyellowWEBP} alt="" />
                </picture>
                <span className="content-center">4.1k</span>
              </div>
            </a>
            <button className="btn btn-header">
              Early Access
            </button>
          </li>
        </ul>

      </header>
    </>
  );
}

function SVGAnimation(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
      <defs>
        <filter id="squiggly-0">
          <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
          <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
        </filter>
        <filter id="squiggly-1">
          <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-2">
          <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
        <filter id="squiggly-3">
          <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>

        <filter id="squiggly-4">
          <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
        </filter>
      </defs>
    </svg>
  );
}
