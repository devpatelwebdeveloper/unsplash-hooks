import React, { useRef, useState } from "react";

import { Logo, Search, Close } from "../Icons/Iconpaths";

import "./Header.scss";

const Header = ({
  onQueryChange,
  onQuerySearch,
  onGenarateRandomImages,
  onPageChange,
}) => {
  const [isFloatingInputActive, setFloatingInputActive] = useState(false);

  const inputEl = useRef();
  const floatingInputEl = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // onQuerySearch();
  };

  const handleHomePage = () => {
    onPageChange("home");
    onGenarateRandomImages();
    inputEl.current.value = "";
    floatingInputEl.current.value = "";
  };

  return (
    <header>
      <button className="btn home" onClick={handleHomePage}>
        <div className="icon gallery">{Logo}</div>
        <span className="title">Splash</span>
      </button>

      <form onSubmit={handleSubmit}>
        <div className="form-group g-1">
          <input
            type="text"
            placeholder="Type here"
            onChange={() => onQueryChange(inputEl.current.value)}
            ref={inputEl}
          />
          <button
            className="btn search"
            onClick={onQuerySearch}
            disabled={
              inputEl.current !== undefined &&
              inputEl.current.value.length === 0
                ? true
                : false
            }
          >
            <div className="icon search">{Search}</div>
            <span>search</span>
          </button>
        </div>
        <div className="form-group g-2">
          <button
            className="btn search"
            onClick={() => setFloatingInputActive(true)}
          >
            <div className="icon search">{Search}</div>
          </button>
        </div>

        <div
          className={`floating--container ${
            isFloatingInputActive ? "" : "hide"
          }`}
        >
          <div className="input--container">
            <input
              type="text"
              placeholder="Type here"
              onChange={() => onQueryChange(floatingInputEl.current.value)}
              ref={floatingInputEl}
            />
            <button
              className="btn search"
              onClick={onQuerySearch}
              disabled={
                floatingInputEl.current !== undefined &&
                floatingInputEl.current.value.length === 0
                  ? true
                  : false
              }
            >
              search
            </button>
          </div>

          <button
            className="btn close"
            onClick={() => setFloatingInputActive(false)}
          >
            <div className="icon cross">{Close}</div>
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
