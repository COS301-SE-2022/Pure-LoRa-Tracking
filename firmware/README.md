## Install Arduino IDE

Do not use windows store version if possible, it can lead to issues with non-standard libraries.  
Ensure JRE 17 non-headless is installed  

[![Download](https://img.shields.io/badge/-Download%20arduino%20IDE-brightgreen)](https://www.arduino.cc/en/software)

After pluggining in the device, check in arduno under tools -> port to ensure the device connection is recognised.
If the device does not show up, ensure the relevant uart bridge drivers are installed
Using windows with a CP210x bridge as example:
1. download the [drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers) 
2. Uncompress to a convenient location.
3. Navigate to device manager -> unknown devices
4. Select the relevant unrecognised device -> update driver software -> browse my computer
5. Navigate to and select the root of the uncompressed drivers
6. Ensure Include subfolders is enabled, then click next
7. Confirm that windows was able to find the drivers and installed them.  

# For TTGO T-beam devices
## Installing boards for arduino
Within the arduino IDE do the following:
1. Open preferences (File -> Preferences)
2. Locate the `Additional Board Manager URLs` field and add the urls:  
 `https://github.com/stm32duino/BoardManagerFiles/raw/main/package_stmicroelectronics_index.json
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json` 
4. Open the board manager (Tools -> Board: -> Boards Manager)
5. Search for "esp32" and install version **1.0.5**, then close boards manager
6. Under the tools tab set following parameters: 
```
Board: T-Beam 
Core debug level: Debug
Port: <Select the relevant port>
```
If the program sometimes fails to upload or the connection becomes unstable, set the following:
```
Upload speed: 115200 
Flash frequency: 40MHz
```

## Other code parameters
- board is defined as `LILYGO_TBeam_V1_1`
- set DevEUI, AppEUI & AppKey (check if LSB or MSB format is used)
- AXP20X_Class can be switch off and control the power of modules **only modify if you know what you are doing**
- u8g2 is used to control the display  

Example code for TTGO T-Beam boards [here](https://github.com/Xinyuan-LilyGO/LilyGo-LoRa-Series)

### General note:
Never modify parameters you do not understand, changing certain values will cause **permanent** hardware damage. 
