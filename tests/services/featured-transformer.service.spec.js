describe("transforming featured (recs and categories combined)", function () {

    var FeaturedTransformerService, apiReturn;

    beforeEach(function () {
        module('ourstay');
        inject(function ($injector) {
            FeaturedTransformerService = $injector.get('FeaturedTransformerService');
        });

        apiReturn = {
            r: [
                {
                    objectid: 9,
                    objecttypeid: 21,
                    objectname: "Shopping",
                    objecturl: null,
                    featuredposition: 1,
                    issaved: false,
                    latitude: null,
                    longitude: null,
                    walkingminutesfromhotel: null,
                    drivingminutesfromhotel: null,
                    whyrecommended: [ ],
                    redirectout: false,
                    imageurl: "http://ourhistree-prd.s3.amazonaws.com/11307/thumb/ios2xb3988339b13b06cd1410209560.jpg",
                    moodview: [
                        {
                            objectid: 17183,
                            objecttypeid: 2,
                            objectname: "Update Test - Saturday 2 (added hours)",
                            objecturl: null,
                            ismapped: true,
                            issaved: false,
                            whyrecommended: [
                                "fknbv'p ebfpj"
                            ],
                            latitude: "34.0674370",
                            longitude: "-118.4065880",
                            walkingminutesfromhotel: null,
                            drivingminutesfromhotel: null,
                            redirectout: false,
                            imageurl: "http://ourhistree-prd.s3.amazonaws.com/158407/thumb/ios2xd2b5ca33bd970f641437896874.jpg"
                        }
                    ]
                },
                {
                    objectid: 83,
                    objecttypeid: 2,
                    objectname: "Hinoki & the Bird",
                    objecturl: "http://hinokiandthebird.com/",
                    featuredposition: 2,
                    issaved: false,
                    latitude: "34.0563740",
                    longitude: "-118.4146730",
                    walkingminutesfromhotel: 29,
                    drivingminutesfromhotel: 6,
                    whyrecommended: [
                        "The dessert is not to be missed",
                        "It takes an extreme level of dedication to create an experience this flawless - LA Weekly"
                    ],
                    redirectout: false,
                    imageurl: "http://ourhistree-prd.s3.amazonaws.com/1322/thumb/ios2x648b9906a614a4bb1403905412.jpg",
                    recommendationassets: [
                        "http://ourhistree-prd.s3.amazonaws.com/1300/thumb/ios2xde9b01bf3d89963b1403905359.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1301/thumb/ios2xfe5df232cafa4c4e1403905361.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1302/thumb/ios2x8df7b73a7820f4ae1403905363.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1303/thumb/ios2x9414a8f5b810972c1403905365.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1304/thumb/ios2xdb3a17f7bcac837e1403905368.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1305/thumb/ios2x85b6f89b41cae2671403905371.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1306/thumb/ios2xe89666feb714ab9c1403905373.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1307/thumb/ios2x129e458698c4745a1403905376.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1308/thumb/ios2x2cf114e3069648c61403905378.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1309/thumb/ios2x1dc5fbf00a014f9b1403905382.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1310/thumb/ios2xe25418821200a0f71403905384.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1311/thumb/ios2x980ecce5ade1259c1403905386.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1317/thumb/ios2x00e3003737dc6f9a1403905395.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1322/thumb/ios2x648b9906a614a4bb1403905412.jpg"
                    ],
                    ismapped: true,
                    fsrecommendationassets: [
                        "http://ourhistree-prd.s3.amazonaws.com/1300/de9b01bf3d89963b1403905359.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1301/fe5df232cafa4c4e1403905361.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1302/8df7b73a7820f4ae1403905363.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1303/9414a8f5b810972c1403905365.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1304/db3a17f7bcac837e1403905368.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1305/85b6f89b41cae2671403905371.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1306/e89666feb714ab9c1403905373.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1307/129e458698c4745a1403905376.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1308/2cf114e3069648c61403905378.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1309/1dc5fbf00a014f9b1403905382.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1310/e25418821200a0f71403905384.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1311/980ecce5ade1259c1403905386.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1317/00e3003737dc6f9a1403905395.jpg",
                        "http://ourhistree-prd.s3.amazonaws.com/1322/648b9906a614a4bb1403905412.jpg"
                    ]
                }
            ],
            e: "",
            t: null
        };

    });

    it("should convert OurStay results to array of RecommendationAdaptor and CategoryAdaptor", function () {

        expect(FeaturedTransformerService).toBeDefined();

        var category = FeaturedTransformerService.createFeaturedAdaptor();
        category.id = 9;
        category.featuredType = 'category';
        category.name = "Shopping";
        category.position = 1;
        category.imageUrl = "http://ourhistree-prd.s3.amazonaws.com/11307/thumb/ios2xb3988339b13b06cd1410209560.jpg";

        var fa = FeaturedTransformerService.createFeaturedAdaptor();
        fa.id = 17183;
        fa.featuredType = 'recommendation';
        fa.name = "Update Test - Saturday 2 (added hours)";
        fa.imageUrl = "http://ourhistree-prd.s3.amazonaws.com/158407/thumb/ios2xd2b5ca33bd970f641437896874.jpg";
        fa.lat = "34.0674370";
        fa.lng = "-118.4065880";

        category.recommendations = [fa];

        var recommendation = FeaturedTransformerService.createFeaturedAdaptor();
        recommendation.id = 83;
        recommendation.featuredType = 'recommendation';
        recommendation.name = "Hinoki & the Bird";
        recommendation.url = "http://hinokiandthebird.com/";
        recommendation.position = 2;
        recommendation.lat = "34.0563740";
        recommendation.lng = "-118.4146730";
        recommendation.walkingMinutesFromHotel = 29;
        recommendation.drivingMinutesFromHotel = 6;
        recommendation.imageUrl = "http://ourhistree-prd.s3.amazonaws.com/1322/thumb/ios2x648b9906a614a4bb1403905412.jpg";
        recommendation.images = [
            "http://ourhistree-prd.s3.amazonaws.com/1300/thumb/ios2xde9b01bf3d89963b1403905359.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1301/thumb/ios2xfe5df232cafa4c4e1403905361.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1302/thumb/ios2x8df7b73a7820f4ae1403905363.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1303/thumb/ios2x9414a8f5b810972c1403905365.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1304/thumb/ios2xdb3a17f7bcac837e1403905368.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1305/thumb/ios2x85b6f89b41cae2671403905371.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1306/thumb/ios2xe89666feb714ab9c1403905373.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1307/thumb/ios2x129e458698c4745a1403905376.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1308/thumb/ios2x2cf114e3069648c61403905378.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1309/thumb/ios2x1dc5fbf00a014f9b1403905382.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1310/thumb/ios2xe25418821200a0f71403905384.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1311/thumb/ios2x980ecce5ade1259c1403905386.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1317/thumb/ios2x00e3003737dc6f9a1403905395.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1322/thumb/ios2x648b9906a614a4bb1403905412.jpg"
        ];

        recommendation.featuredImages = [
            "http://ourhistree-prd.s3.amazonaws.com/1300/de9b01bf3d89963b1403905359.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1301/fe5df232cafa4c4e1403905361.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1302/8df7b73a7820f4ae1403905363.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1303/9414a8f5b810972c1403905365.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1304/db3a17f7bcac837e1403905368.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1305/85b6f89b41cae2671403905371.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1306/e89666feb714ab9c1403905373.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1307/129e458698c4745a1403905376.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1308/2cf114e3069648c61403905378.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1309/1dc5fbf00a014f9b1403905382.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1310/e25418821200a0f71403905384.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1311/980ecce5ade1259c1403905386.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1317/00e3003737dc6f9a1403905395.jpg",
            "http://ourhistree-prd.s3.amazonaws.com/1322/648b9906a614a4bb1403905412.jpg"
        ];


        var converted = FeaturedTransformerService.fromJSON(apiReturn["r"]);

       expect(converted).toEqual([category, recommendation]);
    });
});

