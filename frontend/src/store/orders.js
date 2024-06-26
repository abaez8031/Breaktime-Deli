import jwtFetch from "./jwt";

// export const createOrder = order => async dispatch => {
//   try {
//     const res = await jwtFetch("/api/orders", {
//       method: "POST",
//       body: JSON.stringify(order),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     const data = await res.json();
//     dispatch()
//   } catch(err) {

//   }
// }