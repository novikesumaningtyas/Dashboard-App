import React, { useEffect, useRef, useState } from "react";
import { Table, Form } from "react-bootstrap";
import {
  FcCollapse as ChevronUpIcon,
  FcExpand as ChevronDownIcon,
  FcHighPriority as ErrorIcon,
  FcPrevious,
} from "react-icons/fc";
import { PaddedDiv } from "../PaddedDiv/PaddedDiv";
import useFunctionHelper from "../../../lib/utils/functionHelper";
import {
  IApp,
  IAppCollectionListWithConsent,
  ICollection,
} from "./../../AppContainer/AppContext";
import { dummyCallback } from "../../../lib/constants";
import {
  ErrorDiv,
  ErrorParagraph,
  SideApiCheckbox,
  SideHeaderCheckbox,
  StyledApiDiv,
  StyledTable,
  StyledTd,
  StyledTdDescription,
  StyledTheadRow,
  StyledTh,
  StyledTRow,
} from "./EhancedTable.style";

export interface IEnhancedTable {
  id?: string;
  children?: React.ReactNode;
  apiCollection: ICollection[];
  errorMsg?: string;
  dispatchActionHeader?: () => void;
  dispatchActionApiSelect?: () => void;
  isValidForm: boolean;
  isFormSubmitted: boolean;
  appApiObjectCollection: IAppCollectionListWithConsent[];
  isEditMode: boolean;
  currentApp?: IApp | undefined;
}

export function EnhancedTable({
  id = "EnhancedTable",
  children,
  apiCollection = [],
  errorMsg,
  dispatchActionApiSelect = dummyCallback,
  dispatchActionHeader = dummyCallback,
  isValidForm,
  isFormSubmitted,
  appApiObjectCollection,
  isEditMode,
  currentApp,
}: IEnhancedTable) {
  const [isOpened, setIsOpened] = useState(
    new Array(apiCollection?.length).fill(false)
  );
  const [isError, setIsError] = useState(false);
  const [liveError, setLiveError] = useState(false);
  const {
    findApiMethodBadge,
    handleActionApiSelect,
    handleActionAllApiSelect,
  } = useFunctionHelper();

  const appApiNameCollection = appApiObjectCollection?.map((api) => api?.title);
  const numberOfCollections = apiCollection?.length;
  let isCheckedArray = new Array(numberOfCollections).fill(false);
  isCheckedArray = apiCollection.map((collection) =>
    appApiNameCollection.includes(collection?.title)
  );
  const [selected, setSelected] = useState(isCheckedArray);

  const [isAllApiChecked, setIsAllApiChecked] = useState(selected.every(Boolean));
  // ref to mimic isAllApiChecked value
  const isAllApiCheckedRef = useRef(false);
  // ref to monitor all api checked header request
  const selectAllApiRef = useRef(false);

  const handleApiDescription = (position: number) => {
    const updatedCheckedState = isOpened.map((item, index) =>
      index === position ? !item : item
    );
    setIsOpened(updatedCheckedState);
  };

  const handleSelect = (position: number, collection:ICollection) => {
    selectAllApiRef.current = false;

    const updatedCheckedState = selected.map((item, index) => (index === position ? !item: item));
    setSelected(updatedCheckedState);

    // User checked all API --> Header API checkbox cheked
    // User unchecked API --> Header API checkbox unchecked
    setIsAllApiChecked(updatedCheckedState.every(Boolean));
    isAllApiCheckedRef.current = updatedCheckedState.every(Boolean);

    handleActionApiSelect(updatedCheckedState[position], collection, currentApp?.client?.clientid);
  }

  const handleSelectAllApi = (isChecked: boolean) => {
    handleActionAllApiSelect(isChecked, currentApp?.client?.clientid ?? '');
  };

  useEffect(()=> {
    if(isAllApiChecked){
      const allApiCheckedUpdate = new Array(numberOfCollections).fill(isAllApiChecked);
      setSelected(allApiCheckedUpdate);
    } else if (!isAllApiChecked && selectAllApiRef.current) {
      const allApiCheckedUpdate = new Array(numberOfCollections).fill(false);
      setSelected(allApiCheckedUpdate)
    }
  }, [isAllApiChecked, numberOfCollections])

  useEffect(() => {
    if(selected.includes(true)){
      setIsError(false);
      setLiveError(true);
    }
  }, [selected]);

  useEffect(()=> {
    if(liveError && !selected.includes(true)) {
      setIsError(true);
    }
  },[liveError, selected]);

  useEffect(()=> {
    if(isFormSubmitted) {
      isValidForm ? setIsError(false) : setIsError(true);
    }
  }, [isFormSubmitted, isValidForm])



  return (
    <>
      <StyledTable>
        <thead>
          <StyledTheadRow>
            <StyledTh id="29">
              <PaddedDiv display={"flex"} paddingBottom={"0"}>
                <SideHeaderCheckbox>
                  <Form.Group className="mb-3">
                    <Form.Check label="API" onChange={() => 
                    {setIsAllApiChecked(!isAllApiChecked);
                      selectAllApiRef.current = true;
                      isAllApiCheckedRef.current = !isAllApiCheckedRef.current;
                      handleSelectAllApi(isAllApiCheckedRef.current)
                    }} />
                  </Form.Group>
                </SideHeaderCheckbox>
              </PaddedDiv>
            </StyledTh>
            <StyledTh id="32">{""}</StyledTh>
            <StyledTh id="35">{""}</StyledTh>
          </StyledTheadRow>
        </thead>
        <tbody>
          {/** API Rows */}
          {apiCollection &&
            apiCollection?.map((collection, index) => {
              return (
                <StyledTRow
                  key={`${collection?.title}ApiRow`}
                  isRowOpen={isOpened[index]}
                >
                  <StyledTd
                    headers="29"
                    key={`${collection?.title}FirstColumn`}
                  >
                    <StyledApiDiv>
                      <SideApiCheckbox isRowOpen={isOpened[index]}>
                        <Form.Group className="mb-3">
                          <Form.Check
                            label={collection?.title}
                            key={collection?.title}
                            onChange={()=> {
                              handleSelect(index, collection)
                            }}
                          />
                        </Form.Group>
                      </SideApiCheckbox>
                    </StyledApiDiv>
                  </StyledTd>
                  <StyledTd
                    headers="32"
                    key={`${collection?.title}SecondColumn`}
                    style={{ textAlign: "right", paddingRight: "24px" }}
                  >
                    {isOpened[index] ? (
                      <ChevronUpIcon
                        aria-expanded={isOpened[index]}
                        aria-controls="r1d5"
                        onClick={() => {
                          handleApiDescription(index);
                        }}
                      />
                    ) : (
                      <ChevronDownIcon
                        aria-expanded={isOpened[index]}
                        aria-controls="r1d5"
                        onClick={() => {
                          handleApiDescription(index);
                        }}
                      />
                    )}
                  </StyledTd>
                  <StyledTdDescription
                    headers="35"
                    id="r1d5"
                    hidden={!isOpened[index]}
                    key={`${collection?.title}ThirdHiddenColumn`}
                  >
                    <PaddedDiv
                      paddingLeft={"8px"}
                      paddingRight={"8px"}
                      paddingBottom={"0"}
                    >
                      <PaddedDiv textAlign={"left"}>
                        <p>{collection?.description}</p>
                      </PaddedDiv>

                      {collection?.apis.map((api, index) => {
                        return (
                          <div key={api?.title}>
                            <PaddedDiv paddingBottom={"8px"} textAlign={"left"}>
                              <h4>{api?.title}</h4>
                            </PaddedDiv>
                            {api.paths.map((pathApi, index) => {
                              return (
                                <div key={pathApi?.path}>
                                  <PaddedDiv
                                    key={pathApi?.path}
                                    paddingBottom={"0"}
                                    textAlign={"left"}
                                  >
                                    <p>
                                      <b>{pathApi?.path}</b>
                                    </p>
                                  </PaddedDiv>
                                  {pathApi?.methods.map((method, index) => {
                                    return (
                                      <PaddedDiv
                                        display={"flex"}
                                        paddingBottom={"8px"}
                                        key={method}
                                      >
                                        {findApiMethodBadge(method)}
                                      </PaddedDiv>
                                    );
                                  })}
                                  <PaddedDiv
                                    paddingBottom={"8px"}
                                    textAlign={"left"}
                                  >
                                    <p>{pathApi?.description}</p>
                                  </PaddedDiv>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </PaddedDiv>
                  </StyledTdDescription>
                </StyledTRow>
              );
            })}
        </tbody>
      </StyledTable>
      {/* {
        isError && (
          <ErrorDiv>
            <ErrorIcon/>
            <ErrorParagraph>{errorMsg ?? 'Please select at least one API'}</ErrorParagraph>
          </ErrorDiv>
        )
      } */}
    </>
  );
}
