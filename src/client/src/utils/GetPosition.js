export default{
    getPosition: function(){
        var onSuccess = function(position) {
            alert('lat: '         + position.coords.latitude          + '\n' +
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