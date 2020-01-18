import { createTheme } from "@welcome-ui/core";

export default createTheme({
  texts: {
    h2: {
      "font-weight": "500"
    },
    h3: {
      "font-weight": "500",
      "font-size": "1.1em"
    }
  },
  buttons: {
    tertiary: {
      "border-radius": 2,
      "background-color": "#73747B",
      "border-width": "0px !important",
      color: "white",
      "font-size": "0.8rem"
    },
    quaternary: {
      "background-color": "#E5E5E5",
      "text-transform": "none",
      "border-radius": 2,
      "border-color": "#b7b7b7",
      "border-width": "thin",
      "font-size": "0.8em",
      "font-weight": "500",
      "letter-spacing": 0,
      color: "black",
      "&:hover": {
        "background-color": "#eee !important",
        color: "black !important"
      },
      "&:focus": {
        "background-color": "#E5E5E5 !important"
      }
    }
  },
  fields: {
    default: {
      "font-weight": "500",
      color: "black",
      "border-color": "#b7b7b7"
    }
  }
});
