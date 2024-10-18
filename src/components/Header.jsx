import { Typography, Box, useTheme } from "@mui/material";
const Header =({title, subtitle}) =>{

    return (
        <Box mb="30px">
            <Typography variant ="h4" color="GrayText" fontWeight="bold" 
             sx={{mb:"5px"}}
             >
                {title}
            </Typography>
            <Typography variant="h5" color="green">
                {subtitle}
            </Typography>
            
        </Box>
    )
}

export default Header;