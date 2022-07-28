import { Timestamp } from 'rxjs';

export interface acknowledge {
  code: number;
  status: string;
  explanation: string;
}

export interface rxInfo {
  gatewayID: string;
  time: string;
  timeSinceGPSEpoch?: null;
  rssi: number;
  loRaSNR: number;
  channel: number;
  rfChain: number;
  board: number;
  antenna: number;
  location?: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  fineTimestampType: string;
  context: string;
  uplinkID: string;
}

export interface txInfo {
  frequency: bigint;
  modulation: string;
}

export interface device_status {
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  margin: number;
  externalPowerSource: boolean;
  batteryLevelUnavailable: boolean;
  batteryLevel: number;
  tags: { [index: string]: string };
}

export interface device_up {
  // id : number,
  // received_at : string,
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  frequency: bigint;
  dr: number;
  adr: boolean;
  fCnt: bigint;
  fPort: number;
  tags: { [index: string]: string };
  data: string;
  rxInfo: rxInfo;
  txInfo: txInfo;

  objectJSON: JSON;
  // dev_addr : ArrayBuffer,
  // confirmed_uplink : boolean,
  // tx_info : JSON
}

export interface device_join {
  // id : number,
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  devAddr: string;
  rxInfo: rxInfo;
  txInfo: txInfo;
  dr: number;
  tags: { [index: string]: string };
}

export interface device_ack {
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  rxInfo: rxInfo;
  txInfo: txInfo;
  acknowledged: boolean;
  fCnt: bigint;
  tags: { [index: string]: string };
}

export interface device_error {
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  type: string;
  error: string;
  tags: { [index: string]: string };
}

export interface device_location {
  id: number;
  received_at: string;
  dev_eui: ArrayBuffer;
  device_name: string;
  application_id: bigint;
  application_name: string;
  altitude: number;
  latitude: number;
  longitude: number;
  geohash: string;
  tags: string;
  accuracy: number;
}

export interface device_txack {
  devEUI: string;
  deviceName: string;
  applicationID: string;
  applicationName: string;
  gatewayID: string;
  fCnt: bigint;
  tags: { [index: string]: string };
  txInfo: txInfo;
}
