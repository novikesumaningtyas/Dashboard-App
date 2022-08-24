import { IMiniAppConfig } from "../../components/AppContainer/AppContext";
import { INITIAL_CREATE_APP_DETAILS_STATE } from "../store/state.reducer";
import { useSelector } from "react-redux";

const useSelectorHelper = () => {
  // Grabbing content from the last App in array
  const {
    title = "",
    description = "",
    authMethod = "",
  } = useSelector((state: IMiniAppConfig) => {
    if (state?.appConfigDetails?.apps?.length > 0) {
      const lastIndex = state?.appConfigDetails?.apps?.length - 1;
      return state?.appConfigDetails?.apps[lastIndex];
    }
    return INITIAL_CREATE_APP_DETAILS_STATE[0];
  });

  const { apps = [], collections = [] } = useSelector(
    (state: IMiniAppConfig) => {
      return state?.appConfigDetails;
    }
  );

  const { collections: appApiObjectCollection = [] } = useSelector(
    (state: IMiniAppConfig) => {
      if (state?.appConfigDetails?.apps?.length > 0) {
        return state?.appConfigDetails?.apps.slice(-1) as any;
      }

      return INITIAL_CREATE_APP_DETAILS_STATE[0];
    }
  );

  return {
    title,
    description,
    collections,
    appApiObjectCollection,
    authMethod,
    apps,
  };
};

export default useSelectorHelper;