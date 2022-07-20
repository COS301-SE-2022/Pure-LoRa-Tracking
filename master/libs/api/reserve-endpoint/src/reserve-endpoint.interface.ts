export interface ReserveEndpoint {
  token: string;
  reserveID: string;
}

export interface ReserveEndpointNoToken {
  token: string;
}

export interface ReserveCreateEndpoint {
  token: string;
  NameOfReserve: string;
  email: string;
  location?: {
    features: {
      type: string;
      properties: any;
      geometry: {
        type: string;
        coordinates: [number, number][][];
      };
    }[];
  };
}

export interface ReserveSetEndpoint {
  token: string;
  reserveID: string;
  location: {
    features: {
      type: string;
      properties: any;
      geometry: {
        type: string;
        coordinates: [number, number][][];
      };
    }[];
  };
}

export interface ReserveResponse {
  status: number;
  explanation: string;
  furtherExplain?: string;
  data?: any;
}
