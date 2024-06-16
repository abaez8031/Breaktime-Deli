const jwtFetch = async (url, options = {}) => {
  // if there is no method set it to 'GET'
  options.method ||= "GET";
  // if there are no headers, set it to an empty object
  options.headers ||= {};
  // Set the Authorization header to the value of the jwtToken from localStorage
  const jwtToken = localStorage.getItem("jwtToken")
  if (jwtToken) options.headers['Authorization'] = "Bearer " + jwtToken
  // if the method is anything other than 'GET' set the Content-Type header to be be application/json
  if(options.method !== "GET" ) options.headers["Content-Type"] ||= "application/json"
  // set the csurf token header to the CSRF-Token in the cookie 
  options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
  // call fetch with the url and the updated options object
  const res = await fetch(url, options)
    // If the response status code is 400 or above, then throw an error with the error being the response.
  if (res.status >= 400) throw res;
  return res;
}

function getCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === cookieName) return value;
  }
  return null;
}

export default jwtFetch;