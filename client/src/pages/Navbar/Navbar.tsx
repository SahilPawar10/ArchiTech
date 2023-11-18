import { useState } from "react";
import { Link } from "react-router-dom";
import PixIcon from "@mui/icons-material/Pix";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Typography, useTheme } from "@mui/material";

type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="0.25rem"
        p="0.5rem 0rem"
      >
        <Box display="flex" alignItems="center">
          <PixIcon
            sx={{ fontSize: "30px", color: `${palette.secondary[800]}` }}
          />
          <Typography
            variant="h4"
            fontSize="20px"
            color={palette.secondary[800]}
          >
            ArchiTech
          </Typography>
        </Box>
        <Box>
          <AccountCircleIcon
            sx={{ fontSize: "30px", color: `${palette.secondary[800]}` }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default Navbar;
