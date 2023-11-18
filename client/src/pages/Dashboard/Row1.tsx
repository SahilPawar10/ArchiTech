import DashboardBox from "../../components/DashboardBox";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  Legend,
  BarChart,
  LabelList,
  Bar,
} from "recharts";

import { useTheme } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useMemo } from "react";
import { DayWise } from "../../state/types";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 8,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 18,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};

function Row1() {
  const { palette } = useTheme();

  const cateGory = useAppSelector((state) => state.kpis.category_distribution);
  const responseTimeDaily = useAppSelector(
    (state) => state.kpis.response_times
  );

  const barData = useMemo(() => {
    if (cateGory.length === 0) {
      return null;
    }
    return Object.entries(cateGory[0]).map(([category, time]) => ({
      categories: category,
      time: time,
    }));
  }, [cateGory]);

  const dailyResponse = useMemo(() => {
    if (responseTimeDaily.length === 0) {
      return null;
    }
    return responseTimeDaily[0].day_wise.map((item) => ({
      date: item.date.substring(5),
      time: item.average_time,
    }));
  }, [responseTimeDaily]);

  const weekWise = useMemo(() => {
    if (responseTimeDaily.length === 0) {
      return null;
    }
    return responseTimeDaily[0].week_wise.map((item) => ({
      date: item.week,
      time: item.average_time,
    }));
  }, [responseTimeDaily]);

  useEffect(() => {}, [responseTimeDaily]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="category_distribution"
          subtitle="queries per category."
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={barData}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <defs>
              <linearGradient id="colorCategory" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="1%"
                  stopColor={palette.secondary[800]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={palette.secondary[800]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.secondary[500]} />
            <XAxis
              dataKey="categories"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="time" fill="url(#colorCategory)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Time Trends"
          subtitle="On Weekly Basis"
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={dailyResponse}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="time" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Time Trends"
          subtitle="On Monthly Basis"
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={weekWise}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row1;
