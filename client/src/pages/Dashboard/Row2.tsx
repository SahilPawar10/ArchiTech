import DashboardBox from "../../components/DashboardBox";
import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  LineChart,
  Legend,
  BarChart,
  PieChart,
  Pie,
  Sector,
  Cell,
  Bar,
} from "recharts";

import { useTheme } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import { useAppSelector } from "../../state/hooks";
import { useEffect, useMemo } from "react";
import { renderActiveShape as importedRender } from "../../utils/pieData";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 8,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 18,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const piedatas = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  startAngle: any;
  endAngle: any;
  fill: any;
  payload: any;
  percent: any;
  value: any;
}) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.cname}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#080b12"
      >{`${payload.name} ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#080b12"
      >
        {`(Usage ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
function Row2() {
  const { palette } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);

  const [active1Index, setActive1Index] = useState(0);

  const [active2Index, setActive2Index] = useState(0);

  const usage_statistics = useAppSelector(
    (state) => state.kpis.usage_statistics
  );

  const usersatisFaction = useAppSelector(
    (state) => state.kpis.user_satisfaction
  );

  const pieData = useMemo(() => {
    if (usage_statistics.length === 0) {
      return null;
    }
    return Object.entries(usage_statistics[0].by_country).map(
      ([country, data]) => ({
        name: country,
        value: data,
      })
    );
  }, [usage_statistics]);

  const pieDataBbyPlat = useMemo(() => {
    if (usage_statistics.length === 0) {
      return null;
    }
    return Object.entries(usage_statistics[0].by_platform).map(
      ([country, data]) => ({
        name: country,
        value: data,
      })
    );
  }, [usage_statistics]);

  const userSatisfy = useMemo(() => {
    if (usersatisFaction.length === 0) {
      return null;
    }
    return Object.entries(usersatisFaction[0].ratings).map(
      ([rating, count]) => ({
        name: count.rating,
        value: count.count,
      })
    );
  }, [usersatisFaction]);

  useEffect(() => {
    console.log(userSatisfy, "graph");
    console.log(usersatisFaction);
  }, [usage_statistics]);

  const onPieEnter = (_: any, index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };
  const onPieEnter1 = (_: any, index: React.SetStateAction<number>) => {
    setActive1Index(index);
  };
  const onPieEnter2 = (_: any, index: React.SetStateAction<number>) => {
    setActive2Index(index);
  };

  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Usage Statistic"
          subtitle="Usage By Country"
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            width={400}
            height={400}
            margin={{
              top: 5,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader
          title="Usage Statistic"
          subtitle="Usage By Platform"
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              width={400}
              height={400}
              margin={{
                top: 5,
                right: 0,
                left: -10,
                bottom: 55,
              }}
            >
              <Pie
                activeIndex={active1Index}
                activeShape={renderActiveShape}
                data={pieDataBbyPlat}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter1}
              />
            </PieChart>
          </ResponsiveContainer>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Rating Statistics"
          subtitle="Rating by counts"
          sideText="viewMore"
        />
        <ResponsiveContainer width="100%" height="100%">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              width={400}
              height={400}
              margin={{
                top: 5,
                right: 0,
                left: -10,
                bottom: 55,
              }}
            >
              <Pie
                activeIndex={active2Index}
                activeShape={importedRender}
                data={userSatisfy}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter2}
              />
            </PieChart>
          </ResponsiveContainer>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row2;
