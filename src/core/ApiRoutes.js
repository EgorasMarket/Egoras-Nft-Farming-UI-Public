import { API_URL } from "../actions/types";

export const GET_NEW_PRODUCTS_ROUTE = `${API_URL}/product/new/zero-tradable`;
export const POPULATE_ADMIN_PRODUCT_DASHBOARD_ROUTE = `${API_URL}/product/admin/dashboard/product`;
export const GET_ALL_UPLOADED_PRODUCTS_ROUTE = `${API_URL}/product/uploaded`;
export const GET_ALL_APPROVED_PRODUCTS_ROUTE = `${API_URL}/product/approved/tradable-true`;
export const FETCH_PRODUCT_BRANDS = `${API_URL}/product/all-brands`;
export const FETCH_PRODUCT_CATEGORIES = `${API_URL}/product/all-categories`;
export const UPDATE_EXISTING_PRODUCT = `${API_URL}/product/update/new/product`;
export const GET_ALL_UPLOADED_PRODUCTS_FOR_USER_ROUTE = `${API_URL}/product/uploaded`;
export const FETCH_TRADABLE_PRODUCTS_ROUTE = `${API_URL}/product/approved/tradable-true`;
export const ACCEPT_OR_DECLINE_BID = `${API_URL}/product/bid/accept/product/bid`;
export const FETCH_USER_NEW_PRODUCT = `${API_URL}/product/user/new/product`;
