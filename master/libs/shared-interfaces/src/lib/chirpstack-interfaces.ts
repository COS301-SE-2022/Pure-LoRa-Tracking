export interface ActivationKeys {
    isABP: boolean,
    lora1_1: boolean,

    devAddr ?: string;
    appSKey ?: string;
    nwkSEncKey ?: string; // Network session key

    fNwkSIntKey ?: string;
    sNwkSIntKey ?: string;

    appKey ?: string;
    nwkKey ?: string;
};