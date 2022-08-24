import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { ROUTES, STEP } from "../../../lib/enum";
import {
  updateAppTitle,
  updateAppDescription,
} from "../../../lib/store/state.action";
import useSelectorHelper from "../../../lib/utils/selectorHelper";
import useFunctionHelper from "../../../lib/utils/functionHelper";
import { PaddedNavButton } from "../../common/PaddedNavButton/PaddedNavButton";
import {
  FormAppBody,
  FormAppDescription,
  FormAppTitle,
  PageHeader,
} from "../CommonComponent";

function CreateAppDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { title, description, apps } = useSelectorHelper();
  const { handleCancel } = useFunctionHelper();
  const pageStep = STEP.APP_DETAILS;
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event?.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      history.push(ROUTES.SELECT_APIS);
    }

    setValidated(true);
  };

  return (
    <Container fluid>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <PageHeader step={pageStep} />
        <FormAppBody>
          <FormAppTitle
            inputValue={title}
            onChangeForm={(e: any) =>
              dispatch(
                updateAppTitle({
                  appIndex: apps.length - 1,
                  app: { title: e?.target?.value ?? "" },
                })
              )
            }
          />
          <FormAppDescription
            inputValue={description}
            onChangeForm={(e: any) =>
              dispatch(
                updateAppDescription({
                  appIndex: apps.length - 1,
                  app: { description: e?.target?.value ?? "" },
                })
              )
            }
          />
          <PaddedNavButton
            previousButtonLabel={"Cancel"}
            onPrevious={handleCancel}
          />
        </FormAppBody>
      </Form>
    </Container>
  );
}
export default CreateAppDetails;
