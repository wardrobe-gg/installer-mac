import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OptifineImage from "./assets/optifine.png";

const Container = styled.div`
    background-color: #111113;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    padding-top: 80px;
    padding-left: 116px;
    margin: 0px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Title = styled.h1`
    font-family: "Ranyth", sans-serif;
    font-size: 42px;
    color: white;
    white-space: pre-line;
    margin: 0;
`;

const ImageContainer = styled.div`
    margin-top: 40px;
    cursor: pointer;
`;

const StyledImage = styled.div`
    width: 239px;
    height: 239px;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    border: 2px solid #808080;
`;

const ImageLabel = styled.h2`
    font-family: "Ranyth", sans-serif;
    font-size: 24px;
    color: white;
    margin-top: 20px;
`;

const ContentView = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <ContentWrapper>
                <Title>Where do you want to {"\n"}install wardrobe?</Title>

                <ImageContainer onClick={() => navigate("/optifine")}>
                    <StyledImage src={OptifineImage} />
                    <ImageLabel>Optifine</ImageLabel>
                </ImageContainer>
            </ContentWrapper>
        </Container>
    );
};

export default ContentView;
