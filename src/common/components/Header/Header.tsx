import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "./MenuButton";
import Switch from "@mui/material/Switch";
import AppBar from "@mui/material/AppBar";
import React from "react";
import {changeThemeModeAC} from "./app/app-reducer";
import {getTheme} from "./common/theme/theme";
import {useAppDispatch, useAppSelector} from "./app/hook";
export const Header = () => {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const dispatch = useAppDispatch()
    const theme = getTheme(themeMode)
    const changeModeHandler = () => {
        dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : 'light'))
    }
    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
        </AppBar>
    )
}
