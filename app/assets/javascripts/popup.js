$(document).ready(function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      alert("Latitude: " + position.coords.latitude +
      "\nLongitude: " + position.coords.longitude);
    }
  });
