export interface deviceResponse {
  status : number;
  explanation : string;
  furtherExplain? : string;
  data? : any;
}

export interface deviceInfos {
  token: string;
  deviceIDs: string[];
}

export interface AddSensorDevice {
  token: string;
  customerID: string;
  hardwareName: string;
  labelName: string;
  profileType?: SensorProfile;
  extraParams?: any;
}

export interface SensorProfile {
  profileID: string;
  profileName: string;
}

export interface AddGatewayDevice {
  token: string;
  customerID: string;
  hardwareName: string;
  labelName: string;
  profileType?: SensorProfile;
  extraParams?: any;
}

export interface GatewayProfile {
  profileID: string;
  profileName: string;
}

export interface RemoveDevice {
  token: string;
  deviceID: string;
}
