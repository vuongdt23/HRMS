import React from 'react';
import {Link} from 'react-router-dom';

function Footer (props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h5>Links</h5>
            <ul className="list-unstyled" />
          </div>
          <div className="col-7 col-sm-5">
            <h5>Our Address</h5>
            <address>
              1725 Slough Avenue
              Scranton Business Park<br />
              <i className="fa fa-phone fa-lg" />: +8435435218<br />

              <i className="fa fa-envelope fa-lg" />
              :
              {' '}
              <a href="mailto:confusion@food.net">
                18521677@gm.uit.edu.vn
              </a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">

              <a
                className="btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook" />
              </a>
              <a
                className="btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin" />
              </a>
              <a
                className="btn btn-social-icon btn-twitter"
                href="http://twitter.com/"
              >
                <i className="fa fa-twitter" />
              </a>
              <a
                className="btn btn-social-icon btn-google"
                href="http://youtube.com/"
              >
                <i className="fa fa-youtube" />
              </a>
              <a className="btn btn-social-icon" href="mailto:">
                <i className="fa fa-envelope-o" />
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2020 Dunder Mifflin Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
