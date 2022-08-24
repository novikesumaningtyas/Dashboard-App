import {
  IApp,
  IAppCollectionList,
  ICollection,
  Method,
} from "./../../components/AppContainer/AppContext";
import {
  cancelAddCreateAppCollections,
  cancelCreateNewAppDetails,
  addCreateAppCollections,
} from "../store/state.action";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import useSelectorHelper from "./selectorHelper";
import { ROUTES } from "../enum";
import { GetBadge, PutBadge, PostBadge, DeleteBadge } from "./../constants";

const useFunctionHelper = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { collections: collectionWithLegal, apps } = useSelectorHelper();

  /**
   * Cancel 'Create New App' process
   * User will redirect to Dashboard page
   */
  const handleCancel = () => {
    dispatch(cancelCreateNewAppDetails());
    history.push(ROUTES.DASHBOARD);
  };

  /**
   * Find Legal from Collection's Name
   * @param collectionName:string - Collection's name
   * @return: string - Collection's legal
   */
  const findLegal = (collectionName: string): string => {
    const api = collectionWithLegal.filter((col) => {
      return col?.title === collectionName;
    });
    return api[0]?.consent?.legals ?? "";
  };

  /**
   * Find Badge based on the method input
   * @param method: Method - Api method
   * @return: Badge
   */
  const findApiMethodBadge = (method: Method) => {
    switch (method) {
      case "get":
        return GetBadge();

      case "put":
        return PutBadge();

      case "post":
        return PostBadge();

      case "delete":
        return DeleteBadge();
    }
  };

  /**
   * Dispatch an action to update the store whenever user interact with Api checkbox
   * @param isChecked: boolean - true if checked, false when unchecked
   * @param collection: ICollection - Api selection
   * @param clientId?: string - App clientId
   */
  const handleActionApiSelect = (
    isChecked: boolean,
    collection: ICollection,
    clientId?: string
  ) => {
    const selectedApiCollection: IAppCollectionList = {
      title: collection?.title ?? "",
      version: collection?.version ?? "",
    };

    const appIndex: number = clientId
      ? findAppIndexFromClientId(clientId)
      : apps.length - 1;

    isChecked
      ? dispatch(
          addCreateAppCollections({
            appIndex,
            collections: selectedApiCollection,
          })
        )
      : dispatch(
          cancelAddCreateAppCollections({
            appIndex,
            collections: selectedApiCollection,
          })
        );
  };

  /**
   * Dispatch an action to update the store whenever user interact with Api Column header checkbox
   * @param clientId?: string - App client id
   * @param isChecked?: boolean - true when checked, false when unchecked
   */
  const handleActionAllApiSelect = (isChecked: boolean, clientId: string) => {
    const selectedApiCollectionArray: IAppCollectionList[] =
      collectionWithLegal.map((collection) => {
        return {
          title: collection.title,
          version: collection.version,
        };
      });

    const appIndex: number = clientId
      ? findAppIndexFromClientId(clientId)
      : apps.length - 1;

    isChecked
      ? dispatch(
          addCreateAppCollections({
            appIndex,
            collections: selectedApiCollectionArray,
          })
        )
      : dispatch(
          cancelAddCreateAppCollections({
            appIndex,
            collections: selectedApiCollectionArray,
          })
        );
  };

  /**
   * Find App Object from app clientId
   * @param clientId: string
   * @return: IApp - app object
   */
  const findAppFromClientId = (clientId: string): IApp => {
    const app = apps.filter((item) => item?.client.clientid === clientId);
    return app[0];
  };

  /**
   * Find App Object from app title
   * @param title: string
   * @return: IApp - app object
   */
  const findAppIndexFromClientId = (clientId: string): number => {
    return apps.findIndex((app) => app.client.clientid === clientId);
  };

  return {
    findLegal,
    findApiMethodBadge,
    findAppFromClientId,
    findAppIndexFromClientId,
    handleCancel,
    handleActionApiSelect,
    handleActionAllApiSelect,
  };
};

export default useFunctionHelper;
