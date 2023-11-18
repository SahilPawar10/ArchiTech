import React, { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
// import { useKpiDataQuery } from "../../state/api";
import { addToStore } from "../../state/kpiSlice";
import Row1 from "./Row1";
import Row2 from "./Row2";

type Props = {};

const gridTemplate = `
  "a b c"
  "a b c"
  "a b c"
  "d e f"
  "d e f"
  "d e f"

`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "e"
  "f"
  "f"
  "f"
`;
const Dashbord = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await axios.get("http://localhost:3500/kpi");
    if (data) {
      dispatch(addToStore(data[0]));
    }
  }

  const count = useAppSelector((state) => state.kpis.insight_summary);

  useEffect(() => {
    // console.log(count, "Insights Summary");
  }, [count]);

  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(3,minmax(370px,1fr))",
              gridTemplateRows: "repeat(6,minmax(60px,1fr))",
              gridTemplateAreas: gridTemplate,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens,
            }
      }
    >
      <Row1 />
      <Row2 />
    </Box>
  );
};

export default Dashbord;
