//describe("User can enable location services to for increased accuracy", function() {
//
//    var GeoLocationService, deferred, $rootScope;
//
//    beforeEach(function () {
//        module('ourstay');
//        inject(function($injector, $q, $rootScope) {
//            GeoLocationService = $injector.get('GeoLocationService');
//            $rootScope = $rootScope;
//            deferred = $q.defer();
//        });
//    });
//
//    it("should be able to turn on location services", function() {
//        var promise = GeoLocationService.isTrackingActive(true);
//
//
//*
//
//        expect(GeoLocationService.getStatus()).toEqual(true);
//    });
//
//    it("should be able to turn off location services", function() {
//
//    });
//
//    it("should be able to get lat/lng if location services enabled", function() {
//
//    });
//
//});