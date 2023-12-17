import React, { useEffect, useState } from "react";
import { adminAxios } from "../../../services/adminInterceptor";
import BarChartComponent from "./BarChart";
import { ChartSkelton } from "../../../skelton/admin/Dashboard";
enum DataType {
  Hour = "hour",
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
}
export type barChartPropsType = {
  key: any;
  value: any;
};
function DashboardChart() {
  const [isLoading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<barChartPropsType[]>([]);
  const [selectedDataType, setSelectedDataType] = useState(DataType.Weekly);

  const fetchData = (dataType: DataType) => {
    setLoading(false);
    adminAxios.get(`/report/sellsChart?type=${dataType}`).then((response) => {
      setChartData(response.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData(selectedDataType);
  }, [selectedDataType]);

  const valueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDataType = event.target.value as DataType;
    setSelectedDataType(newDataType);
  };
  return (
    <section className="md:ml-7 ml-3 mt-3 md:mr-4 mr-3 md:mb-0">
      {isLoading ? (
        <ChartSkelton />
      ) : (
        <div className="pb-10 py-5 rounded-xl bg-white">
          <div className="flex justify-between px-6">
            <p className="text-xs font-bold dark:text-white-100 2xl:text-lg">
              Sales Chart
            </p>
            <div className="relative">
              <select
                className="block appearance-none w-full outline-none text-white-100 leading-tight mr-3 bg-black text-white text-xs lg:text-xs py-2 px-3 rounded-md"
                onChange={valueHandler}
                value={selectedDataType}
              >
                {Object.values(DataType)?.map((dataType, index) => (
                  <option key={index} value={dataType}>
                    {dataType}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center mx-2  text-white-100"></div>
            </div>
          </div>
          <div className="flex justify-center px-2 container text-xs">
            <BarChartComponent datas={chartData} />
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardChart;
