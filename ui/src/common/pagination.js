import React from "react";
import cn from "classnames";
import { range, map } from "lodash";

const Pagination = ({ page, max, onChange }) => {
  const handleOnChange = (ev) => {
    onChange && onChange(parseInt(ev.target.value));
  };

  const handleFirst = (ev) => {
    ev.preventDefault();
    if (page - 1 >= 1 && onChange) {
      onChange(1);
    }
  };

  const handlePrev = (ev) => {
    ev.preventDefault();
    if (page - 1 >= 1 && onChange) {
      onChange(page - 1);
    }
  };

  const handleNext = (ev) => {
    ev.preventDefault();
    if (page + 1 <= max && onChange) {
      onChange(page + 1);
    }
  };

  return (
    <nav>
      <ul className="uk-pagination uk-flex-left">
        <li className={cn({ "uk-disabled": page === 1 })}>
          <a href="#" onClick={handleFirst}>
            First
          </a>
        </li>

        <li className={cn({ "uk-disabled": page === 1 })}>
          <a href="#" onClick={handlePrev}>
            <span>&lt;</span> Previous
          </a>
        </li>

        <li>
          <select value={page} onChange={handleOnChange}>
            {map(range(max), (index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </li>

        <li className={cn({ "uk-disabled": page === max })}>
          <a href="#" onClick={handleNext}>
            Next <span>&gt;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
