import React, { useState } from 'react';
import Chart from 'react-apexcharts';

import Card from '../Card';

export default ({
  type = 'line',
  curve = 'smooth',
  height = '400px',
  padding = '25px 25px 10px',
  margin,
}) => {
  const [options, setOptions] = useState({
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
    stroke: {
      curve,
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 60, 85],
    },
    {
      name: 'series-2',
      data: [15, 20, 70, 10, 30, 20, 80, 100],
    },
  ]);

  return (
    <div style={{ backgroundColor: "white", padding, margin, border: '1px solid #0000001c', borderRadius: '5px' }}>
      <div className="mixed-chart">
        <Chart options={options} series={series} type={type} height={height} />
      </div>
    </div>
  );
};
