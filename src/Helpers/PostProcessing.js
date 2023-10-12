import { postProcessApiCallResponse } from "@api3/commons/src/processing";

export const postProcess = (
  apiCallResponse,
  endpoint,
  apiCallParameters,
  processingOptions
) => {
  return postProcessApiCallResponse(
    apiCallResponse,
    endpoint,
    apiCallParameters,
    processingOptions
  );
};
