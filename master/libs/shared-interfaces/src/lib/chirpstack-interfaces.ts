export interface ActivationKeys {
    isABP: boolean,
    lora1_1: boolean,

    devAddr ?: string;
    appSKey ?: string;
    nwkSKey ?: string; 
    nwkSEncKey ?: string; // Network session key at backend

    fNwkSIntKey ?: string;
    sNwkSIntKey ?: string;

    appKey ?: string;
    nwkKey ?: string;
};