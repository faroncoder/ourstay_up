describe("transforming properties", function () {

    var PropertyTransformerService, apiReturn;

    beforeEach(function () {
        module('ourstay');
        inject(function ($injector) {
            PropertyTransformerService = $injector.get('PropertyTransformerService');
        });

        apiReturn = {
            r: {
                communitreeguid: 3,
                communitreedefaultbranch: 4,
                communitreeplan: 1,
                productshortname: "fsbevwil",
                productlongname: "fsbeverlywilshire",
                productname: "Beverly Wilshire, Beverly Hills (A Four Seasons Hotel)",
                logourl: null,
                hotelhashtag: "@BeverlyWilshire",
                analyticscode: "UA-10599893-1",
                latitude: "34.0668190",
                longitude: "-118.4010200",
                physicaladdressstreet1: "9500 Wilshire Blvd.",
                physicaladdressstreet2: null,
                physicaladdressstreet3: null,
                physicaladdresscity: "Beverly Hills",
                physicaladdressstate: "CA",
                physicaladdresspostalcode: "90212",
                physicaladdresscountry: "USA",
                physicaladdressphone: "+1(310)275-5200",
                physicaladdressconciergephone: "+1(310)275-5200",
                communitreeproperties: {
                    Staff: "Concierge",
                    Category: "Mood",
                    hostScreenTitle: "Staff",
                    facebookmessagekey: "message",
                    socialshareViaString: "OurStay Four Seasons Recommends on the Four Seasons Mobile App",
                    socialsharelink: "www.ourstay.com",
                    featuredScreenTitle: "Featured Recommendations"
                },
                imageurl: "http://ourhistree-prd.s3.amazonaws.com/2985/thumb/ios2x7d444706419d02981406916252.jpg",
                transfailure: false
            },
            e: "",
            t: null
        };

    });

    it("should convert OurStay results to PropertyAdaptor", function () {

        expect(PropertyTransformerService).toBeDefined();

        var propertyAdaptor = PropertyTransformerService.createPropertyAdaptor();
        propertyAdaptor.id = 3;
        propertyAdaptor.defaultBranchId = 4;
        propertyAdaptor.planId = 1;
        propertyAdaptor.shortenedSlug = "fsbevwil";
        propertyAdaptor.slug = "fsbeverlywilshire";
        propertyAdaptor.name = "Beverly Wilshire, Beverly Hills (A Four Seasons Hotel)";
        propertyAdaptor.logoUrl = null;
        propertyAdaptor.lat = "34.0668190";
        propertyAdaptor.lng = "-118.4010200";
        propertyAdaptor.street1 = "9500 Wilshire Blvd.";
        propertyAdaptor.city = "Beverly Hills";
        propertyAdaptor.state = "CA";
        propertyAdaptor.country = "USA";
        propertyAdaptor.postalCode = "90212";
        propertyAdaptor.phone = "+1(310)275-5200";
        propertyAdaptor.imageUrl = "http://ourhistree-prd.s3.amazonaws.com/2985/thumb/ios2x7d444706419d02981406916252.jpg";

        var converted = PropertyTransformerService.fromJSON(apiReturn["r"]);

        expect(converted).toEqual(propertyAdaptor);
    });
});

