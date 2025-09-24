// sub-nav.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../App.css"; // your main CSS

const SubNav = () => {
  const { pathname } = useLocation();

  // Define canonical routes and labels
  const items = [
    { path: "/add-client", label: "Add Client" },
    { path: "/client-info", label: "Client Info" }
  ];

  // Choose order depending on current pathname (so UX matches your request)
  // When on a page, show the other three in this order mapping:
  const orderMap = {
    "/add-client": ["/client-info"],
    "/client-info": ["/add-client"],
  };

  // default fallback: show all except current (in items order)
  const targetOrder = orderMap[pathname] || items.map(i => i.path).filter(p => p !== pathname);

  // Build links
  const linksToShow = targetOrder
    .map(path => items.find(i => i.path === path))
    .filter(Boolean);

  return (
    <nav className="client-subnav" aria-label="Client sub navigation">
      {linksToShow.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => (isActive ? "subnav-link active" : "subnav-link")}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default SubNav;
