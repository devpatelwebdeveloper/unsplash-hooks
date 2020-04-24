import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Close,
  ChevronUp,
  Info,
  EyeIcon,
  Download,
  LikeHeart,
} from "../Icons/Iconpaths";
import "./Modal.scss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Modal = ({ imageData, onModalActive }) => {
  const {
    urls,
    alt_description,
    color,
    links,
    height,
    width,
    created_at,
    exif,
  } = imageData;

  const date = new Date(created_at);

  const [dropdownActive, setDropdownActive] = useState(false);
  const [infoActive, setInfoActive] = useState(false);
  const [views, setViews] = useState(0);
  const [downloads, setDownloads] = useState(0);
  const [likes, setLikes] = useState(0);
  const [viewsLastMonth, setViewsLastMonth] = useState(0);
  const [downloadsLastMonth, setDownloadsLastMonth] = useState(0);
  const [likesLastMonth, setLikesLastMonth] = useState(0);

  const modalEl = useRef();
  const imageEl = useRef();

  const handleClose = () => {
    modalEl.current.style.display = "none";
    onModalActive(false);
    document.title = "Image Gallery | UNSPLASH";
  };

  const handleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const fetchStats = () => {
    axios(
      `${process.env.REACT_APP_API_URL}/photos/${imageData.id}/statistics`,
      {
        params: {
          client_id: process.env.REACT_APP_CLIENT_ID,
        },
      }
    ).then((res) => {
      // get all the values in an array
      const lastMonthViewValues = res.data.views.historical.values.map(
        (e) => e.value
      );
      const lastMonthDownloadValues = res.data.downloads.historical.values.map(
        (e) => e.value
      );
      const lastMonthLikeValues = res.data.likes.historical.values.map(
        (e) => e.value
      );

      // add up the array
      const lastMonthTotalViews = numberFormatter(
        returnTotal(lastMonthViewValues),
        1
      );
      const lastMonthTotalDownloads = numberFormatter(
        returnTotal(lastMonthDownloadValues),
        1
      );
      const lastMonthTotalLikes = numberFormatter(
        returnTotal(lastMonthLikeValues),
        1
      );

      // set all the values
      setViews(res.data.views.total);
      setDownloads(res.data.downloads.total);
      setLikes(res.data.likes.total);
      setViewsLastMonth(lastMonthTotalViews);
      setDownloadsLastMonth(lastMonthTotalDownloads);
      setLikesLastMonth(lastMonthTotalLikes);
    });
  };

  useEffect(fetchStats, []);

  return (
    <div className="modal" ref={modalEl}>
      <div
        className="image-container"
        style={{
          background: color,
          height: width / height > 2 ? "50%" : "80%",
        }}
      >
        <img src={urls.full} alt={alt_description} ref={imageEl} />
        <button className="btn close" onClick={handleClose}>
          <div className="icon">{Close}</div>
        </button>

        <div className="options--container">
          <div className="group g-1">
            <a href={`${links.download}?force=true`} className="download">
              download
            </a>
            <div className="dropdown-btn--container">
              <button className="btn dropdown" onClick={handleDropdown}>
                <div className="icon">{ChevronUp}</div>
              </button>
              <div
                className={`dropdown-menu ${dropdownActive ? "" : "hide"}`}
                tabIndex="-1"
              >
                <ul>
                  <li>
                    <a href={`${links.download}?force=true&w=640`}>
                      Small <span>(640x960)</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${links.download}?force=true&w=1920`}>
                      Medium <span>(1920x2880)</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${links.download}?force=true&w=2400`}>
                      Large <span>(2400x3600)</span>
                    </a>
                  </li>
                  <li>
                    <a href={`${links.download}?force=true`}>
                      Original Size{" "}
                      <span>
                        ({height}x{width})
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="group g-2">
            <button className="btn info" onClick={() => setInfoActive(true)}>
              <div className="icon">{Info}</div>
            </button>
          </div>
        </div>

        <div
          className="image-info--container"
          style={{
            display: infoActive ? "flex" : "none",
          }}
        >
          <div
            className="image-info--modal"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), white 150px), url("${urls.thumb}&auto=format&fit=crop&w=200&q=60&blur=20")`,
            }}
          >
            <button className="btn close" onClick={() => setInfoActive(false)}>
              <div className="icon">{Close}</div>
            </button>

            <div className="row row--1">
              <h1>Info</h1>
              <span>
                Published on {months[date.getMonth()]} {date.getDate()},{" "}
                {date.getFullYear()}
              </span>
            </div>
            <div className="row row--2">
              <div className="image-info views--container">
                <div className="info">
                  <div className="icon">{EyeIcon}</div>
                  <span className="info--title">Views</span>
                </div>
                <div className="info info--value">
                  <span className="total-views">{beautifyNumber(views)}</span>
                </div>
                <div className="monthly-stats">
                  <span className="views-stat">+{viewsLastMonth}</span> since
                  last month
                </div>
              </div>
              <div className="image-info downloads--container">
                <div className="info">
                  <div className="icon">{Download}</div>
                  <span className="info info--title">Downloads</span>
                </div>
                <div className="info info--value">
                  <span className="total-views">
                    {beautifyNumber(downloads)}
                  </span>
                </div>
                <div className="monthly-stats">
                  <span className="downloads-stat">+{downloadsLastMonth}</span>{" "}
                  since last month
                </div>
              </div>
              <div className="image-info likes--container">
                <div className="info">
                  <div className="icon">{LikeHeart}</div>
                  <span className="info info--title">Likes</span>
                </div>
                <div className="info info--value">
                  <span className="total-views">{beautifyNumber(likes)}</span>
                </div>
                <div className="monthly-stats">
                  <span className="likes-stat">+{likesLastMonth}</span> since
                  last month
                </div>
              </div>
            </div>
            <div className="hr-line"></div>
            <div className="row row--3">
              <div className="camera-info">
                <span className="info--title">Camera Make</span>
                <span className="info--value">
                  {exif !== undefined ? exif.make : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">Camera Model</span>
                <span className="info--value">
                  {exif !== undefined ? exif.model : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">Focal Length</span>
                <span className="info--value">
                  {exif !== undefined ? `${exif.focal_length}mm` : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">Aperture</span>
                <span className="info--value">
                  {exif !== undefined ? `ƒ/${exif.aperture}` : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">Shutter Speed</span>
                <span className="info--value">
                  {exif !== undefined ? `${exif.exposure_time}s` : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">ISO</span>
                <span className="info--value">
                  {exif !== undefined ? exif.iso : "--"}
                </span>
              </div>
              <div className="camera-info">
                <span className="info--title">Dimensions</span>
                <span className="info--value">
                  {`${width} × ${height}` || "--"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function numberFormatter(num, digits) {
  let si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

function beautifyNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function returnTotal(arrOfValues) {
  return arrOfValues.reduce((a, c) => (a += c));
}

export default Modal;
