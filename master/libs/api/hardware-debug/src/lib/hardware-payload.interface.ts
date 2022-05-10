export interface acknowledge {
    code : number,
    status : string,
    explanation : string
}

export interface device_status {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    margin : number,
    external_power_source : boolean,
    battery_level_unavailable : boolean,
    battery_level : number,
    tags? : string
}

export interface device_up {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    frequency : bigint,
    dr : number,
    adr : boolean,
    f_cnt : bigint,
    f_port : number,
    tags : string,
    data : ArrayBuffer,
    rx_info : JSON,
    object : JSON,
    dev_addr : ArrayBuffer,
    confirmed_uplink : boolean,
    tx_info : JSON
}

export interface device_join {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    dev_addr : ArrayBuffer,
    tags : string,
}

export interface device_ack {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    acknowledged : boolean,
    f_cnt : bigint,
    tags : string,
}

export interface device_error {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    type : string,
    error : string,
    f_cnt : bigint,
    tags : string,
}

export interface device_location {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    altitude : number,
    latitude : number,
    longitude : number,
    geohash : string,
    tags : string,
    accuracy : number,
}

export interface device_txack {
    id : number,
    received_at : string,
    dev_eui : ArrayBuffer,
    device_name : string,
    application_id : bigint,
    application_name : string,
    gateway_id : ArrayBuffer,
    f_cnt : bigint,
    tags : string,
    tx_info : JSON,
}

