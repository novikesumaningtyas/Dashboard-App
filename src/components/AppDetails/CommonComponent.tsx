import React from "react";
import {
  STEP,
  FORM_MODE,
  APP_DETAILS,
  SELECT_API,
  AUTH_PAGE,
  TERM_COND_PAGE,
  ROUTES,
  APP_DETAILS_VIEW_PAGE,
} from "../../lib/enum";
import { PageTitle } from "../Dashboard/Dashboard.style";
import { Row, Col, ProgressBar, Form, Button, Badge } from "react-bootstrap";
import { IPaddingValues, PaddedDiv } from "../common/PaddedDiv/PaddedDiv";
import { dummyCallback } from "./../../lib/constants";
import { AuthMethod } from "../AppContainer/AppContext";
import { FcLeft as BackIcon } from "react-icons/fc";
import { useHistory } from "react-router";
import {
  HeaderDetails,
  HeaderWithDesc,
  StyledBack,
  StyledParagraph,
} from "./CreateAppDetails/style";
import useFunctionHelper from "./../../lib/utils/functionHelper";
import { COLOR } from "../../lib/color";

type IStep = STEP.APP_DETAILS | STEP.SELECT_API | STEP.AUTH | STEP.TERM;
export type FormMode = FORM_MODE.EDIT | FORM_MODE.NEW | FORM_MODE.VIEW | "";

interface IProgress {
  step: IStep;
}

interface IFormItem {
  onChangeForm?: any;
  inputValue?: any;
  fieldName?: string;
  appTitle?: string;
  appDescription?: string;
  authMethod?: AuthMethod;
  sessionIdleTime?: number;
  scopes?: string | string[];
  tokenExpiryTime?: any;
  createdAt?: string;
  clientid?: string;
  buttonLabel?: string;
  step?: IStep;
  paddingTop?: IPaddingValues;
  appOption?: boolean;
  selectedOption?: boolean[];
}

interface ITitle {
  mode?: FormMode;
  step?: IStep;
  appTitle?: string;
  isShow?: boolean;
}

interface IFormBody {
  children?: React.ReactNode;
}

export function Title({ mode, step, appTitle }: ITitle) {
  let pageTitle = "";

  if (mode === FORM_MODE.EDIT) {
    pageTitle = `Edit - ${appTitle}`;
  } else if (mode === FORM_MODE.VIEW) {
    return (
      <PageTitle>
        <Row>
          <Col xl={10} lg={10} md={10} sm={12} xs={12}>
            <PaddedDiv paddingBottom={"0"} display={"flex"}>
              <PaddedDiv paddingRight={"24px"} paddingBottom={"8px"}>
                <h1>{appTitle}</h1>
              </PaddedDiv>
            </PaddedDiv>
          </Col>
        </Row>
      </PageTitle>
    );
  } else {
    switch (step) {
      case STEP.APP_DETAILS:
        pageTitle = APP_DETAILS.CREATE_APP;
        break;
      case STEP.SELECT_API:
        pageTitle = SELECT_API.AVAILABLE_API;
        break;
      case STEP.AUTH:
        pageTitle = AUTH_PAGE.AUTH_TITLE;
        break;
      case STEP.TERM:
        pageTitle = TERM_COND_PAGE.TITLE;
        break;
    }
  }

  return (
    <PageTitle>
      <Row>
        <Col xl={9} lg={9} md={10} sm={12} xs={12}>
          <h1>{pageTitle}</h1>
        </Col>
      </Row>
    </PageTitle>
  );
}

export function Description({ step }: IProgress) {
  let description = "";
  switch (step) {
    case STEP.APP_DETAILS:
      description = APP_DETAILS.DESCRIPTION;
      break;

    case STEP.SELECT_API:
      description = SELECT_API.DESCRIPTION;
      break;

    case STEP.AUTH:
      description = AUTH_PAGE.DESCRIPTION;
      break;

    case STEP.TERM:
      description = TERM_COND_PAGE.DESCRIPTION;
      break;
  }

  return (
    <PaddedDiv textAlign={"left"}>
      <Row>
        <Col xl={9} lg={9} md={10} sm={12} xs={12}>
          <p>{description}</p>
        </Col>
      </Row>
    </PaddedDiv>
  );
}

export function ProgressStep({ step }: IProgress) {
  let progress = 0;
  let handleBack;
  const history = useHistory();
  let isShow = true;
  switch (step) {
    case STEP.APP_DETAILS:
      progress = 25;
      isShow = false;
      break;
    case STEP.SELECT_API:
      progress = 50;
      handleBack = () => {
        history.push(ROUTES.CREATE_APP_DETAILS);
      };
      break;
    case STEP.AUTH:
      progress = 75;
      handleBack = () => {
        history.push(ROUTES.SELECT_APIS);
      };
      break;
    case STEP.TERM:
      progress = 100;
      handleBack = () => {
        history.push(ROUTES.AUTHENTICATION);
      };
      break;
  }
  return (
    <Row>
      <Col xl={9} lg={9} md={10} sm={12} xs={12}>
        <PaddedDiv>
          <ProgressBar
            animated
            variant="info"
            now={progress}
            label={`${progress}%`}
          />
          {isShow && (
            <StyledBack onClick={handleBack} tabIndex={-1}>
              <BackIcon
                style={{
                  fontSize: "2em",
                  textAlign: "left",

                  position: "absolute",
                }}
              />
              <p style={{ paddingTop: "4px", paddingLeft: "35px" }}> Back</p>
            </StyledBack>
          )}
        </PaddedDiv>
      </Col>
    </Row>
  );
}

export function SubTitle({ step }: IProgress) {
  let title = "";
  switch (step) {
    case STEP.APP_DETAILS:
      title = APP_DETAILS.APP_DETAILS;
      break;
    case STEP.SELECT_API:
      title = SELECT_API.SELECT_API;
      break;
    case STEP.AUTH:
      title = AUTH_PAGE.SELECT_AUTH;
      break;
    case STEP.TERM:
      title = TERM_COND_PAGE.TERM_COND;
      break;
  }

  return (
    <PaddedDiv textAlign={"left"}>
      <Row>
        <Col xl={9} lg={9} md={10} sm={12} xs={12}>
          <h2>{title}</h2>
        </Col>
      </Row>
    </PaddedDiv>
  );
}

export function PageHeader({ step }: IProgress) {
  return (
    <>
      <Title step={step} />
      <Description step={step} />
      <ProgressStep step={step} />
      <SubTitle step={step} />
    </>
  );
}

export function FormAppBody(props: IFormBody) {
  return (
    <Row>
      <Col xl={9} lg={9} md={10} sm={12} xs={12}>
        {props.children}
      </Col>
    </Row>
  );
}

export function FormAppDescription({
  onChangeForm = dummyCallback,
  inputValue = "",
}: IFormItem) {
  return (
    <PaddedDiv textAlign={"left"}>
      <Row>
        <Col>
          <Form.Group controlId="validationDescription">
            <Form.Label>App Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Your App description..."
              style={{ height: "100px" }}
              onChange={onChangeForm}
              value={inputValue}
              maxLength={280}
            />
            <Form.Control.Feedback type="invalid">
              Description is required
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </PaddedDiv>
  );
}

export function FormAppTitle({
  onChangeForm = dummyCallback,
  inputValue = "",
}: IFormItem) {
  return (
    <PaddedDiv textAlign={"left"}>
      <Row>
        <Col>
          <Form.Group controlId="validationTitle">
            <Form.Label>App Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Your App name..."
              maxLength={50}
              onChange={onChangeForm}
              value={inputValue}
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </PaddedDiv>
  );
}

export function ApiLegals({ onChangeForm = dummyCallback }: IFormItem) {
  return (
    <>
      <StyledParagraph>
        <b>{APP_DETAILS_VIEW_PAGE.API_LEGAL}</b>
      </StyledParagraph>
      <PaddedDiv paddingBottom={"0"} textAlign={"left"}>
        <Button variant="link" onClick={onChangeForm}>
          Terms and Conditions
        </Button>
      </PaddedDiv>
    </>
  );
}

export function ApiStatus({ onChangeForm = dummyCallback }: IFormItem) {
  return (
    <PaddedDiv>
      <PaddedDiv display={"flex"} paddingBottom={"0"}>
        <StyledParagraph>
          <b>{APP_DETAILS_VIEW_PAGE.API_STATUS}</b>
        </StyledParagraph>
      </PaddedDiv>

      <PaddedDiv paddingBottom={"0"} textAlign={"left"}>
        <Badge
          pill
          variant="success"
          style={{ backgroundColor: COLOR.EMERALD }}
        >
          Approved
        </Badge>
      </PaddedDiv>
    </PaddedDiv>
  );
}

export function TermAndCondDetails({ appTitle, isShow }: ITitle) {
  const { findLegal } = useFunctionHelper();
  return (
    <>
      {isShow && appTitle && (
        <StyledParagraph>{findLegal(appTitle)}</StyledParagraph>
      )}
    </>
  );
}

export function AppRowDetailsValue({
  fieldName,
  inputValue,
  paddingTop,
}: IFormItem) {
  const fieldValue = inputValue;

  return (
    <PaddedDiv paddingTop={paddingTop}>
      <StyledParagraph>
        <b>{fieldName}</b>
      </StyledParagraph>
      <StyledParagraph>{fieldValue}</StyledParagraph>
    </PaddedDiv>
  );
}

export function AppDetailsBody({ appTitle, appDescription }: IFormItem) {
  return (
    <Row>
      <Col>
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.APP_NAME}
          inputValue={appTitle}
          paddingTop={"24px"}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.APP_DESCRIPTION}
          inputValue={appDescription}
        />
      </Col>
    </Row>
  );
}

interface IFormViewBody {
  children?: [React.ReactNode, React.ReactNode];
}

export function AppViewBody(props: IFormViewBody) {
  if (props.children) {
    return (
      <Row>
        {props.children[0]}
        {props.children[1]}
      </Row>
    );
  }
  return <> </>;
}

export function AppViewSubTitle({
  onChangeForm = dummyCallback,
  step,
  appOption,
}: IFormItem) {
  let subtitle = "";

  if (step === STEP.AUTH) {
    return (
      <Row>
        <Col>
          <HeaderWithDesc>
            <PaddedDiv paddingBottom={"0"} display={"flex"}>
              <h2 style={{ textAlign: "left", width: "100%" }}>
                {APP_DETAILS_VIEW_PAGE.CLIENT_APP_DETAILS}
              </h2>
              <PaddedDiv
                marginTop={"8px"}
                paddingBottom={"0"}
                paddingRight={"8px"}
              >
                <Button variant="link" onClick={onChangeForm}>
                  Edit
                </Button>
              </PaddedDiv>
            </PaddedDiv>
            <PaddedDiv textAlign={"left"} paddingBottom={"8px"}>
              {APP_DETAILS_VIEW_PAGE.CLIENT_APP_DETAILS_DESC}
            </PaddedDiv>
          </HeaderWithDesc>
        </Col>
      </Row>
    );
  }

  if (appOption) {
    return (
      <Row>
        <Col>
          <HeaderDetails>
            <PaddedDiv>
              <h2 style={{ textAlign: "left", width: "100%" }}>
                {APP_DETAILS_VIEW_PAGE.APP_OPTION}
              </h2>
            </PaddedDiv>
          </HeaderDetails>
        </Col>
      </Row>
    );
  }

  switch (step) {
    case STEP.APP_DETAILS:
      subtitle = APP_DETAILS_VIEW_PAGE.APP_DETAILS;
      break;

    case STEP.SELECT_API:
      subtitle = APP_DETAILS_VIEW_PAGE.APIS;
      break;
  }

  return (
    <Row>
      <Col>
        <HeaderDetails>
          <h2 style={{ textAlign: "left", width: "100%" }}>{subtitle}</h2>
          <PaddedDiv marginTop={"8px"} paddingBottom={"0"}>
            <PaddedDiv>
              <Button variant="link" onClick={onChangeForm}>
                Edit
              </Button>
            </PaddedDiv>
          </PaddedDiv>
        </HeaderDetails>
      </Col>
    </Row>
  );
}

export function CLientDetailsBody({
  authMethod,
  sessionIdleTime,
  scopes,
  tokenExpiryTime,
  createdAt,
  clientid,
}: IFormItem) {
  return (
    <Row>
      <Col>
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_TOKEN_AUTH}
          inputValue={authMethod}
          paddingTop={"24px"}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_SESSION_IDLE}
          inputValue={sessionIdleTime}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_SCOPES}
          inputValue={scopes}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_TOKEN_EXPIRY_TIME}
          inputValue={tokenExpiryTime}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_CREATED}
          inputValue={createdAt}
        />
        <AppRowDetailsValue
          fieldName={APP_DETAILS_VIEW_PAGE.CLIENT_ID}
          inputValue={clientid}
        />
      </Col>
    </Row>
  );
}

export function BackToDashboardButton({
  onChangeForm = dummyCallback,
}: IFormItem) {
  return (
    <Row>
      <Col>
        <PaddedDiv textAlign={"left"}>
          <Button variant="link" onClick={onChangeForm}>
            Back to Dashboard
          </Button>
        </PaddedDiv>
      </Col>
    </Row>
  );
}
