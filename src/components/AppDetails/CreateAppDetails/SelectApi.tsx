import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FormAppBody, PageHeader } from "../CommonComponent";
import { ROUTES, STEP } from "../../../lib/enum";
import { PaddedDiv } from "../../common/PaddedDiv/PaddedDiv";
import { INITIAL_COLLECTION_STATE } from "../../../lib/store/state.reducer";
import { PaddedNavButton } from "../../common/PaddedNavButton/PaddedNavButton";
import { EnhancedTable } from "../../common/EnhancedTable/EnhancedTable";
import { useHistory } from "react-router";
import useSelectorHelper from "../../../lib/utils/selectorHelper";
import useFunctionHelper from "./../../../lib/utils/functionHelper";
import { IAppCollectionListWithConsent } from "../../AppContainer/AppContext";

function SelectApi() {
  const history = useHistory();
  const pageStep = STEP.SELECT_API;
  const { collections, appApiObjectCollection } = useSelectorHelper();
  const { handleCancel } = useFunctionHelper();

  const [isValidForm, setIsValidForm] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    setIsFormSubmitted(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
      history.push(ROUTES.AUTHENTICATION);
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
                {collections?.length > 0 && (
                  <EnhancedTable
                    apiCollection={collections}
                    errorMsg={"Please select at least one API"}
                    isValidForm={isValidForm}
                    isFormSubmitted={isFormSubmitted}
                    appApiObjectCollection={appApiObjectCollection}
                    isEditMode={false}
                  />
                )}
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

export default SelectApi;
