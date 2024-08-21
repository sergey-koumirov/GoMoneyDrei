import React from "react";
import { isEmpty } from "lodash";

const BaseErrors = ({ errors }) => {
  return (
    <>
      {!isEmpty(errors.base) && (
        <span className="uk-form-danger">{errors.base.join("; ")}</span>
      )}
    </>
  );
};

export default BaseErrors;
