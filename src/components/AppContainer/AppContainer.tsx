import React from 'react';
import { StyleSheetManager } from 'styled-components';
import MiniAppContext, {IMiniAppContext} from './AppContext';
import { render } from '@testing-library/react';


export interface IMiniAppContainerProps extends IMiniAppContext {
  children: React.ReactNode;
}



/**
 * A MiniAppContainer is used to wrap the mini app component.
 * It provides a context to get the parent element (renderRoot),
 * which can be used to query element inside the shadow DOM tree.
 * It also adds any object passed in as props to context
 * This container also sets style sheets to be rendered inside the renderRoot element.
 * The target props used to provide the DOM node where the styles will be injected 
 * 
 * @example
 * <MiniAppContainer renderRoot={this.renderRoot} appConfig={this.appConfig} auth={this.auth}>
 *  <App />
 * </MiniAppContainer>
 *
 * @noInheritDoc
 */
const MiniAppContainer: React.FC<IMiniAppContainerProps> = function({renderRoot, children, ...others}) {
  return (
    <MiniAppContext.Provider value={{renderRoot, ...others}}>
      <StyleSheetManager target={renderRoot}>{children}</StyleSheetManager>
    </MiniAppContext.Provider>
  )
}

export default MiniAppContainer;