#pragma once

#ifndef _lmic_config_h_
#define _lmic_config_h_

#define LMIC_DEBUG_LEVEL 2
#define LMIC_PRINTF_TO Serial
#define LMIC_FAILURE_TO Serial

#endif

void setupLMIC(void);
void loopLMIC(void);
