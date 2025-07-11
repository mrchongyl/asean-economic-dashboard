import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export interface LineChartData {
  x: string | number;
  y: number;
}

export interface LineChartRegressionLine {
  data: LineChartData[];
  label?: string;
  color?: string;
}

interface LineChartProps {
  data: LineChartData[];
  label: string;
  color?: string;
  yAxisLabel?: string;
  valueFormatter?: (value: number) => string;
  regressionLine?: LineChartRegressionLine;
}

// If 'multi' prop is set, expect data to be an array of { label, data, color }
interface LineChartMultiProps {
  data: { label: string; data: { x: string | number; y: number }[]; color: string }[];
  label?: string;
  yAxisLabel?: string;
  valueFormatter?: (value: number) => string;
  multi: true;
}

// Overload for single line
interface LineChartSingleProps extends LineChartProps {
  multi?: false;
}

type LineChartAllProps = LineChartSingleProps | LineChartMultiProps;

const LineChart: React.FC<LineChartAllProps> = (props) => {
  if ('multi' in props && props.multi) {
    // Multi-line
    const { data, yAxisLabel = '', valueFormatter = v => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } = props;
    const chartData = {
      labels: data[0]?.data.map(item => item.x) || [],
      datasets: data.map((series, idx) => ({
        label: series.label,
        data: series.data.map(item => item.y),
        borderColor: series.color,
        backgroundColor: series.color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: series.color,
        pointHoverBackgroundColor: series.color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }))
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
          labels: {
            font: {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
              size: 12,
              weight: 'bold' as const,
            },
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          titleFont: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
            size: 14,
            weight: 'bold' as const,
          },
          bodyFont: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
            size: 13,
            weight: 'bold' as const,
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: function(context: any) {
              return valueFormatter(context.parsed.y);
            }
          }
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
              weight: 'bold' as const,
            },
            callback: function(_val: any, index: number) {
              const x = data[0]?.data[index]?.x;
              if (typeof x === 'string' && x.length === 4 && !isNaN(Number(x))) {
                if (data[0].data.length > 30) {
                  return parseInt(x) % 10 === 0 ? x : '';
                } else if (data[0].data.length > 15) {
                  return parseInt(x) % 5 === 0 ? x : '';
                }
              }
              return x;
            }
          },
          title: yAxisLabel ? { display: true, text: yAxisLabel } : undefined,
        },
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
              weight: 'bold' as const,
            },
            callback: function(value: any) {
              return valueFormatter(value);
            }
          },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
        },
      },
      interaction: { intersect: false, mode: 'index' as const },
      animation: { duration: 1000 },
    };
    return (
      <div className="w-full h-96">
        <Line data={chartData} options={options} />
      </div>
    );
  }

  // Single-line mode
  const {
    data,
    label,
    color = 'rgb(59, 130, 246)',
    yAxisLabel = '',
    valueFormatter = (v) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    regressionLine
  } = props as LineChartSingleProps;

  const chartData = {
    labels: data.map(item => item.x),
    datasets: [
      {
        label,
        data: data.map(item => item.y),
        borderColor: color,
        backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.1)'),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: color,
        pointHoverBackgroundColor: color,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      ...(regressionLine && regressionLine.data.length > 1 ? [{
        label: regressionLine.label || 'Regression Line',
        data: regressionLine.data.map(item => item.y),
        borderColor: regressionLine.color || 'rgba(59,130,246,0.5)',
        borderWidth: 2,
        fill: false,
        tension: 0,
        pointRadius: 0,
        borderDash: [6, 6],
        pointHoverRadius: 0,
        pointBackgroundColor: regressionLine.color || 'rgba(59,130,246,0.5)',
        pointHoverBackgroundColor: regressionLine.color || 'rgba(59,130,246,0.5)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointBorderWidth: 0,
        order: 10,
      }] : [])
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
            size: 12,
            weight: 'bold' as const,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        titleFont: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
          size: 13,
          weight: 'bold' as const,
        },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return valueFormatter(context.parsed.y);
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
            weight: 'bold' as const,
          },
          callback: function(_val: any, index: number) {
            const x = data[index]?.x;
            if (typeof x === 'string' && x.length === 4 && !isNaN(Number(x))) {
              if (data.length > 30) {
                return parseInt(x) % 10 === 0 ? x : '';
              } else if (data.length > 15) {
                return parseInt(x) % 5 === 0 ? x : '';
              }
            }
            return x;
          }
        },
        title: yAxisLabel ? { display: true, text: yAxisLabel } : undefined,
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
            weight: 'bold' as const,
          },
          callback: function(value: any) {
            return valueFormatter(value);
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    animation: {
      duration: 1000,
    },
  };

  return (
    <div className="w-full h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
