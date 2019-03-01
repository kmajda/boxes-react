import { Provider } from "react-redux"
import React from 'react'
import { createStore } from "redux"
import rootReducer from "../../src/reducers"

export function wrappComponent(component){
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      {component}
    </Provider>
  )
}