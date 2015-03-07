var mapName = context.getVariable("mapName");
var mapArr = getMap(mapName);
var enableMapLogging = context.getVariable("enableMapLogging");
var jsonResponse = context.getVariable("jsonResponse");
var logEntryNum = 1;

if (mapArr !== undefined) {
  context.setVariable("mapArr", JSON.stringify(mapArr));

  var mapr = new JSMapr();
  mapr.setMapArray(mapArr);

  if (enableMapLogging != null) {
	  mapr.setLoggingFunc(function(entry) {
		context.setVariable("MAPLOG["+logEntryNum+"]", entry);
		logEntryNum++;
	  });
  }

  var objToMap = JSON.parse(jsonResponse);

  objToMap = mapr.map(objToMap);

  context.setVariable("response.content", JSON.stringify(objToMap));
} else {
  context.setVariable("response.content", jsonResponse);
}
context.setVariable("response.header.Content-Type", "application/json");

