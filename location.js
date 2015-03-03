Math.degrees = function(rad) {
    return rad*(180/Math.PI);
};

Math.radians = function(deg) {
    return deg * (Math.PI/180);
};
var getBoundingLoc=function(option,bearingPos){
    var baringPosValue={N:0,E:90,S:180,W:270};
    var radius=6371;
    var latA=Math.radians(option.latitude),
        lonA=Math.radians(option.longitude),
        bearing=Math.radians(baringPosValue[bearingPos]),
        angDist=option.distance/radius;

    var latB=Math.asin(
        Math.sin(latA)*Math.cos(angDist)+Math.cos(latA)*Math.sin(angDist)*Math.cos(bearing)
    );
    var lonB=lonA+Math.atan2(
            (Math.sin(bearing)*Math.sin(angDist)*Math.cos(latA)),(Math.cos(angDist)-Math.sin(latA)*Math.sin(latB))
        );
    return {latitude:Math.degrees(latB),longitude:Math.degrees(lonB)}
};

nearByLocation={
    getSurrounding: function (options) {

        return {
            N:getBoundingLoc(options,'N'),
            S:getBoundingLoc(options,'S'),
            E:getBoundingLoc(options,'E'),
            W:getBoundingLoc(options,'W')
        }
    },
    getDistance:function(option){

        var R = 6371; // km
        var φ1 = Math.radians(option.latA);
        var φ2 = Math.radians(option.latB);
        var Δφ = Math.radians(option.latB-option.latA);
        var Δλ = Math.radians(option.lngB-option.lngA);

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var d = R * c;
        return {distance:d,unit:option.unit};


    }
};
