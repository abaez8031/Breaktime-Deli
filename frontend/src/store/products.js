// Create Products slice of state, reducers, thunk action creators

// import jwtFetch from "./jwt";

// const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS"; // FETCH ALL PRODUCTS
// const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT"; // CREATE/UPDATE NEW PRODUCT
// const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"; // DELETE PRODUCT

// const receiveProduct = product => ({
//   type: RECEIVE_PRODUCT,
//   product
// })

// const removeProduct = id => ({
//   type: REMOVE_PRODUCT,
//   id
// })

// const receiveProducts = products => ({
//   type: RECEIVE_PRODUCTS,
//   products
// })

// export const fetchAllProducts = () => async dispatch => {
//   const res = await jwtFetch("/api/products");
//   const products = await res.json();
//   dispatch(receiveProducts(products));
// }

// export const createProduct = (product) => async dispatch => {
//   try {
//     const res = await jwtFetch("/api/products", {
//       method: "POST",
//       body: JSON.stringify(product),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//   const data = await res.json();
//   dispatch(receiveProduct(data))
//   } catch (err) {
//     // TODO: handle error
//   }
// }

// export const deleteProduct = id => async dispatch => {
//   try {
//     const res = await jwtFetch(`/api/products/${id}`, {
//       method: "DELETE",
//     })
//     if (res.ok) {
//       dispatch(removeProduct(id))
//     }
//   } catch(err) {

//   }
// }