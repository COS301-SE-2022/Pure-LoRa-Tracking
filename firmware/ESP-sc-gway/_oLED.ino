// 1-channel LoRa Gateway for ESP8266 and ESP32
// Copyright (c) 2016-2021 Maarten Westenberg version for ESP8266
//
// 	based on work done by Thomas Telkamp for Raspberry PI 1ch gateway
//	and many others.
//
// All rights reserved. This program and the accompanying materials
// are made available under the terms of the MIT License
// which accompanies this distribution, and is available at
// https://opensource.org/licenses/mit-license.php
//
// NO WARRANTY OF ANY KIND IS PROVIDED
//
// Author: Maarten Westenberg (mw12554@hotmail.com)
//
// This file contains the state machine code enabling to receive
// and transmit packages/messages.
// ========================================================================================
//




// --------------------------------------------------------------------	
// Initilize the Oled functions.
// This function will init the Oled screen. Depending on the 
// availability of the reset button it will reset the display first.
// --------------------------------------------------------------------
void init_oLED() 
{
#if _OLED>=1
#if defined OLED_RST
	pinMode(OLED_RST,OUTPUT);
	digitalWrite(OLED_RST, LOW); 	// low to reset Oled
	delay(100); 
	digitalWrite(OLED_RST, HIGH); 	// must be high to turn on Oled
	delay(50);
#else
	//
#endif
#if _OLED==3
  display.begin();
  delay(100);
  display.setCursor(0, 20);
  display.setFontRefHeightExtendedText();
  display.setDrawColor(1);
  display.setFontPosTop();
  display.setFontDirection(0);
// Print a rhino
  display.setFont(u8g2_font_unifont_t_animals);
  display.drawGlyph(90, 35, 0x006f);
  
  display.setFont(u8g2_font_inr53_mf);
  display.drawStr(40, 0, "P");
  display.setFont(u8g2_font_ncenR12_tr);
  display.drawStr(56, 33, "ure");
  display.setFont(u8g2_font_t0_16_tr);
  display.drawUTF8(56, 45, "Lora");

  display.setFontDirection(3);
  display.setFont(u8g2_font_u8glib_4_tf);
  display.drawUTF8(120, 55, version_harbinger);
  display.drawUTF8(0, 55, "== GATEWAY ==");
  display.setFontDirection(0);
  display.sendBuffer();

  
  pinMode(38, INPUT);
  while (digitalRead(38)) {
    delay(100);
  } 
#else
	// Initialising the UI will init the display too.
	display.init();
	delay(100);

	display.flipScreenVertically();
	display.setFont(ArialMT_Plain_24);
	display.setTextAlignment(TEXT_ALIGN_LEFT);
	display.drawString(0, 24, "STARTING");
	display.display();
#endif
#endif
}

// --------------------------------------------------------------------
// Activate the Oled. Always print the same info.
// These are 4 fields:
// SSID, IP, ID, 
//
// --------------------------------------------------------------------
void acti_oLED() 
{
#if _OLED>=1
	// Initialising the UI will init the display too.
	display.clear();

# if _OLED==1
	display.setFont(ArialMT_Plain_16);
	display.drawString(0, 0, "READY,  SSID=");
	display.drawString(0, 16, WiFi.SSID());
	display.drawString(0, 32, "IP=");
	display.drawString(0, 48, WiFi.localIP().toString().c_str() );
  display.display();
# elif _OLED==2
	display.setFont(ArialMT_Plain_16);
	display.drawString(0, 0, "READY,  SSID=");
	display.drawString(0, 16, WiFi.SSID());
	display.drawString(0, 32, "IP=");
	display.drawString(0, 48, WiFi.localIP().toString().c_str() );
  display.display();
# elif _OLED==3

  display.setFont(u8g2_font_t0_22_mf);
  display.drawStr(0, 0, "Gateway: ");
  
  display.setFont(u8g2_font_u8glib_4_tf);
  display.drawStr(0, 20, gw_addr.c_str());
  display.drawUTF8(65, 55, version_harbinger);
  display.setFont(u8g2_font_missingplanet_t_all);
  display.drawStr(0, 28, "SSID=");
  display.drawStr(32, 28, WiFi.SSID().c_str());
  display.drawStr(0, 40, "IP=");
  display.drawStr(32, 40, WiFi.localIP().toString().c_str());

  // Print a rhino
  display.setFont(u8g2_font_unifont_t_animals);
  display.drawGlyph(115, 10, 0x006f);
      
  display.sendBuffer();
# endif //_OLED
	

#endif //_OLED
	delay(4000);
}

// --------------------------------------------------------------------
// Print a message on the Oled.
// Note: The whole message must fit in the buffer
//
// --------------------------------------------------------------------
void msg_oLED(String mesg) 
{
#if _OLED==3
  display.clearBuffer();
  display.setFont(u8g2_font_t0_22_mf);
  display.drawStr(0, 0, "Gateway: ");
  
  display.setFont(u8g2_font_u8glib_4_tf);
  display.drawStr(0, 20, gw_addr.c_str());
  display.drawUTF8(65, 55, version_harbinger);
  
  display.setFont(u8g2_font_7x14_tf);
  display.drawStr(0, 26, String(mesg).c_str());

  // Print a rhino
  display.setFont(u8g2_font_unifont_t_animals);
  display.drawGlyph(115, 10, 0x006f);
  
  display.sendBuffer();
  yield();
#elif _OLED>=1 && 
  display.clear();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_24);
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.drawString(0, 24, String(mesg));

  display.display();
  yield();
#endif //_OLED
}

// Print a larger Oled message consisting of two strings

void msg_lLED(String mesg, String mesg2) 
{
#if _OLED==3
  display.clearBuffer();
  display.setFont(u8g2_font_t0_22_mf);
  display.drawStr(0, 0, "Gateway: ");
  
  display.setFont(u8g2_font_u8glib_4_tf);
  display.drawStr(0, 20, gw_addr.c_str());
  display.drawUTF8(65, 55, version_harbinger);

  display.setFont(u8g2_font_7x14_tf);
  display.drawStr(0, 26, String(mesg).c_str());
  display.drawStr(0, 40, String(mesg2).c_str());

  // Print a rhino
  display.setFont(u8g2_font_unifont_t_animals);
  display.drawGlyph(115, 10, 0x006f);
  
  display.sendBuffer();
  yield();
#elif _OLED>=1
  display.clear();

	display.flipScreenVertically();
	display.setFont(ArialMT_Plain_16);
	display.setTextAlignment(TEXT_ALIGN_LEFT);
	display.drawString(0, 8, String(mesg));
	display.drawString(0, 36, String(mesg2));
	
    display.display();
	yield();
#endif //_OLED
}

// --------------------------------------------------------------------
// Print the Oled address in use
//
// --------------------------------------------------------------------
void addr_oLED() 
{
#if _OLED>=1 && _OLED!=3
	#if _DUSB>=1
		Serial.print(F("OLED_ADDR=0x"));
		Serial.println(OLED_ADDR, HEX);
	#endif //_DUSB
#endif
}
