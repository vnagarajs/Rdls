export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}

const result: IntrospectionResultData = {
  __schema: {
    types: [
      {"kind":"UNION","name":"FlightListResponse","possibleTypes":[{"name":"FlightInfo"},{"name":"ApiErrors"}]}
    ]
  }
};

export default result;