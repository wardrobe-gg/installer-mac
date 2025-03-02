import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlyingPersonRender from "./assets/flying_person_render.png";
import { invoke } from "@tauri-apps/api/core";

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
    padding-bottom: 20rem;
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

const CloseButton = styled.button`
    font-family: "Ranyth", sans-serif;
    font-size: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    width: "90%";
    padding-left: 35px;
    padding-right: 35px;
    cursor: pointer;
    background-color: #41414a;
    border: none;
    color: white;
`;

const AlreadyInstalledView = () => {
    const navigate = useNavigate();

    const closeInstaller = async () => {
        await invoke("exit_app");
    };

    return (
        <Container>
            <ContentWrapper>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            width: "60vw",
                            flexDirection: "column",
                            gap: "14rem",
                        }}
                    >
                        <Title>Wardrobe is already installed</Title>
                        <CloseButton onClick={closeInstaller}>
                            Close Installer
                        </CloseButton>
                    </div>

                    <div
                        style={{
                            width: "10vw",
                            height: "80vh",
                        }}
                    >
                        <img
                            src={FlyingPersonRender}
                            style={{
                                width: "70vw",
                                translate: "-16rem -8rem",
                            }}
                        />
                    </div>
                </div>
            </ContentWrapper>
        </Container>
    );
};

export default AlreadyInstalledView;
