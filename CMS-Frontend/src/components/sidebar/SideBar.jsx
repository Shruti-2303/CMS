import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SideBar.css'
import {
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3 ">
        <NavItem>
          <NavLink tag={Link} to={"/dashboard"} className="f-white">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/managecategory"} className="f-white">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Manage Category
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/manageproduct"} className="f-white">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Manage Product
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/manageorder"} className="f-white">
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Manage Order
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/viewbill"} className="f-white">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            View Bill
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/manageuser"} className="f-white">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Manage Users
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);


export default SideBar;
