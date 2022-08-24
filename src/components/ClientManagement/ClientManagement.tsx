import React, { useMemo, useState } from "react";
import { ROUTES } from "../../lib/enum";
import { MemoryRouter, Route, Switch } from "react-router";
import { INITIAL_COLLECTION_STATE } from "../../lib/store/state.reducer";
import {
  AuthMethod,
  IDeveloperAppConfig,
  IMiniAppConfig,
} from "./../AppContainer/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAppConfigToStore,
  setMiniAppInitialised,
} from "../../lib/store/shared.action";
import { FlexContainer, Panel } from "./ClientManagement.style";
import { Dashboard } from "./../Dashboard/Dashboard";
import  CreateAppDetails  from "../AppDetails/CreateAppDetails/CreateAppDetails";
import SelectApi  from "./../AppDetails/CreateAppDetails/SelectApi";
import Authentication from "../AppDetails/CreateAppDetails/Authentication";
import TermAndCondition from  "../AppDetails/CreateAppDetails/TermAndCond";
import AppDetails from "../AppDetails/AppDetails";

function ClientManagement() {
  // const {loading, error, data} = useQuery(GET_APPS);
  // const {loading: collectionLoading, error: collectionError, data:collectionData} = useQuery(GET_COLLECTION);

  const miniAppInitialised = useSelector(
    (state: IMiniAppConfig) => state.status.miniAppInitialised
  );
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  // const renderError = useMemo(
  //   function () {
  //     if (error || collectionError) {
  //       return <p>Hai this is Error</p>;
  //     }
  //   },
  //   [collectionError, error]
  // );

  const renderClientManagementMiniApp = useMemo(
    function () {
      const data = {
        apps: [
          {
            title: "Test Mock App",
            description: "This is some description",
            collections: [
              {
                title: "Payments",
                version: "v1.0",
              },
            ],
            client: {
              clientid: "1234-HASH",
              csid: "hash-1234",
              type: "WEB",
              sessionIdleTime: 300,
              tokenExpiryTime: 300,
              scopes: ["something:something"],
            },
            authMethod: "CLIENT_SECRET_POST" as AuthMethod,
            environmentType: "SANDBOX",
            createdAt: "",
            updatedAt: "",
          },
        ],
      };

      const collectionData = {
        collections: INITIAL_COLLECTION_STATE,
      };

      if (data && collectionData) {
        const appWithCollection: Partial<IDeveloperAppConfig> = {
          ...data,
          ...collectionData,
        };

        dispatch(loadAppConfigToStore(appWithCollection));
        dispatch(setMiniAppInitialised(true));
        if (miniAppInitialised) {
          setRender(true);
        }

        return (
          <MemoryRouter>
            <FlexContainer>
              <Panel>
                <Switch>
                  <Route
                    path={ROUTES.DASHBOARD}
                    exact={true}
                    component={Dashboard}
                  />
                  <Route
                    path={ROUTES.CREATE_APP_DETAILS}
                    exact={true}
                    component={CreateAppDetails}
                  />
                  <Route
                    path={ROUTES.SELECT_APIS}
                    exact={true}
                    component={SelectApi}
                  />
                  <Route path={ROUTES.AUTHENTICATION} exact={true} component={Authentication}/>
                  <Route path={ROUTES.T_AND_C} exact={true} component={TermAndCondition}/>
                  <Route path={ROUTES.APP_DETAILS} exact={true} component={AppDetails}/>
             
                </Switch>
              </Panel>
            </FlexContainer>
          </MemoryRouter>
        );
      }
      return null;
    },
    [dispatch, miniAppInitialised]
  );

  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      {/* {(error !! collectionError)&& renderError } */}
      {render && renderClientManagementMiniApp}
    </>
  );
}

export default ClientManagement;
