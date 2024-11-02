/*
  Make sure your Firebase project's '.read' and '.write' rules are set to 'true'. 
  Ignoring this will prevent the MCU from communicating with the database. 
  For more details- https://github.com/Rupakpoddar/ESP8266Firebase 
*/

#include <ESP8266Firebase.h>
#include <ESP8266WiFi.h>

#define SOUND_VELOCITY 0.034

#define _SSID "City Internet Saly 2.4G"          // Your WiFi SSID
#define _PASSWORD "saly9393"      // Your WiFi Password
#define REFERENCE_URL "https://wastebin-tracker-default-rtdb.firebaseio.com/"  // Your Firebase project reference url
#define MACHINE "MID001/status"
Firebase firebase(REFERENCE_URL);

const int trigPin = 12;
const int echoPin = 14;

long duration;
float distanceCm;

float distance(){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate the distance
  distanceCm = duration * SOUND_VELOCITY/2;
  return distanceCm;
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");


  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input

//================================================================//
//================================================================//

  firebase.setInt(MACHINE, 0);
}

void loop() {

  float dist = distance();
  if(dist < 10){
    Serial.println("100%");
    firebase.setInt(MACHINE, 100);
  }
  else if(dist>=10 && dist<20){
    Serial.println("75%");
    firebase.setInt(MACHINE, 75);
  }
  else if(dist>=20 && dist<30){
    Serial.println("50%");
    firebase.setInt(MACHINE, 50);
  }
  else if(dist>=30 && dist<35){
    Serial.println("25%");
    firebase.setInt(MACHINE, 25);
  }
  else{
    Serial.println("0%");
    firebase.setInt(MACHINE, 0);
  }

  delay(2000);
}
