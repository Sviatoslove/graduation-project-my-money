import React from "react";
import PropTypes from "prop-types";
import CountsForm from "./CountsForm";
import TranslationsForm from "../translationsPage/TranslationsForm";

const FormForCount = ({ currentCount, closeForm, type }) => {
  return (
    <>
      {type === "translationsAdd" ? (
        <TranslationsForm closeForm={closeForm} />
      ) : (
        <CountsForm
          currentCount={currentCount}
          closeForm={closeForm}
        />
      )}
    </>
  );
};

FormForCount.propTypes = {
  currentCount: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  closeForm: PropTypes.func,
  type: PropTypes.string,
};

export default FormForCount;
