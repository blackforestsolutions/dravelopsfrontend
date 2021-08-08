export const GET_AUTOCOMPLETE_OPERATION_NAME = 'GetAddresses';
export const GET_OPERATING_AREA_OPERATION_NAME = 'GetOperatingArea';
export const GET_NEAREST_ADDRESSES_OPERATION_NAME = 'GetNearestAddresses';

// Alias graphql query if operationName and variables matches
export const aliasAutocompleteQuery = (req, operationName: string, text: string, id: string): void => {
  if (hasOperationName(req, operationName) && hasTextVariable(req, text)) {
    req.alias = id;
  }
};

export const aliasNearestAddressQuery = (req, operationName: string, longitude: number, latitude: number, id: string): void => {
  if (hasOperationName(req, operationName) && hasCoordinateVariable(req, longitude, latitude)) {
    req.alias = id;
  }
};

export const aliasPolygonQuery = (req, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = operationName;
  }
};

// Utility to match GraphQL mutation based on the operation name
const hasOperationName = (req, operationName: string): boolean => {
  const { body } = req;
  // eslint-disable-next-line no-prototype-builtins
  return body.hasOwnProperty('operationName') && body.operationName === operationName;
};

const hasTextVariable = (req, text: string): boolean => {
  const { body } = req;
  // eslint-disable-next-line no-prototype-builtins
  return body.hasOwnProperty('variables') && body.variables.text == text;
};

const hasCoordinateVariable = (req, longitude: number, latitude: number): boolean => {
  const { body } = req;
  // eslint-disable-next-line no-prototype-builtins
  return body.hasOwnProperty('variables') && body.variables.longitude === longitude && body.variables.latitude == latitude;
};
