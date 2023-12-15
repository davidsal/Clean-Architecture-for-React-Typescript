#include <Adafruit_BMP085.h>
// Library for interfacing with BMP085 sensor to read atmospheric pressure, temperature, and calculate altitude
#include <WiFi.h>
// Library for connecting ESP32 to a Wi-Fi network as a station (client)
#include <WiFiClient.h>
// Library for creating a Wi-Fi client to handle connections to a specified IP address and port
#include <WebServer.h>
// Library for creating a simple HTTP server on the ESP32, handling incoming HTTP requests
#include <ESPmDNS.h>
// Library for enabling mDNS (Multicast DNS) on the ESP32 for local network device discovery
// Used in Chromecast, SmartTV, etc

// BMP Sensor instance
Adafruit_BMP085 bmp;

// WiFi credentials
const char* ssid = "Melara2";
const char* password = "dsma3010";

// Web server instance
WebServer server(80);

// LED Pin
const int led = LED_BUILTIN;

// Network configuration
IPAddress local_IP(192, 168, 0, 100);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

// Timing variables
unsigned long previousMillis = 0;
const long interval1 = 1600;
const long interval2 = 400;
int ledState = LOW;

/**
 * Function to read temperature, pressure, and altitude from the BMP sensor.
 * @returns {String} JSON string with temperature, pressure, and altitude (in Spanish)
 */
String readSensorData() {
    // Read temperature, pressure, and altitude from the BMP sensor
    double temp = bmp.readTemperature();
    double press = bmp.readPressure();
    double alt = bmp.readAltitude();

    // Create a JSON object with temperature (C), pressure (Pa), and altitude (M)
    // Rounded to 2 decimals using the String(value, decimalPlaces) method
    String sensorData = "{\"temperature\":" + String(temp, 2) +
                         ",\"presion\":" + String(press, 2) +
                         ",\"altitud\":" + String(alt, 2) + "}";

    // Return the JSON object as a string
    return sensorData;
}

/**
 * Handles requests to the root URL ("/") and sends sensor data as a response.
 */
void handleRoot() {
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "text/plain", readSensorData());
}

/**
 * Handles requests to unknown URLs and sends a 404 response.
 */
void handleNotFound() {
    String message = "File Not Found\n\n";
    message += "URI: ";
    message += server.uri();
    message += "\nMethod: ";
    message += (server.method() == HTTP_GET) ? "GET" : "POST";
    message += "\nArguments: ";
    message += server.args();
    message += "\n";
    for (uint8_t i = 0; i < server.args(); i++) {
        message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
    }
    server.send(404, "text/plain", message);
}

/**
 * Arduino setup function.
 */
void setup() {
    // Serial communication initialization
    Serial.begin(9600);

    // Check if BMP sensor is connected
    if (!bmp.begin()) {
        Serial.println("Could not find a valid BMP085 sensor, check wiring!");
        while (1) {}
    }

    // Set LED pin as an output
    pinMode(led, OUTPUT);

    // WiFi configuration
    WiFi.mode(WIFI_STA);

    // Configure static IP address
    if (!WiFi.config(local_IP, gateway, subnet)) {
        Serial.println("STA Failed to configure");
    }

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.println("");

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED) {
        digitalWrite(led, 1);
        delay(250);
        digitalWrite(led, 0);
        delay(250);
        Serial.print(".");
    }

    // Display connection information
    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    // MDNS configuration
    if (MDNS.begin("esp32")) {
        Serial.println("MDNS responder started");
    }

    // Set up HTTP server routes
    server.on("/", handleRoot);
    server.onNotFound(handleNotFound);

    // Start HTTP server
    server.begin();
    Serial.println("HTTP server started");
}

/**
 * Checks WiFi connection status and controls LED blinking.
 */
void checkConnection() {
    if (WiFi.status() != WL_CONNECTED) {
        digitalWrite(led, 0);
    } else {
        unsigned long currentMillis = millis();
        if (currentMillis - previousMillis >= interval1 && ledState == LOW) {
            previousMillis = currentMillis;
            ledState = HIGH;
        } else if (currentMillis - previousMillis >= interval2 && ledState == HIGH) {
            previousMillis = currentMillis;
            ledState = LOW;
        }
        digitalWrite(led, ledState);
    }
}

/**
 * Arduino loop function.
 */
void loop(void) {
    // Handle client requests
    server.handleClient();
    
    // Allow the CPU to switch to other tasks
    delay(2);

    // Check WiFi connection and control LED
    checkConnection();
}