import React, { useEffect } from "react";

const GoogleTranslate = () => {

      useEffect(() => {
        const addScript = document.createElement("script");
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        addScript.async = true;
        document.body.appendChild(addScript);
    
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", autoDisplay: false },
            "google_translate_element"
          );
        };
      }, []);
    
      return (
        <div>
          <h3>Select Language:</h3>
          <div id="google_translate_element"></div>
        </div>
      );
};

export default GoogleTranslate;