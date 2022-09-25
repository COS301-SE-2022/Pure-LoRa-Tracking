import { string } from "@tensorflow/tfjs-node";
import { ActivationKeys } from "@master/shared-interfaces"

export interface deviceResponse {
  status: number;
  explanation: string;
  furtherExplain?: string;
  data?: any;
}

export interface deviceInfos {
  token: string;
  customerID? : string;
  deviceIDs: string[];
}

export interface deviceAssign {
  token: string;
  customerID : string;
  deviceID: string;
}

export interface deviceAvailable {
  token: string;
}


export interface AddSensorDevice {
  token: string;
  customerID: string;
  hardwareName: string; // EUI
  labelName: string;    // Name
  activationKeys: ActivationKeys;
  deviceProfileId: string;
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
  isGateway: boolean;
  devEUI: string;
}

export interface UnassignDevice {
  token: string;
  deviceID: string;
}

export interface GatewayLocationInfo {
  token: string;
  deviceIDs: string[];
}
export interface GatewayLocationAdd {
  token: string;
  deviceID: string;
  devEUI: string;
  locationParameters: {
    latitude: number;
    longitude: number;
  };
}

export interface GetGatewaysInput {
  token : string;
  customerID: string;
}

export interface GetMoreInfoInput {
  token : string;
  deviceEUI: string;
}

export interface UserSenserDataInput {
  token: string;
  deviceEUI: string;
  timeStart?: number;
  timeStop?: number;
}
