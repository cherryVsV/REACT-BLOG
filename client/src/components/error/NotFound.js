import React from 'react';
import { Link } from "react-router-dom";
import "./error.css";

const NotFound = () => {
  return(
  <div className="body">
    <a href="" target="_blank">
  <header class="top-header">
</header>
<div>
  <div class="starsec"></div>
  <div class="starthird"></div>
  <div class="starfourth"></div>
  <div class="starfifth"></div>
</div>

<div class="lamp__wrap">
  <div class="lamp">
    <div class="cable"></div>
    <div class="cover"></div>
    <div class="in-cover">
      <div class="bulb"></div>
    </div>
    <div class="light"></div>
  </div>
</div>
<section class="error">
  <div class="error__content">
    <div class="error__message message">
      <h1 class="message__title">Page Not Found</h1>
      <p class="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
    </div>
    <div class="error__nav e-nav">
    <Link className="link" to="/">
      <a href=""  class="e-nav__link"></a>
      </Link>
    </div>
  </div>
</section>

  </a>
    </div>
  )

}

export default NotFound;