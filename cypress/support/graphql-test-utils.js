export const GET_AUTOCOMPLETE_OPERATION_NAME = 'GetAddresses';
export const GET_OPERATING_AREA_OPERATION_NAME = 'GetOperatingArea';
export const GET_NEAREST_ADDRESSES_OPERATION_NAME = 'GetNearestAddresses';

// Alias graphql query if operationName and variables matches
export const aliasAutocompleteQuery = (req, operationName, text, id) => {
  if (hasOperationName(req, operationName) && hasTextVariable(req, text)) {
    req.alias = id;
  }
};

export const aliasNearestAddressQuery = (req, operationName, longitude, latitude, id) => {
  if (hasOperationName(req, operationName) && hasCoordinateVariable(req, longitude, latitude)) {
    req.alias = id;
  }
};

export const aliasPolygonQuery = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName;
  }
};

// Utility to match GraphQL mutation based on the operation name
const hasOperationName = (req, operationName) => {
  const { body } = req;
  return body.hasOwnProperty('operationName') && body.operationName === operationName;
};

const hasTextVariable = (req, text) => {
  const { body } = req;
  return body.hasOwnProperty('variables') && body.variables.text === text;
};

const hasCoordinateVariable = (req, longitude, latitude) => {
  const { body } = req;
  console.log(body.variables.longitude, longitude);
  console.log(body.variables.latitude, latitude);
  return body.hasOwnProperty('variables') && body.variables.longitude === longitude && body.variables.latitude === latitude;
};
