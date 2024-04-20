import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { getLastMonths } from "../../../utils/features";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useLineQuery } from "../../../redux/api/dashboardApi";

import { Navigate } from "react-router-dom";
const Linecharts = () => {
  const {last12Months:twelveMonths} = getLastMonths();

  const {user} = useSelector((state:RootState)=>state.userReducer)
     const {data,isError} = useLineQuery(user?._id!);
  
     
     const lineCharts = data?.lineCharts;
  
    if (isError) {
     
      if (isError) return <Navigate to={"/admin/dashboard"} />;
    }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={lineCharts?.users!}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            labels={twelveMonths}
            backgroundColor="rgba(53, 162, 255, 0.5)"
          />
          <h2>Active Users</h2>
        </section>

        <section>
          <LineChart
            data={lineCharts?.products!}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            labels={twelveMonths}
            label="Products"
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={lineCharts?.revenue!}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={twelveMonths}
          />
          <h2>Total Revenue </h2>
        </section>

        <section>
          <LineChart
            data={lineCharts?.discount!}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={twelveMonths}
          />
          <h2>Discount Allotted </h2>
        </section>
      </main>
    </div>
  );
};

export default Linecharts;
