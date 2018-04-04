#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <FirebaseArduino.h>

#define firebaseURL "parqueameapp-6bdc3.firebaseio.com"
#define authCode "dVB45j8eX6jJyqvOjvi2eYBEby8x3e0qo1HfIhD0"

String fbPath = "ParkingBay/Espacio1/status";

/*void toggleFirebaseSensor(stat){
  Firebase.setInt(fbPath,stat);
}*/

// defines pins numbers
const int trigPin = D5;
const int echoPin = D6;
const int led = D8;


/*char ssid[] = "FABIO GATTI";
char password[] = "autentico";*/

char ssid[] = "AndroidAP";
char password[] = "mfoq0723";

/*char ssid[] = "Apto501";
char password[] = "rNbT9kRbgeSsQ";*/

int parkStatus = 2;
int tempStatus;

// defines variables
long duration;
int distance;

char data[] = "latitude=3.349227&longitude=-76.531410&status=";
String tempData;

//Funcion que coordina la conexión wifi
void connectWifiLoop(){
  WiFi.disconnect(true);
  WiFi.begin(ssid,password);
  /*while ((!(WiFi.status() == WL_CONNECTED))){
    delay(300);
    Serial.print("..");
    Serial.print(WiFi.status());
  }*/
  while ((!(WiFi.status() == WL_CONNECTED))){
    WiFi.begin(ssid,password);
    delay(10000);
    Serial.print("..");
    //Serial.print(WiFi.status());
  }
}

//Setup de firebase
void setupFirebase(){
  Firebase.begin(firebaseURL, authCode);
}

void setup() {
  Serial.begin(115200);

  delay(3000);
  Serial.println("CONNECTING");
  
  connectWifiLoop();

  setupFirebase();
  
  Serial.println("CONNECTED!");
  
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(led, OUTPUT);
  //Serial.begin(9600); // Starts the serial communication
}

void loop() {
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
    if(distance>10){
      digitalWrite(led, HIGH);
      tempStatus = 0;
    }
    else{
      digitalWrite(led, LOW);
      tempStatus = 1;
    }

    if(tempStatus != parkStatus){
      parkStatus = tempStatus;
      tempData = String(data)+String(parkStatus);

      //toggleFirebaseSensor(parkStatus);
      Firebase.setInt(fbPath,parkStatus); //Envia los datos a Firebase
      
      Serial.println(tempData);

      HTTPClient http; //Declare object of class HTTPClient

      http.begin("http://parqueame-app.herokuapp.com/parkingbay");
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  
      int httpCode = http.sendRequest("PUT", String(tempData));
  
      Serial.println("Status code: "+String(httpCode));
  
      /*http.begin("http://www.congeladossalomia.com/api/productos/1"); //Request destination
      int httpCode = http.GET();
  
      Serial.print(httpCode);
  
      if(httpCode>0){
        String payload = http.getString(); //Get the request response payload
        Serial.println(payload);  //Print the response
      }*/

      http.end(); //Close connection
    }
    
  }
  
  else{
    digitalWrite(led, HIGH);
    
    connectWifiLoop();

    setupFirebase();
    
    /*WiFi.begin(ssid,password);
    Serial.println("Not connected");
    delay(15000);*/
  }

  //delay(300);
}
