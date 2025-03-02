import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OptifineImage from "./assets/optifine.png";
import BackImage from "./assets/back.png";

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
    font-size: 48px;
    color: white;
    white-space: pre-line;
    margin: 0;
`;

const Text = styled.p`
    font-family: "Basically", sans-serif;
    font-size: 22px;
    color: white;
`;
const RedText = styled.span`
    font-family: "Basically", sans-serif;
    font-size: 22px;
    color: #e54545;
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

const InstallButton = styled.button`
    font-family: "Ranyth", sans-serif;
    font-size: 24px;
    padding-top: 12px;
    padding-bottom: 12px;
    width: 45%;
    cursor: pointer;
    background-color: #ff3475;
    border: none;
    color: white;
`;

const OptifineView = () => {
    const navigate = useNavigate();

    const handleInstall = async () => {
        try {
            const response = await invoke("install_optifine");

            switch (response) {
                case "already-installed":
                    navigate("/already-installed");
                    break;
                case "success":
                    navigate("/success");
                    break;
                default:
                    console.error("Unknown response:", response);
                    alert(
                        "Unexpected response from installer. Please try again."
                    );
            }
        } catch (error) {
            console.error("Error installing Optifine:", error);
            alert("Failed to install Optifine. Please try again.");
        }
    };

    return (
        <Container>
            <ContentWrapper>
                <button
                    style={{
                        position: "fixed",
                        left: "40px",
                        translate: "0 -10px",
                        background: "transparent",
                        fontSize: "48px",
                        width: "48px",
                        color: "#79797A",
                        outlineWidth: "0px",
                        border: "none",
                        fontFamily: "Basically",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    <img src={BackImage} />
                </button>
                <Title>
                    Configure your <br />
                    installation
                </Title>
                <br />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Text>Please note that</Text>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                        }}
                    >
                        <RedText>
                            - Optifine only supports static capes and cosmetics,{" "}
                            <b>NO ANIMATION</b>
                        </RedText>
                        <RedText>
                            - Cosmetics are only supported above version 1.14
                            and don't work with some clients
                        </RedText>
                    </div>
                    <Text
                        style={{
                            width: "915px",
                            textWrap: "pretty",
                        }}
                    >
                        If you want to use all of wardrobe's features, instead
                        go back and use a Fabric or Forge installation
                    </Text>
                    <Text
                        style={{
                            width: "915px",
                            textWrap: "pretty",
                            color: "#79797A",
                        }}
                    >
                        For a detailed compatability list, head over to
                        <a
                            href="https://wardrobe.gg/faq"
                            style={{
                                textDecoration: "underline",
                                marginLeft: "6px",
                                color: "#79797A",
                            }}
                        >
                            www.wardrobe.gg/faq
                        </a>
                    </Text>
                    <br />
                    <br />
                    <InstallButton onClick={handleInstall}>
                        Install
                    </InstallButton>
                </div>
            </ContentWrapper>
        </Container>
    );
};

export default OptifineView;
