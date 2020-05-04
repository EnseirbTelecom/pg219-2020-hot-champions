export default{
    getCurrentPosition: function(){
        console.log("test");
        var onSuccess = function(position) {
            console.log('lat: '         + position.coords.latitude          + '\n' +
                  'lng: '         + position.coords.longitude         + '\n' );
        };
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },
}