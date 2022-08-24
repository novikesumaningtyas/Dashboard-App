import React, { useContext, useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory } from "react-router";
import useSelectorHelper from "../../lib/utils/selectorHelper";
import { StyledAppCanvasContainer, Border } from "../Dashboard/Dashboard.style";
import useFunctionHelper from "../../lib/utils/functionHelper";
import {
  FcFullTrash as DeleteIcon,
  FcInternal as DownloadIcon,
} from "react-icons/fc";
import {
  deleteApp,
  deleteAppClientSecret,
  updateAppClientDetails,
} from "../../lib/store/state.action";
import { useDispatch } from "react-redux";
import { PaddedDiv } from "../common/PaddedDiv/PaddedDiv";
import { IHistoryState } from "../AppContainer/AppContext";
import { InitialHistoryState } from "../../lib/constants";
import {
  APP_DETAILS_VIEW_PAGE,
  ERROR_MESSAGE,
  FORM_MODE,
  ROUTES,
  STEP,
} from "../../lib/enum";
import {
  ApiLegals,
  ApiStatus,
  AppDetailsBody,
  AppRowDetailsValue,
  AppViewBody,
  AppViewSubTitle,
  BackToDashboardButton,
  TermAndCondDetails,
  CLientDetailsBody,
} from "./CommonComponent";

function AppDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  //@ts-ignore
  const historyState: IHistoryState =
    history?.location?.state ?? InitialHistoryState;
  const clientId = historyState?.appClientId ?? "";

  const { findAppFromClientId } = useFunctionHelper();
  const [formMode, setFormMode] = useState("");
  const [app, setApp] = useState(findAppFromClientId(clientId));
  const [isError, setIsError] = useState(false);
  const [isSuccessResetClient, setIsSuccessResetClient] = useState(false);
  const [errorMsg, setErrorMsg] = useState(ERROR_MESSAGE.DEFAULT);

  useEffect(() => {
    switch (historyState.mode) {
      case FORM_MODE.EDIT:
        setFormMode(FORM_MODE.EDIT);
        break;

      case FORM_MODE.NEW:
        setFormMode(FORM_MODE.NEW);
        break;

      case FORM_MODE.VIEW:
        setFormMode(FORM_MODE.VIEW);
        break;
    }
  }, [historyState.mode]);

  const { collections: appCollections = [], client } = app;

  const collectionLength = appCollections.length;
  const [isOpened, setIsOpened] = useState(
    new Array(collectionLength).fill(false)
  );

  useEffect(() => {
    setIsOpened(new Array(collectionLength).fill(false));
  }, [collectionLength]);

  const handleTermAndCond = (position: number) => {
    const updatedCheckedState = isOpened.map((item, index) =>
      index === position ? !item : item
    );
    setIsOpened(updatedCheckedState);
  };

  const { apps } = useSelectorHelper();

  return (
    <Container fluid>
      <Form>
        <h1>{app?.title ?? ""}</h1>
        <StyledAppCanvasContainer>
          <AppViewBody>
            {
              <Col xl="8" lg="8" md="8" sm="12" xs="12">
                {/** App Details */}
                <AppViewSubTitle step={STEP.APP_DETAILS} />
                <AppDetailsBody
                  appTitle={app?.title ?? ""}
                  appDescription={app?.description ?? ""}
                />

                {/** App APIs */}
                <AppViewSubTitle step={STEP.SELECT_API} />
                <Row>
                  <Col>
                    {appCollections?.length > 0 &&
                      appCollections.map((api, index) => {
                        return (
                          <PaddedDiv paddingBottom={"0"} key={api?.title ?? ""}>
                            <AppRowDetailsValue
                              fieldName={APP_DETAILS_VIEW_PAGE.API_HEADING}
                              inputValue={api?.title ?? ""}
                              paddingTop={"24px"}
                            />
                            <ApiStatus />
                            <PaddedDiv paddingBottom={"16px"}>
                              <ApiLegals
                                onChangeForm={() => handleTermAndCond(index)}
                              />
                              <TermAndCondDetails
                                isShow={isOpened[index]}
                                appTitle={api?.title}
                              />
                            </PaddedDiv>
                            {index < appCollections.length - 1 && <Border />}
                          </PaddedDiv>
                        );
                      })}
                  </Col>
                </Row>

                {/** Client App Details */}
                <AppViewSubTitle step={STEP.AUTH} />
                <CLientDetailsBody
                  authMethod={app?.authMethod ?? ""}
                  sessionIdleTime={app?.client?.sessionIdleTime ?? ""}
                  scopes={app?.client?.scopes ?? ""}
                  tokenExpiryTime={app?.client?.tokenExpiryTime ?? ""}
                  createdAt={app?.createdAt ?? ""}
                  clientid={app?.client?.clientid ?? ""}
                />
                <BackToDashboardButton
                  onChangeForm={() => {
                    history.push(ROUTES.DASHBOARD);
                  }}
                />
              </Col>
            }
            {
              /** BUTTON AND OTHER OPTION */
              <Col xl="4" lg="4" md="4" sm="12" xs="12">
                <AppViewSubTitle appOption={true} />
                {/* <DownloadIcon
                  style={{
                    fontSize: "1em",
                    textAlign: "right",
                    right: "12px",
                    position: "absolute",
                    top: "13px",
                  }}
                />
                Download Client Secret */}
                <PaddedDiv paddingBottom={"0"} textAlign={"left"}>
                  <ListGroup as="ul" variant="flush">
                    <ListGroup.Item action variant="info">
                      Delete App
                      <DeleteIcon
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
              </Col>
            }
          </AppViewBody>
        </StyledAppCanvasContainer>
      </Form>
    </Container>
  );
}

export default AppDetails;
