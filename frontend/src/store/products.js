import jwtFetch from "./jwt";

const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS";
const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT";
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
const RECEIVE_PRODUCT_ERRORS = "products/RECEIVE_PRODUCT_ERRORS";
const CLEAR_PRODUCT_ERRORS = "products/CLEAR_PRODUCT_ERRORS";

const receiveProduct = product => ({
  type: RECEIVE_PRODUCT,
  product
})

const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id
})

const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products
})

const receiveProductErrors = errors => ({
  type: RECEIVE_PRODUCT_ERRORS,
  errors
})

const clearProductErrors = errors => ({
  type: CLEAR_PRODUCT_ERRORS,
  errors
})

export const fetchAllProducts = () => async dispatch => {
  try {
    const res = await jwtFetch("/api/products");
    const products = await res.json();
    dispatch(receiveProducts(products));
  } catch(err) {
    const res = await err.json();
    dispatch(receiveProductErrors(res.errors))
  }
}

export const createProduct = (product) => async dispatch => {
  try {
    const res = await jwtFetch("/api/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json"
      }
    })
  const data = await res.json();
  dispatch(receiveProduct(data))
  } catch (err) {
    const res = await err.json();
    dispatch(receiveProductErrors(res.errors))
  }
}

export const deleteProduct = id => async dispatch => {
  try {
    const res = await jwtFetch(`/api/products/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      dispatch(removeProduct(id))
    }
    else {
      const err = await res.json();
      dispatch(receiveProductErrors(err.errors))
    }
  } catch(err) {
    const res = await err.json();
    dispatch(receiveProductErrors(res.errors))
  }
}

export const productErrorsReducer = (initialState = null, action) => {
  switch(action.type) {
    case RECEIVE_PRODUCT_ERRORS:
      return action.errors
    case CLEAR_PRODUCT_ERRORS:
    case RECEIVE_PRODUCT:
      return null
    default:
      return initialState;
  }
}

const productsReducer = (initialState = {}, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      const products = {}
      action.products.forEach(product => {
        products[product._id] = product
      })
      return {...initialState, ...products}
    case RECEIVE_PRODUCT:
      return {...initialState, [action.product._id]: action.product}
    case REMOVE_PRODUCT:
      const newState = {...initialState};
      delete newState[action.id]
      return newState
    default:
      return initialState;
  }
}

export default productsReducer;