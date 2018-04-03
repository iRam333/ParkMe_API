#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>


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

void setup() {
  Serial.begin(115200);

  delay(3000);
  WiFi.disconnect(true);
  Serial.println("CONNECTING");
  
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
    WiFi.disconnect(true);
    /*WiFi.begin(ssid,password);*/
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
    /*WiFi.begin(ssid,password);
    Serial.println("Not connected");
    delay(15000);*/
  }

  //delay(300);
}
