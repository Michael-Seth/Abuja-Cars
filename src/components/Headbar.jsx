import React from "react";
import { CiUser } from "react-icons/ci";
import { MdModeNight } from "react-icons/md";
import { BsSunFill } from "react-icons/bs";
import { ThemeContext, themes } from "../context/ThemeContext";

function Headbar() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <header className="headerContainer">
      <div className="headbarBox">
        <div className="headbarUserImg">
          <CiUser />
        </div>
        <div className="headbarToggleTheme">
          <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <div
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                }}
              >
                {darkMode ? (
                  <MdModeNight size="24px" />
                ) : (
                  <BsSunFill color="white" size="24px" />
                )}
              </div>
            )}
          </ThemeContext.Consumer>
        </div>
      </div>
    </header>
  );
}

export default Headbar;
