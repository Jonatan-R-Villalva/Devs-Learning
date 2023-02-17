import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooksRedux";
import { Link as ReactLink } from "react-router-dom";

import { Box , Grid , Typography , Button  } from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Admin from "./NavBarAdmin"
//import '@fontsource/roboto/500.css';

const DashboardAdmin: React.FC = () => {
  return (
    <Grid container mt={9} xs={12}>
      <Grid item xs={ 2 } sx= {{backgroundColor : 'text.secondary'}} p={2} height="100vh">
        {/* <Box display="flex" justifyContent="center">
        <AdminPanelSettingsIcon />
        <Typography variant="body1" textAlign={"center"}>Admin</Typography>
        </Box> */}
        <Admin />
      </Grid>
      <Grid item xs={10}>
        <Grid item xs={12} border={1} height="10vh">
            <Box display={"flex"} justifyContent={"space-between"} m={2}>
              <Typography variant="h5">Dashboard</Typography>  
            </Box>
        </Grid>
        <Grid container display="flex" justifyContent={"space-around"}>

          <Grid item xs={3.3} border={1} m={3} height="35vh">
            
          </Grid>

          <Grid item xs={3.3} border={1} m={3} height="35vh">

          </Grid>

          <Grid item xs={3.3} border={1} m={3} height="35vh">

          </Grid>

          <Grid item xs={12} border={1} m={3} height="40vh">

          </Grid>

        
        </Grid>
      </Grid>

    </Grid>
  );
};

export default DashboardAdmin;