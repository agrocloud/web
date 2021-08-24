function comu(canales,numero)
{
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const options = {
  keepalive: 60,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false
  },
}


const host = 'ws://192.168.43.42:9001' 
let canales2=[];
canales2=canales;


console.log('Connecting mqtt client')
const client = mqtt.connect(host, options)

client.on('error', (err) => {
  console.log('Connection error: ', err)
  //client.end()
})

client.on('reconnect', () => {
  console.log('Reconnecting...')
})



client.on('connect', () => {
  console.log('Client connected:' + clientId)
  // Subscribe

  
})

console.log(canales);
;


var gauges=[];

for ( var item = 0; item < numero ; item++) {

 client.subscribe(canales[item], { qos: 0 })
          
gauges[item] = new RadialGauge({ renderTo: item.toString() ,width: 420,
    height: 350, id:item}).draw()


        }


/*
nodo2 = new RadialGauge({ renderTo: "1" ,width: 400,
    height: 400, id:item}).draw()
*/


client.on('message', (topic, message, packet) => {
  //console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
  
var msn=message.toString();
console.log(msn);
console.log(msn.length)

//console.log(canales[0])
if(message.length<6)
{
for ( var item = 0; item < numero ; item++) {

 if(topic.toString()==canales[item])

 	gauges[item].value = parseInt(msn)

        }
}



})


}