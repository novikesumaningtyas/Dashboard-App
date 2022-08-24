import { ROUTES, STEP } from "../../../lib/enum";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { AuthMethod } from "../../AppContainer/AppContext";
import { useDispatch } from "react-redux";
import { selectCreateAppAuth } from "../../../lib/store/state.action";
import useSelectorHelper from "../../../lib/utils/selectorHelper";
import useFunctionHelper from "./../../../lib/utils/functionHelper";
import { PaddedNavButton } from "../../common/PaddedNavButton/PaddedNavButton";
import { FormAppBody, PageHeader } from "./../CommonComponent";
import { AUTHENTICATION} from "../../../lib/constants";
import { PaddedDiv } from "../../common/PaddedDiv/PaddedDiv";

function Authentication() {
  const { authMethod, apps } = useSelectorHelper();
  const { handleCancel } = useFunctionHelper();
  const history = useHistory();
  const dispatch = useDispatch();
  const pageStep = STEP.AUTH;
  let isCheckedArray = new Array(AUTHENTICATION.length).fill(false);
  isCheckedArray = AUTHENTICATION.map((auth) => auth.value === authMethod);
  const [selected, setSelected] = useState(isCheckedArray);
  const [validated, setValidated] = useState(false);

  const handleSelect = (position: number, auth: AuthMethod) => {
    const updateSelectedState = selected.map(
      (_, index) => index === position && true
    );

    setSelected(updateSelectedState);
    dispatch(selectCreateAppAuth({ appIndex: apps.length - 1, auth }));
  };

  const handleSubmit = (event: any) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      history.push(ROUTES.T_AND_C);
    }

    setValidated(true);
  };

  return (
    <Container fluid>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <PageHeader step={pageStep} />
        <FormAppBody>
          <PaddedDiv>
            <Row>
              <Col>
                <Form.Group>
                  <div style={{ textAlign: "left" }}>
                    <Form.Label>Token endpoint auth method</Form.Label>
                  </div>

                  <InputGroup>
                    {AUTHENTICATION.map((auth, index) => {
                      return (
                      <>
                          <InputGroup.Radio
                            value={auth.value}
                            aria-label={auth.label}
                            name="auth"
                            id={auth.label}
                            onChange={() => {
                              handleSelect(index, auth.value);
                            }}
                            key={auth.label}
                            checked={selected[index]}
                          />
                          <InputGroup.Text key={`Label${auth.label}`} style={{ width: "95%" }}>
                            {auth.label}
                          </InputGroup.Text>
                        </>
                      );
                    })}
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </PaddedDiv>
          <PaddedNavButton
            previousButtonLabel={"Cancel"}
            onPrevious={handleCancel}
          />
        </FormAppBody>
      </Form>
    </Container>
  );
}

export default Authentication;
