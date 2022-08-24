import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { FORM_MODE, ROUTES, STEP } from "../../../lib/enum";
import {
  createAppCollectionTermAndCondition,
  updateAppClientDetails,
} from "../../../lib/store/state.action";
import {
  IAppCollectionList,
  IAppCollectionListWithConsent,
} from "./../../AppContainer/AppContext";
import useSelectorHelper from "../../../lib/utils/selectorHelper";
import useFuntionalHelper from "../../../lib/utils/functionHelper";
import { PaddedNavButton } from "../../common/PaddedNavButton/PaddedNavButton";
import { FormAppBody, PageHeader } from "./../CommonComponent";
import FunctionalBox from "../../common/FunctionalBox/FunctionalBox";
import { PaddedDiv } from "../../common/PaddedDiv/PaddedDiv";
import { CheckboxCanvas } from "../../common/FunctionalBox/FunctionalBox.style";

function TermAndCond() {
  const history = useHistory();
  const dispatch = useDispatch();
  const pageStep = STEP.TERM;
  const { handleCancel, findLegal } = useFuntionalHelper();
  const [isError, setIsError] = useState(false);

  const { apps, title } = useSelectorHelper();
  const appIndex = apps?.length - 1;
  const { collections: selectedApiCollection } = apps[appIndex];
//     const selectedApiCollection: IAppCollectionListWithConsent[]= [{
//       title: "Payments",
//       version: "v1.0"
//     },
//   {    title: "Accounts",
//   version: "v1.0"
// }]

  let isCheckedArray = new Array(selectedApiCollection.length).fill(false);
  isCheckedArray = selectedApiCollection.map(
    (api) => api?.acceptTermAndCondition && true
  );
  const [selected, setSelected] = useState(isCheckedArray);

  const handleSelect = (position: number, collection: IAppCollectionList) => {
    const updatedCheckedState = selected.map((item, index) =>
      index === position ? !item : item
    );
    setSelected(updatedCheckedState);
    const acceptingTermAndCondApi: IAppCollectionListWithConsent = {
      title: collection?.title ?? "",
      version: collection?.version ?? "",
      acceptTermAndCondition: updatedCheckedState[position],
    };

    dispatch(
      createAppCollectionTermAndCondition({
        appIndex: appIndex,
        collections: acceptingTermAndCondApi,
      })
    );
  };

  const findValue = (collectionTitle: string): boolean => {
    const valueArray: IAppCollectionListWithConsent[] =
      selectedApiCollection.filter((api) => api?.title === collectionTitle);

    if (valueArray?.length > 0) {
      return valueArray[0]?.acceptTermAndCondition
        ? valueArray[0].acceptTermAndCondition
        : false;
    }

    return false;
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: any) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //send data to backend try catch
      const clientIdMock = `appID-${Math.floor(Math.random() * 100) + 1}`;
      dispatch(updateAppClientDetails({
        appIndex,
        client: {
          clientSecret: `secret${Math.random()}`,
          scopes: ["something:something"],
          csid: `csId${Math.random()}`,
          clientid: clientIdMock,
          tokenExpiryTime: 300,
          sessionIdleTime: 300
        }
      }))
      history.push(`${ROUTES.APP_DETAILS_BASE_PARAM}${title}`, {
        from: `${ROUTES.T_AND_C}`,
        appClientId: clientIdMock,
        mode: FORM_MODE.NEW,
      });
    }

    setValidated(true);
  };

  return (
    <>
      <Container fluid>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <PageHeader step={pageStep} />
          <FormAppBody>
            <PaddedDiv>
              <Row>
                <Col>
                  {selectedApiCollection?.length > 0 &&
                    selectedApiCollection.map((collection, index) => (
                      <FunctionalBox title={collection?.title}>
                        {findLegal(collection?.title)}
                        <CheckboxCanvas>
                          <InputGroup className="mb-3">
                            <InputGroup.Checkbox
                              value={collection.title}
                              name="TermCond"
                              id={collection?.title}
                              checked={selected[index]}
                              onChange={() => {
                                handleSelect(index, collection);
                              }}
                              key={collection.title}
                              aria-label={`Accept ${collection?.title} Term And Condition `}
                            />
                            <InputGroup.Text style={{ width: "95%" }}>
                              I accept the term and conditions
                            </InputGroup.Text>
                          </InputGroup>
                        </CheckboxCanvas>
                      </FunctionalBox>
                    ))}
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
    </>
  );
}

export default TermAndCond;
