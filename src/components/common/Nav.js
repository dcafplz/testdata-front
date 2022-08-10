import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Login from './Login';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    AppBar,
    Link,
    Toolbar,
    Typography,
} from "@mui/material";

const Nav = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const userId = localStorage.getItem("user_id");
    const userImg = localStorage.getItem("user_image");

    useEffect(() => {
        if (userId) {
            setLoggedIn(true);
        }
    }, [userId, userImg]);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_id");
        setLoggedIn(false);
        window.location.reload();
    };




    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    <Link
                        variant="button"
                        color="inherit"
                        href="/"
                        underline="none"
                        fontFamily="Jua"
                        fontSize="2.5rem"
                        fontWeight="900"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        DummyPlus
                    </Link>
                </Typography>
                <nav>
                    <>
                        <Link
                            variant="button"
                            color="inherit"
                            href="/reviews"
                            underline="none"
                            fontFamily="Jua"
                            fontSize="1.5rem"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            후기
                        </Link>
                        {!isLoggedIn ? 
                        (
                            <>
                        <Link
                            variant="button"
                            color="inherit"
                            onClick={openModal}
                            underline="none"
                            fontFamily="Jua"
                            fontSize="1.5rem"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            로그인
                        </Link>
                        <Dialog
                            open={isModalVisible}
                            onClose={() => handleCancel()}
                            scroll="body"
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            maxWidth="md"
                        >
                            <DialogContent dividers>
                                <DialogContentText 
                                id="scroll-dialog-description" 
                                tabIndex={-1} 
                                fontFamily="Jua"
                                >
                                    <Title>
                                      DummyPlus와 함께
                                  </Title>
                                  
                                 <Login onCancel={handleCancel} setLoggedIn={setLoggedIn} />
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>

                        </>
                        ):(
                            <>
                            <Link
                                variant="button"
                                color="inherit"
                                href="/mypage"
                                underline="none"
                                fontFamily="Jua"
                                fontSize="1.5rem"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                마이페이지
                            </Link>
                
                            <Link
                                variant="button"
                                color="inherit"
                                onClick={handleLogout}
                                underline="none"
                                fontFamily="Jua"
                                fontSize="1.5rem"
                                sx={{ my: 1, mx: 1.5 }}
                            >
                                로그아웃
                            </Link>
                        </>
                        )}

                    </>
                </nav>
            </Toolbar>
        </AppBar>

    )
};



export default Nav;

const Title = styled.div`
	font-size: 26px;
	white-space: pre-wrap;
    text-align : center;
}
`
