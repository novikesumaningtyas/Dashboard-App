import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { DASHBOARD, FORM_MODE, ROUTES } from "../../lib/enum";
import { PaddedDiv } from "../common/PaddedDiv/PaddedDiv";
import { useHistory } from "react-router";
import { FormMessage } from "../common/FormMessage/FormMessage";
import {
  AppCardOptionContainer,
  StyledAppCanvasContainer,
  StyledBodyContent,
  MaxWidthButtonOption,
  AppCardContainer,
} from "./Dashboard.style";
import { FcPlus, FcNext } from "react-icons/fc";
import ListGroup from "react-bootstrap/ListGroup";
import useSelectorHelper from './../../lib/utils/selectorHelper';
import { createNewAppDetails } from "../../lib/store/state.action";
import {useDispatch} from 'react-redux';


export function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  //const apps = [{ title: "Test App 1" }, { title: "Test App 2" }];
   const {apps} = useSelectorHelper();
  const isAppExist: boolean = apps?.length > 0;

  const handleCreateSandBoxApp = () => {
    dispatch(createNewAppDetails());
    history.push(ROUTES.CREATE_APP_DETAILS)
  }

  return (
    <Container fluid>
      <PaddedDiv textAlign={"left"} paddingTop={"40px"}>
        <Row>
          <Col xl={10} lg={10} md={10} sm={12} xs={12}>
            <h1>{DASHBOARD.TITLE} </h1>
          </Col>
        </Row>
      </PaddedDiv>
      <PaddedDiv textAlign={"left"}>
        <PaddedDiv paddingBottom={isAppExist ? "0" : "24px"}>
          <Row>
            <Col xl={9} lg={9} md={9} sm={12} xs={12}>
              {DASHBOARD.DESCRIPTION}
            </Col>
          </Row>
        </PaddedDiv>
        {!isAppExist && (
          <Row>
            <Col>
              <FormMessage
                variant="info"
                title="No Apps registered!"
                focused={true}
              >
                <p>{DASHBOARD.MSG_NO_APP}</p>
              </FormMessage>
            </Col>
          </Row>
        )}
      </PaddedDiv>

      <StyledAppCanvasContainer>
        <Row>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <PaddedDiv>
              <Row>
                <Col>
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <h2>{DASHBOARD.MY_APPS}</h2>
                  </div>
                </Col>
              </Row>
            </PaddedDiv>

            <PaddedDiv>
              <Row>
                <Col>
                  <AppCardOptionContainer
                    id="CreateSandboxApp"
                    tabIndex={-1}
                    onClick={handleCreateSandBoxApp}
                  >
                    <StyledBodyContent>
                      <MaxWidthButtonOption variant="link">
                        Create a SandboxApp
                      </MaxWidthButtonOption>
                    </StyledBodyContent>
                    <FcPlus style={{ fontSize: "2em" }} />
                  </AppCardOptionContainer>
                  {isAppExist
                    ? apps.map((app, index) => {
                        return (
                          <AppCardContainer tabIndex={-1} key={app?.title} onClick={() => {
                            history.push(
                              `${ROUTES.APP_DETAILS}`,
                              {
                                from: ROUTES.DASHBOARD,
                                appClientId: app?.client?.clientid,
                                mode: FORM_MODE.VIEW
                              }
                            )
                          }}>
                            <PaddedDiv paddingBottom={"0"} display={"flex"}>
                              <MaxWidthButtonOption variant="link">
                                {app.title}
                              </MaxWidthButtonOption>
                              <PaddedDiv marginTop={"8px"} paddingBottom={"0"}>
                                <FcNext style={{ fontSize: "2em" }} />
                              </PaddedDiv>
                            </PaddedDiv>
                          </AppCardContainer>
                        );
                      })
                    : null}
                </Col>
              </Row>
            </PaddedDiv>
          </Col>

          {/* OPTIONS */}
          <Col xl={4} lg={4} md={4} sm={12} xs={12}>
            <div style={{ textAlign: "left" }}>
              <Row>
                <Col>
                  <h2>{DASHBOARD.MY_OPTION}</h2>
                </Col>
              </Row>
              <PaddedDiv marginTop={"32px"} paddingBottom={"0"}>
                <ListGroup as="ul" variant="flush">
                  <ListGroup.Item action variant="info">
                    Explore APIs
                    <FcNext
                      style={{
                        fontSize: "1em",
                        textAlign: "right",
                        right: "12px",
                        position: "absolute",
                        top: "13px",
                      }}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item action variant="info">
                    Getting Started
                    <FcNext
                      style={{
                        fontSize: "1em",
                        textAlign: "right",
                        right: "12px",
                        position: "absolute",
                        top: "13px",
                      }}
                    />
                  </ListGroup.Item>
                </ListGroup>
              </PaddedDiv>
            </div>
          </Col>
        </Row>
      </StyledAppCanvasContainer>
    </Container>
  );
}
