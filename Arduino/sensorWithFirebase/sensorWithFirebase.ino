#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define firebaseURL "parqueameapp-6bdc3.firebaseio.com"
#define authCode "dVB45j8eX6jJyqvOjvi2eYBEby8x3e0qo1HfIhD0"

//Defines pins numbers
const int trigPin = D5; //Prototipo
const int echoPin = D6;
const int led = D8;
/*const int trigPin = D6; //Componente soldado
const int echoPin = D5;
const int led = D4;*/

//Defines path to firebase
const String fbPath = "sensors/0/parkingLot/0/status";

//Defines network
/*char ssid[] = "FABIO GATTI";
char password[] = "autentico";*/

const char ssid[] = "AndroidAP";
const char password[] = "mfoq0723";

/*char ssid[] = "Apto501";
char password[] = "rNbT9kRbgeSsQ";*/

//Defines variables 
int parkStatus = 2;
int tempStatus;

//Sensor variables
long duration;
int distance;

int lectureDistance = 15;


void connectWifiNoPass(){
  while ((!(WiFi.status() == WL_CONNECTED))){
    WiFi.disconnect(true);
    int n = WiFi.scanNetworks();
    if (n == 0) {
      Serial.println("No networks found");
    } 
    else {
      Serial.print(n);
      Serial.println(" Networks found");
      for (int i = 0; i < n; ++i) {
        // Print SSID and RSSI for each network found
        Serial.print(i + 1);
        Serial.print(": ");
        Serial.print(WiFi.SSID(i));
        Serial.print(" (");
        Serial.print(WiFi.RSSI(i));
        Serial.print(")");
        Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*");
        if(WiFi.encryptionType(i) == ENC_TYPE_NONE){
          Serial.println("Connecting to ");
          Serial.print(WiFi.SSID(i));
          char charBuff[50];
          WiFi.SSID(i).toCharArray(charBuff,50);
          WiFi.begin(charBuff);
          delay(10000);
          if(WiFi.status() == WL_CONNECTED){
            return;
          }
          Serial.println("Connection failed, resuming search... ");
        }
        delay(10);
      }
    }
    Serial.println("Couldn't find any networks, waiting 10 secs before re-scanning");
    delay(10000);
  }
}

//Function to connect to wifi
void connectWifiLoop(){
  WiFi.disconnect(true);
  WiFi.begin(ssid,password);
  while ((!(WiFi.status() == WL_CONNECTED))){
    WiFi.begin(ssid,password);
    delay(10000);
    Serial.print("..");
  }
}


void connectWifiANDFirebase(){
  Serial.println("CONNECTING");
  
  connectWifiLoop();
  //connectWifiNoPass();

  Serial.println("CONNECTED TO NETWORK");
  
  Firebase.begin(firebaseURL, authCode);

  Serial.println("CONNECTED TO FIREBASE");
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  delay(3000);

  connectWifiANDFirebase();

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(led, OUTPUT);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  if(WiFi.status() == WL_CONNECTED){ //Check for internet
    
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    // Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    // Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);
    // Calculating the distance
    distance= duration*0.034/2;
    // Prints the distance on the Serial Monitor
    Serial.print("Duracion: ");
    Serial.println(duration);
    Serial.print("Distance: ");
    Serial.println(distance);
    if(distance>lectureDistance){
      tempStatus = 0;
    }
    else{
      tempStatus = 1;
    }
    if(tempStatus != parkStatus){
      parkStatus = tempStatus;
      if(parkStatus == 0){
        digitalWrite(led, HIGH);
      }
      else{
        digitalWrite(led, LOW);
      }
      //delay(7000);
      Firebase.setInt(fbPath,parkStatus); //Envia los datos a Firebase
    }
  }
  else{
    Serial.println("DISCONNECTED");
    
    digitalWrite(led, HIGH);

    connectWifiANDFirebase();

    parkStatus = 2;
  }
}
