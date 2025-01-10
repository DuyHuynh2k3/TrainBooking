import React, {
  useContext,
  // useState,
  // useRef,
} from "react";
import {
  SDivider,
  SItem,
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
  SLinkNotification,
  SLogo,
  SSidebar,
  // SSidebarButton,
  // SSSearch,
  // SSSearchIcon,
  STheme,
  SThemeLabel,
  SThemeToggler,
  SToggleThumb,
} from "../Sidebar/styles";
import { logoSVG } from "../../assets";
import {
  AiOutlineApartment,
  AiOutlineDashboard,
  // AiOutlineLeft,
  // // AiOutlineSearch,
} from "react-icons/ai";
import {
  MdLogout,
  MdOutlineAnalytics,
  MdOutlineSettings,
} from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { ThemeContext } from "styled-components";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  // const searchRef = useRef(null);
  const { setTheme, theme } = useContext(ThemeContext);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  // const searchClickHandler = () => {
  //   if (!sidebarOpen) {
  //     setSidebarOpen(true);
  //     //focus on input
  //     searchRef.current.focus();
  //   } else {
  //     //search functionality Duy
  //   }
  // };

  return (
    <SSidebar>
      <SLogo>
        <img src={logoSVG} alt="logo" />
      </SLogo>
      {/* <SSSearch
        onClick={searchClickHandler}
        style={!sidebarOpen ? { width: `fit-content` } : {}}
      >
        <SSSearchIcon>
          <AiOutlineSearch />
        </SSSearchIcon>
        <input
          ref={searchRef}
          placeholder="Search"
          style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
        />
      </SSSearch> */}
      {linksArray.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <SLinkIcon>{icon}</SLinkIcon>
            <>
              <SLinkLabel>{label}</SLinkLabel>
              {/* if notification are at 0 or null, do not display */}
              {!!notification && (
                <SLinkNotification>{notification}</SLinkNotification>
              )}
            </>
          </SLink>
        </SLinkContainer>
      ))}
      <SItem>
        <SDivider />
        <>Quản lý chuyến tàu</>
      </SItem>
      {linksArrayTrain.map(({ icon, label, notification, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to}>
            <SLinkIcon>{icon}</SLinkIcon>
            <>
              <SLinkLabel>{label}</SLinkLabel>
              {/* if notification are at 0 or null, do not display */}
              {!!notification && (
                <SLinkNotification>{notification}</SLinkNotification>
              )}
            </>
          </SLink>
        </SLinkContainer>
      ))}

      <SItem>
        <SDivider />
        <>Quản lý thanh toán</>
      </SItem>
      {secondaryLinksArray.map(({ icon, label }) => (
        <SLinkContainer key={label}>
          <SLink to="/">
            <SLinkIcon>{icon}</SLinkIcon>
            <SLinkLabel>{label}</SLinkLabel>
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />
      <STheme>
        <SThemeLabel>Dark Mode</SThemeLabel>
        <SThemeToggler
          isActive={theme === "dark"}
          onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
        >
          <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
        </SThemeToggler>
      </STheme>
    </SSidebar>
  );
};
const linksArray = [
  {
    label: "Dashboard",
    icon: <AiOutlineDashboard />,
    to: "/",
    notification: 0,
  },
];

const linksArrayTrain = [
  {
    label: "Lịch sử đặt vé",
    icon: <BsPeople />,
    to: "/passenger",
    notification: 0,
  },
  {
    label: "Chuyến tàu",
    icon: <MdOutlineAnalytics />,
    to: "/statistic",
    notification: 3,
  },
  {
    label: "Sân ga tàu",
    icon: <AiOutlineApartment />,
    to: "/diagrams",
    notification: 1,
  },
];

const secondaryLinksArray = [
  {
    label: "Settings",
    icon: <MdOutlineSettings />,
  },
  {
    label: "Logout",
    icon: <MdLogout />,
  },
];

export default Sidebar;
