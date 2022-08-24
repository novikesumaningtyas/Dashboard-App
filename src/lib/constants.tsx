import React from "react";
import { Badge, Row, Col } from "react-bootstrap";
import { AuthMethod, IHistoryState } from "../components/AppContainer/AppContext";
import { COLOR } from "./color";

export interface IAuthTypeDetails {
  label: string;
  value: AuthMethod;
}

export const AUTHENTICATION: IAuthTypeDetails[] = [
  {
    label: 'Client Secret Post',
    value: 'CLIENT_SECRET_POST'
  },
  {
    label: 'Client basic',
    value: 'CLIENT_BASIC'
  },
  {
    label: 'Private Key JWT',
    value: 'PRIVATE_KEY_JWT'
  }
]


export const GetBadge = () => (
  <Badge pill variant="success" style={{ backgroundColor: COLOR.EMERALD }}>
    GET
  </Badge>
);
export const PutBadge = () => (
  <Badge pill variant="warning" style={{ backgroundColor: COLOR.AMBER }}>
    PUT
  </Badge>
);
export const PostBadge = () => (
  <Badge pill variant="primary" style={{ backgroundColor: COLOR.SAPPHIRE }}>
    {" "}
    POST
  </Badge>
);
export const DeleteBadge = () => (
  <Badge pill variant="danger" style={{ backgroundColor: COLOR.PRIMARY }}>
    {" "}
    DELETE
  </Badge>
);

export const dummyCallback = () => undefined;

export const EmptyRow: React.FC<any> = () => {
  return (
    <Row>
      <Col>
      {''}
      </Col>
    </Row>
  )
}


export const InitialHistoryState: IHistoryState = {
  from: '',
  appClientId: '',
  mode:''
}