import React from "react";
import Button from "@material-ui/core/Button";
import CalendarPage from "./CalendarPage";
import styled from "styled-components";
import "./HomePage.css";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(https://images.unsplash.com/photo-1621096785632-ac3085e6864b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max/1920x1080);
  background-size: cover;
`;

const HomePage = () => {
  let isLogin = false;

  return (
    <>
      {isLogin ? (
        <CalendarPage />
      ) : (
        <Container>
          <div className="flex-container">
            <Button variant="contained" color="primary" size="large">
              <Link to="/signin">시작하기</Link>
            </Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default HomePage;
