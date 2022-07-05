import {
  LOGIN,
  LOGOUT,
  ONBOARD,
} from "./action.type"

export const login = (data) => {
  return {
    type: LOGIN,
    payload: data
  }
}

export const onBoard = () => {
  return {
    type: ONBOARD,
  }
}

export const barScanned = (data) => {
  return {
    type: BARSCANNED,
    payload: data
  }
}

export const loading = (data) => {
  return {
    type: LOADING,
    payload: data
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const productData = (data) => {
  return {
    type: PRODUCT_DATA,
    payload: data,
  }
}

export const stocks = (data) => {
  return {
    type: STOCKS,
    payload: data
  }
}

export const viewStock = (data) => {
  return {
    type: VIEW_STOCK,
    payload: data,
  }
}

export const dashBoardData = (data) => {
  return {
    type: DASHBOARD_DATA,
    payload: data,
  }
}

export const staff = (data) => {
  return {
    type: STAFF,
    payload: data,
  }
}

export const staffs = (data) => {
  return {
    type: STAFFS,
    payload: data,
  }
}

export const triggerPull = () => {
  return {
    type: TRIGGER_PULL,
  }
}

export const navBarScanner = (data) => {
  return {
    type: NAV_BAR_SCANNER,
    payload: data,
  }
}

export const salsesProduct = (data) => {
  return {
    type: SALES_PRODUCT,
    payload: data,
  }
}

export const salsesProducts = (data) => {
  return {
    type: SALES_PRODUCTS,
    payload: data,
  }
}

export const salesHistory = (data) => {
  return {
    type: SALES_HISTORY,
    payload: data,
  }
}