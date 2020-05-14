import API from '../utils/API'

export default{
    getArchivedPositions: async function(){
        try{
            const {status, data} = await API.history(localStorage.getItem("token"));
            if (status === 200){
                this.setState({archivedPositions: data});
            }
        }
        catch(error){
            if (error.response.status === 406){
                this.setState({archivedPositions: false});
            }
            else if (error.response.status === 400 || error.response.status === 401){
                console.log("error");
            }
        } 
    },
    
    getCurrentPosition: async function(){
        try{
            const {status, data} = await API.getCurrentLocation(localStorage.getItem("token"),localStorage.getItem());
            if (status === 200){
                this.setState({currentPosition: data});
            }
        }
        catch(error){
            if (error.response.status === 406){
                this.setState({currentPosition: false});
            }
            else if (error.response.status === 400 || error.response.status === 401 || error.response.status === 403){
                console.log("error");
            }
        } 
    },

    postCurrentPosition: async function(){
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