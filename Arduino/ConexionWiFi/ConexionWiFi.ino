/////////////////////////////////
// Generated with a lot of love//
// with TUNIOT FOR ESP8266     //
// Website: Easycoding.tn      //
/////////////////////////////////
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

/*char ssid[] = "FABIO GATTI";
char password[] = "autentico";*/

char ssid[] = "Apto501";
char password[] = "rNbT9kRbgeSsQ";

void setup()
{
  Serial.begin(115200);

  delay(3000);
  WiFi.disconnect();
  Serial.println("START");
  WiFi.begin(ssid,password);
  while ((!(WiFi.status() == WL_CONNECTED))){
    delay(300);
    Serial.print("..");
    Serial.print(WiFi.status());

  }
  Serial.println("CONNECTED!");

}

char data[] = "latitude=3.349227&longitude=-76.531410&status=0";

void loop()
{
  if(WiFi.status() == WL_CONNECTED){ //Check for internet
    
    HTTPClient http; //Declare object of class HTTPClient

    http.begin("http://parqueame-app.herokuapp.com/parkingbay");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    int httpCode = http.sendRequest("PUT", String(data));

    Serial.print(httpCode);

    /*http.begin("http://www.congeladossalomia.com/api/productos/1"); //Request destination
    int httpCode = http.GET();

    Serial.print(httpCode);

    if(httpCode>0){
      String payload = http.getString(); //Get the request response payload
      Serial.println(payload);  //Print the response
    }*/

    http.end(); //Close connection
    
  }

  delay(30000); //Send request every 30 secs

}
