//
#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include <Wire.h>
#include <U8g2lib.h>
#include <axp20x.h>
#include <TinyGPS++.h>
#include <TimeLib.h>  

AXP20X_Class axp;
TinyGPSPlus gps;
HardwareSerial sGps(1);
U8G2_SSD1306_128X64_NONAME_1_HW_I2C u8g2(U8G2_R0, /* reset=*/ U8X8_PIN_NONE);

char* version = "ttn-abp v1.0.40";

//
// LoRaWAN NwkSKey, network session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const PROGMEM u1_t NWKSKEY[16] = { 0xDF, 0xD7, 0x61, 0xF3, 0x36, 0x7B, 0x36, 0xF8, 0x57, 0x62, 0xB9, 0xAE, 0xFD, 0x17, 0xDC, 0x70 };

// LoRaWAN AppSKey, application session key
// This is the default Semtech key, which is used by the early prototype TTN
// network.
static const u1_t PROGMEM APPSKEY[16] = { 0x4A, 0x98, 0x51, 0xA0, 0x71, 0x9D, 0x17, 0x8F, 0x96, 0x55, 0x34, 0x32, 0x06, 0x62, 0x07, 0x13 };

// LoRaWAN end-device address (DevAddr)
static const u4_t DEVADDR = 0x01C93655 ; // <-- Change this address for every node!

char* dev_addr = "70b3d50000000000";
//itoa(DEVADDR, dev_addr, 10);

// These callbacks are only used in over-the-air activation, so they are
// left empty here (we cannot leave them out completely unless
// DISABLE_JOIN is set in config.h, otherwise the linker will complain).
void os_getArtEui (u1_t* buf) { }
void os_getDevEui (u1_t* buf) { }
void os_getDevKey (u1_t* buf) { }

//static uint8_t mydata[] = "Hello";
uint8_t mydata[128];
static osjob_t sendjob;

// Schedule TX every this many seconds (might become longer due to duty
// cycle limitations).
const unsigned TX_INTERVAL = 10;

const lmic_pinmap lmic_pins = {
  .nss =  18,
  .rxtx = LMIC_UNUSED_PIN,
  .rst =  23,
  .dio = {26, 33, 32},
};

void onEvent (ev_t ev) {
  Serial.print(os_getTime());
  Serial.print(": ");
  switch (ev) {
    case EV_SCAN_TIMEOUT:
      Serial.println(F("EV_SCAN_TIMEOUT"));
      break;
    case EV_BEACON_FOUND:
      Serial.println(F("EV_BEACON_FOUND"));
      break;
    case EV_BEACON_MISSED:
      Serial.println(F("EV_BEACON_MISSED"));
      break;
    case EV_BEACON_TRACKED:
      Serial.println(F("EV_BEACON_TRACKED"));
      break;
    case EV_JOINING:
      Serial.println(F("EV_JOINING"));
      break;
    case EV_JOINED:
      Serial.println(F("EV_JOINED"));
      break;
    case EV_RFU1:
      Serial.println(F("EV_RFU1"));
      break;
    case EV_JOIN_FAILED:
      Serial.println(F("EV_JOIN_FAILED"));
      break;
    case EV_REJOIN_FAILED:
      Serial.println(F("EV_REJOIN_FAILED"));
      break;
    case EV_TXCOMPLETE:
      Serial.println(F("EV_TXCOMPLETE (includes waiting for RX windows)"));
      if (LMIC.txrxFlags & TXRX_ACK)
        Serial.println(F("Received ack"));
      if (LMIC.dataLen) {
        Serial.println(F("Received "));
        Serial.println(LMIC.dataLen);
        Serial.println(F(" bytes of payload"));
      }
      // Schedule next transmission
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
      break;
    case EV_LOST_TSYNC:
      Serial.println(F("EV_LOST_TSYNC"));
      break;
    case EV_RESET:
      Serial.println(F("EV_RESET"));
      break;
    case EV_RXCOMPLETE:
      // data received in ping slot
      Serial.println(F("EV_RXCOMPLETE"));
      break;
    case EV_LINK_DEAD:
      Serial.println(F("EV_LINK_DEAD"));
      break;
    case EV_LINK_ALIVE:
      Serial.println(F("EV_LINK_ALIVE"));
      break;
    default:
      Serial.println(F("Unknown event"));
      break;
  }
}

void do_send(osjob_t* j) {
  // Check if there is not a current TX/RX job running
  if (LMIC.opmode & OP_TXRXPEND) {
    Serial.println(F("OP_TXRXPEND, not sending"));
  } else {
    // Prepare upstream data transmission at the next possible time.
    LMIC_setTxData2(1, mydata, sizeof(double)*2, 0);
    Serial.println(F("Packet queued"));
  }
  // Next TX is scheduled after TX_COMPLETE event.
}



void setup() {
  Wire.begin(21, 22); //I2C_SDA, I2C_SCL
  if(axp.begin(Wire, AXP192_SLAVE_ADDRESS) == AXP_FAIL) {
    Serial.println(F("error communicating with AXP192 power chip"));
  }

  
  axp.adc1Enable(AXP202_VBUS_VOL_ADC1 |
                   AXP202_VBUS_CUR_ADC1 |
                   AXP202_BATT_CUR_ADC1 |
                   AXP202_BATT_VOL_ADC1,
                   true);
                   
  sGps.begin(9600, SERIAL_8N1, 34, 12);    // PIN 12-TX 34-RX
  
  Serial.begin(115200);
  Serial.print("double size: ");
  Serial.println(sizeof(double));
  Serial.println(F("Starting"));
    
  Serial.println(F(version));
  Serial.println(F("Device addr: "));
  Serial.print(dev_addr);
  u8g2.begin();

  u8g2.firstPage();
  do {
    u8g2.setCursor(0, 20);
    u8g2.setFontRefHeightExtendedText();
    u8g2.setDrawColor(1);
    u8g2.setFontPosTop();
    u8g2.setFontDirection(0);

    // Print a rhino
    u8g2.setFont(u8g2_font_unifont_t_animals);
    u8g2.drawGlyph(90, 35, 0x006f);
    
    u8g2.setFont(u8g2_font_inr53_mf);
    u8g2.drawStr(40, 0, "P");
    u8g2.setFont(u8g2_font_ncenR12_tr);
    u8g2.drawStr(56, 33, "ure");
    u8g2.setFont(u8g2_font_t0_16_tr);
    u8g2.drawUTF8(56, 45, "Lora");

    u8g2.setFontDirection(3);
    u8g2.setFont(u8g2_font_u8glib_4_tf);
    u8g2.drawUTF8(120, 55, version);
    u8g2.drawUTF8(0, 55, "== SENSOR ==");
  } while ( u8g2.nextPage() );


  pinMode(38, INPUT);
  while (digitalRead(38)) {
    delay(100);
  } 
  delay(500);
  
  // LMIC init
  os_init();
  // Reset the MAC state. Session and pending data transfers will be discarded.
  LMIC_reset();

  // Set static session parameters. Instead of dynamically establishing a session
  // by joining the network, precomputed session parameters are be provided.
#ifdef PROGMEM
  // On AVR, these values are stored in flash and only copied to RAM
  // once. Copy them to a temporary buffer here, LMIC_setSession will
  // copy them into a buffer of its own again.
  uint8_t appskey[sizeof(APPSKEY)];
  uint8_t nwkskey[sizeof(NWKSKEY)];
  memcpy_P(appskey, APPSKEY, sizeof(APPSKEY));
  memcpy_P(nwkskey, NWKSKEY, sizeof(NWKSKEY));
  LMIC_setSession (0x1, DEVADDR, nwkskey, appskey);
#else
  // If not running an AVR with PROGMEM, just use the arrays directly
  LMIC_setSession (0x1, DEVADDR, NWKSKEY, APPSKEY);
#endif


  // Set up the channels used by the Things Network, which corresponds
  // to the defaults of most gateways. Without this, only three base
  // channels from the LoRaWAN specification are used, which certainly
  // works, so it is good for debugging, but can overload those
  // frequencies, so be sure to configure the full frequency range of
  // your network here (unless your network autoconfigures them).
  // Setting up channels should happen after LMIC_setSession, as that
  // configures the minimal channel set.
  // NA-US channels 0-71 are configured automatically
  LMIC_setupChannel(0, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(1, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7), BAND_CENTI);      // g-band
  LMIC_setupChannel(2, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  //    LMIC_setupChannel(1, 868300000, DR_RANGE_MAP(DR_SF12, DR_SF7B), BAND_CENTI);      // g-band
  //    LMIC_setupChannel(2, 868500000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(3, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(4, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(5, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(6, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(7, 868100000, DR_RANGE_MAP(DR_SF12, DR_SF7),  BAND_CENTI);      // g-band
  LMIC_setupChannel(8, 868100000, DR_RANGE_MAP(DR_SF12,  DR_SF7),  BAND_MILLI);      // g2-band
  // TTN defines an additional channel at 869.525Mhz using SF9 for class B
  // devices' ping slots. LMIC does not have an easy way to define set this
  // frequency and support for class B is spotty and untested, so this
  // frequency is not configured here.

  // Disable link check validation
  LMIC_setLinkCheckMode(0);

  // TTN uses SF9 for its RX2 window.
  LMIC.dn2Dr = DR_SF9;

  // Set data rate and transmit power for uplink (note: txpow seems to be ignored by the library)
  LMIC_setDrTxpow(DR_SF7, 14);

  // Start job
  do_send(&sendjob);
}

void loop() {
  static int state = 0;
  static char batt_v[50];
  static long i = 0;
  i++;

  if (i % 1000000 == 1) {
    if (!digitalRead(38)) {
      state = (state < 3? state+1:0);
    }

    while (sGps.available()) {
      gps.encode(sGps.read());
      yield();
    }
 
    if (gps.location.isValid()) {
        double lat = gps.location.lat();
        double lng = gps.location.lng();
        Serial.println("location available");
        int64_t lat_val = lat * 10000000;
        int64_t lng_val = lng * 10000000;
      
        mydata[0] = lat_val >> 24;
        mydata[1] = lat_val >> 16;
        mydata[2] = lat_val >> 8;
        mydata[3] = lat_val;

        mydata[4] = lng_val >> 24;
        mydata[5] = lng_val >> 16;
        mydata[6] = lng_val >> 8;
        mydata[7] = lng_val;
      } 
      if (gps.date.isValid()) {
        setTime(gps.time.hour(), gps.time.minute(), gps.time.second(), gps.date.day(), gps.date.month(), gps.date.year()); //int hr,int min,int sec,int day, int month, int yr
      }
    
//    Serial.print("battery: ");
//    Serial.print(axp.getBattVoltage()/1000);
//    Serial.print(" V, ");
//    Serial.print(axp.getBattPercentage());
//    Serial.println(" %");
    u8g2.firstPage();
    do {
      
      u8g2.setFont(u8g2_font_t0_22_mf);
      u8g2.drawStr(0, 0, "Sensor: ");
      u8g2.setFont(u8g2_font_u8glib_4_tf);
      u8g2.drawStr(0, 20, dev_addr);

      // Print a rhino
      u8g2.setFont(u8g2_font_unifont_t_animals);
      u8g2.drawGlyph(115, 10, 0x006f);

      
      double batt = axp.getBattVoltage()/1000;
      int voltage = axp.getBattVoltage();
      mydata[8] = (voltage & 0xFF);
      mydata[9] = (voltage>>8);
//      mydata[1] = ((batt-mydata[0]) * 100);
//      mydata[2] = ((batt-mydata[0]) * 100);
//      Serial.println(test);
//      Serial.print("Battery: ");
//      Serial.println(mydata[0]);
//      Serial.print("Battery[1]: ");
//      Serial.println(mydata[1]);
      u8g2.setFontDirection(1);
      if (axp.isChargeing()) {
        u8g2.setFont(u8g2_font_siji_t_6x10);
        u8g2.drawGlyph(30, 55, 0xe215);
//        Serial.println("Charging");
      } 

      u8g2.setFont(u8g2_font_battery19_tn);
      
      if (batt < 3.5) {
        u8g2.drawGlyph(20, 55, 0x0030);
      } else if (batt < 3.7) {
        u8g2.drawGlyph(20, 55, 0x0031);
      } else if (batt < 3.9) {
        u8g2.drawGlyph(20, 55, 0x0032);
      } else if (batt < 4.1) {
        u8g2.drawGlyph(20, 55, 0x0033);
      } else if (batt < 4.3) {
        u8g2.drawGlyph(20, 55, 0x0034);
      } else {
        u8g2.drawGlyph(20, 55, 0x0035);
      }

      u8g2.setFontDirection(0);  

      u8g2.setFont(u8g2_font_ncenR12_tr);
//      Serial.print("Charging: ");
//      Serial.println(axp.getBattChargeCurrent());
//      Serial.print("Usage: ");
//      Serial.println(axp.getBattDischargeCurrent());
      switch (state) {
        case 0:    
          sprintf(batt_v, "Battery %g V", axp.getBattVoltage()/1000); //,%d %% axp.getBattPercentage()
          break;
        case 1:
          sprintf(batt_v, "Charge %g mA", axp.getBattChargeCurrent()); //,%d %% axp.getBattPercentage()
          break;
        case 2:
          sprintf(batt_v, "Usage %g mA", axp.getBattDischargeCurrent()); //,%d %% axp.getBattPercentage()
          break;
        case 3:
          sprintf(batt_v, "USB %g mA", axp.getVbusCurrent()); //,%d %% axp.getBattPercentage()
          break;
      }
      
      u8g2.drawStr(0, 40, batt_v);
      u8g2.setFont(u8g2_font_u8glib_4_tf);
      u8g2.drawUTF8(65, 55, version);
    } while ( u8g2.nextPage() );
  }
  
  os_runloop_once();
}
