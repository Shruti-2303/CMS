import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardComp = (props) => {
  const { dashboardData } = props;
  console.log("props: ", dashboardData);

  return (
    <div>
      {dashboardData ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <div>Category: {dashboardData.category}</div>
            <button>
              <Link to={{ pathname: "/managecategory" }}>View Categories</Link>
            </button>
          </div>
          <div>
            <div>Product: {dashboardData.product}</div>
            <button>
              <Link to={{ pathname: "/manageproduct" }}>View Products</Link>
            </button>
          </div>
          <div>
            <div>Bill: {dashboardData.bill}</div>
            <button>
              <Link to={{ pathname: "/viewbill" }}>View Bills</Link>
            </button>
          </div>
        </div>
      ) : (
        <div>Loading dashboard data...</div>
      )}
    </div>
  );
};

export default DashboardComp;
