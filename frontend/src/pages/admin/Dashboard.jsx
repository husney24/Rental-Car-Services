import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiCallFun } from "../../utils/fetchAPIs";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import ReactApexChart from "react-apexcharts";

function Dashboard() {
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [carTypeDistribution, setCarTypeDistribution] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    const d = await apiCallFun("GET", "admin/getAllVehicle", null, token);
    if (d.status) {
      setData(d.data);
    } else {
      toast.warn(d.msg);
    }
  };

  console.log(getData);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const distribution = {};
      data.forEach((car) => {
        distribution[car.car_type] = (distribution[car.car_type] || 0) + 1;
      });
      setCarTypeDistribution(distribution);
    }
  }, [data]);

  const chartColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF'];
  // const chartColors = {
  //   SUV: '#FF5733',
  //   Sedan: '#33FF57',
  //   Coupe: '#5733FF'
  // };

  const bookingchartOptions = {
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }
    ],
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function(chart, w, e) {
          console.log(chart, w, e);
        }
      }
    },
    colors: ['#c70ea5'],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
        '4',
        ['5', '6'],
        ['7', '8'],
        ['9', '10'],
        ['11', '12'],
      ],
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    }
  };

  const earningchartOptions = {
    series: [
      {
        name: "money!!!!",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    }
  };

  return (
    <>
      <div className="fixed-nav sticky-footer bg-dark" id="page-top">
        <Header />
        <div className="content-wrapper">
          <div className="container-fluid p-4">
            <h4>Dashboard</h4>
            <div className="container-fluid py-4">
              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                  <div className="card">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Bookings
                            </p>
                            <h5 className="font-weight-bolder mb-0">
                              $53,000
                              <span className="text-success text-sm font-weight-bolder">
                                +55%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          {/* <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                  <i className="fa-solid fa-database"></i>
                  </div> */}
                          <i className="fa-solid fa-car"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                  <div className="card">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Todays Users
                            </p>
                            <h5 className="font-weight-bolder mb-0">
                              2,300
                              <span className="text-success text-sm font-weight-bolder">
                                +3%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                            <i
                              className="ni ni-world text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                  <div className="card">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              New Clients
                            </p>
                            <h5 className="font-weight-bolder mb-0">
                              +3,462
                              <span className="text-danger text-sm font-weight-bolder">
                                -2%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                            <i
                              className="ni ni-paper-diploma text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6">
                  <div className="card">
                    <div className="card-body p-3">
                      <div className="row">
                        <div className="col-8">
                          <div className="numbers">
                            <p className="text-sm mb-0 text-capitalize font-weight-bold">
                              Sales
                            </p>
                            <h5 className="font-weight-bolder mb-0">
                              $103,430
                              <span className="text-success text-sm font-weight-bolder">
                                +5%
                              </span>
                            </h5>
                          </div>
                        </div>
                        <div className="col-4 text-end">
                          <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                            <i
                              className="ni ni-cart text-lg opacity-10"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="row mt-4">
                <div className="col-lg-4 col-md-6 mt-4 mb-4">
                  <div className="card z-index-2 ">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        <div className="chart">
                          {/* <canvas id="chart-bars" className="chart-canvas" height="170"></canvas> */}
                          {carTypeDistribution && (
                          <div>
                          <ReactApexChart
                          options={{
                            labels: Object.keys(carTypeDistribution),
                            colors: chartColors,
                          }}
                          series={Object.values(carTypeDistribution)}
                          type="pie"
                          width={380}
                        />
                      </div>
                    )}
      <p>Cars Type</p>
      <ul>
        <li>SUV</li>
        <li>Sedan</li>
        <li>Coupe</li>
      </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-0 ">Cars Type</h6>
                      <p className="text-sm ">Last campaign performance</p>
                      <hr className="dark horizontal" />
                      <div className="d-flex ">
                        <i className="material-icons text-sm my-auto me-1">
                          schedule
                        </i>
                        <p className="mb-0 text-sm">
                          {" "}
                          campaign sent 2 days ago{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mt-4 mb-4">
                  <div className="card z-index-2  ">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                      <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                        <div className="chart">
                        <ReactApexChart
                            options={earningchartOptions}
                            series={earningchartOptions.series}
                            type="line"
                            height={350}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-0 ">Earning </h6>
                      <p className="text-sm ">
                        {" "}
                        (<span className="font-weight-bolder">+15%</span>)
                        increase in today sales.{" "}
                      </p>
                      <hr className="dark horizontal" />
                      <div className="d-flex ">
                        <i className="material-icons text-sm my-auto me-1">
                          schedule
                        </i>
                        <p className="mb-0 text-sm"> updated 4 min ago </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 mt-4 mb-3">
                  <div className="card z-index-2 ">
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                      <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                        <div className="chart">
                          {/* <canvas
                            id="chart-line-tasks"
                            className="chart-canvas"
                            height="170"
                          ></canvas> */}
                          <ReactApexChart
                            options={bookingchartOptions}
                            series={bookingchartOptions.series}
                            type="bar"
                            height={350}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-0 ">Bookings</h6>
                      <p className="text-sm ">Last Campaign Performance</p>
                      <hr className="dark horizontal" />
                      <div className="d-flex ">
                        <i className="material-icons text-sm my-auto me-1">
                          schedule
                        </i>
                        <p className="mb-0 text-sm">just updated</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Charts End*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
