//describe("transforming recommendations", function () {
//
//    var RecommendationTransformerService, apiReturn, variedApiReturn;
//
//    beforeEach(function () {
//        module('ourstay');
//        inject(function ($injector) {
//            RecommendationTransformerService = $injector.get('RecommendationTransformerService');
//        });
//
//        variedApiReturn = {
//            "r": {
//                "relatedmoods": [{
//                    "slottype": 1,
//                    "moods": [{
//                        "moodid": 9,
//                        "moodname": "Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/11307\/thumb\/mosaic1ios2xb3988339b13b06cd1410209560.jpg",
//                        "width": 1,
//                        "height": 0.666
//                    }]
//                }, {
//                    "slottype": 2,
//                    "moods": [{
//                        "moodid": 56,
//                        "moodname": "Personal Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2472\/thumb\/mosaic6ios2xc57d2eca8dc637a91405035685.jpg",
//                        "width": 0.5,
//                        "height": 0.333
//                    }, {
//                        "moodid": 1,
//                        "moodname": "Dining",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/11322\/thumb\/mosaic4ios2xd4b556f593a61f231410209631.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 51,
//                        "moodname": "Chef\u2019s Table",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2497\/thumb\/mosaic2ios2x381f8b0e09ee472d1405036158.jpg",
//                        "width": 0.5,
//                        "height": 0.666
//                    }, {
//                        "moodid": 3,
//                        "moodname": "Fine Dining",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2204\/thumb\/mosaic4ios2x228588c47e7257ad1404867658.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }]
//                }, {
//                    "slottype": 7,
//                    "moods": [{
//                        "moodid": 61,
//                        "moodname": "Italian",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2197\/thumb\/mosaic3ios2xd83f57345e0ae9bf1404867607.jpg",
//                        "width": 0.594,
//                        "height": 0.395
//                    }, {
//                        "moodid": 62,
//                        "moodname": "Mediterranean",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2496\/thumb\/mosaic5ios2xf861722ad84cf6601405036154.jpg",
//                        "width": 0.395,
//                        "height": 0.395
//                    }]
//                }, {
//                    "slottype": 3,
//                    "moods": [{
//                        "moodid": 10,
//                        "moodname": "Men\u2019s Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2481\/thumb\/mosaic4ios2x18b4f1aa9c4c88111405035878.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 23,
//                        "moodname": "Tea",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2471\/thumb\/mosaic6ios2x3cd17ad0d2957d8e1405035665.jpg",
//                        "width": 0.5,
//                        "height": 0.333
//                    }, {
//                        "moodid": 43,
//                        "moodname": "Tours",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2600\/thumb\/mosaic4ios2x01b7bfd32f884b471405117735.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 11,
//                        "moodname": "Women\u2019s Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2198\/thumb\/mosaic2ios2x6f4c5337989dd31d1404867617.jpg",
//                        "width": 0.5,
//                        "height": 0.666
//                    }]
//                }],
//                "data": [{
//                    "objectid": "77",
//                    "objecttypeid": "2",
//                    "objectname": "Scarpetta",
//                    "objecturl": null,
//                    "issaved": "f",
//                    "latitude": "34.0677970",
//                    "longitude": "-118.3987640",
//                    "walkingminutesfromhotel": "4",
//                    "drivingminutesfromhotel": "2",
//                    "whyrecommended": ["The spaghetti with tomato and basil is a staple"],
//                    "moodids": ["51", "1", "61", "62"],
//                    "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg",
//                    "recommendationassets": ["http:\/\/ourhistree-prd.s3.amazonaws.com\/1150\/thumb\/ios2x043200048bb2ddb01403903408.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1151\/thumb\/ios2xa5f5a6d563b902ac1403903410.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1152\/thumb\/ios2x73d37e392a7763b31403903411.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1153\/thumb\/ios2xd1e0126cd4879b7b1403903412.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1154\/thumb\/ios2xc67ccdbe38b24db41403903414.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1156\/thumb\/ios2xb18aca521a225aac1403903416.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1157\/thumb\/ios2xd91092385d24e9a31403903417.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1158\/thumb\/ios2xcfbdafd55414536d1403903418.jpg"]
//                }]
//            }, "e": "", "t": null
//        };
//
//        apiDetailReturn = {
//            r: [
//                {
//                    histreeid: 6020,
//                    communitreeid: 1001,
//                    name: "Water Grill",
//                    description: "Whether perfectly cooked or served from the raw bar, Water Grill has been a standard for fresh fish in LA since opening in '89. So prestigious, it has extended to other locations in Santa Monica and even San Diego. With a recent renovation, the downtown location has a newly laid back feel, but the food still remains top notch. Its extensive raw bar offerings include approximately a dozen different oysters along with clams, lobster and even sea urchin. If shellfish isn’t your thing, opt for raw crudos of salmon and bigeye tuna, the Chilean sea bass, or the clam chowder, which is a standout.",
//                    website: "http://www.watergrill.com/",
//                    issaved: false,
//                    whyrecommended: [
//                        "Seafood mainstay offers fabulous raw & cooked selections"
//                    ],
//                    latitude: "34.0490400",
//                    longitude: "-118.2547070",
//                    physicaladdressstreet1: "544 S. Grand Avenue",
//                    physicaladdressstreet2: null,
//                    physicaladdressstreet3: null,
//                    physicaladdresscity: "Los Angeles",
//                    physicaladdressstate: "CA",
//                    physicaladdresspostalcode: "90071",
//                    physicaladdressname: "Water Grill",
//                    physicaladdresscountry: "United States",
//                    physicaladdressphone: "213 891 0900",
//                    shareURL: null,
//                    canapprove: null,
//                    scheduleeffectivedate: null,
//                    scheduleexpiredate: null,
//                    schedulepermanent: null,
//                    scheduleactive: null,
//                    walkingminutesfromhotel: null,
//                    drivingminutesfromhotel: null,
//                    opentableid: "989",
//                    externalservicetypeid: 1,
//                    externalserviceid: "989",
//                    meetthe: true,
//                    meettheid: "467",
//                    meetthetypeid: "20",
//                    meetthetype: "Executive Chef",
//                    meetthesalutation: "The Executive Chef",
//                    meetthefname: "Justin",
//                    meetthelname: "Albertson",
//                    meetthedescription: "A staple on the Downtown LA foodie scene, Executive Chef Justin Albertson had already put his spin on downtown rooftop restaurant PERCH with dishes like “Little Bunny Frou Frou” before bringing his imagination to the Water Grill. Following the footsteps of other famous seafood chefs who have worked at Water Grill, such as Providence’s Michael Cimarusti, Justin brings his own signature style to the refined stalwart of Water Grill. ",
//                    meetthereason1: "Downtown LA rising star chef",
//                    meetthereason2: "",
//                    meetthewebsite: "",
//                    meettheassetid: "55779",
//                    meettheurl: "http://ourhistree-prd.s3.amazonaws.com/55779/thumb/square206bd841a7345cdf1432843425.jpg",
//                    moods: [
//                        "(1,Dining,,,,,,)",
//                        "(60,Seafood,,,,,,)"
//                    ],
//                    openclosetimes: [
//                        {
//                            dayofweek: "1",
//                            opentimeday: "16:00:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "2",
//                            opentimeday: "11:30:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "3",
//                            opentimeday: "11:30:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "4",
//                            opentimeday: "11:30:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "5",
//                            opentimeday: "11:30:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "6",
//                            opentimeday: "11:30:00",
//                            closetimeday: "22:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        },
//                        {
//                            dayofweek: "7",
//                            opentimeday: "16:00:00",
//                            closetimeday: "23:00:00",
//                            opentimenight: "",
//                            closetimenight: "",
//                            closed: false
//                        }
//                    ],
//                    historyurl: "http://ourhistree-prd.s3.amazonaws.com/55777/thumb/ios2xd2b5ca33bd970f641432843370.jpg",
//                    recommendationassets: [
//                        "http://ourhistree-prd.s3.amazonaws.com/55777/thumb/ios2xd2b5ca33bd970f641432843370.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55772/thumb/ios2xc8a76f0aaf5c69951432843234.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55771/thumb/ios2x0a8bc5316d89ffbe1432843211.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55776/thumb/ios2xd2b5ca33bd970f641432843348.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55778/thumb/ios2xd2b5ca33bd970f641432843412.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55767/thumb/ios2x1f130a0021cf1c2f1432843171.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55765/thumb/ios2xdea24608eee23ef51432843145.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55775/thumb/ios2xd2b5ca33bd970f641432843337.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55761/thumb/ios2x932f4d41894106dc1432843119.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55774/thumb/ios2xd2b5ca33bd970f641432843304.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55773/thumb/ios2xd2b5ca33bd970f641432843296.jpg"
//                    ],
//                    fsrecommendationassets: [
//                        "http://ourhistree-prd.s3.amazonaws.com/55777/d2b5ca33bd970f641432843370.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55772/c8a76f0aaf5c69951432843234.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55771/0a8bc5316d89ffbe1432843211.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55776/d2b5ca33bd970f641432843348.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55778/d2b5ca33bd970f641432843412.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55767/1f130a0021cf1c2f1432843171.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55765/dea24608eee23ef51432843145.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55775/d2b5ca33bd970f641432843337.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55761/932f4d41894106dc1432843119.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55774/d2b5ca33bd970f641432843304.jpg",
//                        "http://ourhistree-prd.s3.amazonaws.com/55773/d2b5ca33bd970f641432843296.jpg"
//                    ],
//                    assetids: [
//                        201139,
//                        201138,
//                        201137,
//                        201136,
//                        201135,
//                        201134,
//                        201133,
//                        201132,
//                        201131,
//                        201130,
//                        201129
//                    ],
//                    nearby: {
//                        data: [
//                            [
//                                {
//                                    objectid: "3508",
//                                    objecttypeid: "2",
//                                    objectname: "Bottega Louie",
//                                    objecturl: null,
//                                    issaved: "f",
//                                    latitude: "34.0469840",
//                                    longitude: "-118.2565760",
//                                    walkingminutesfromhotel: "",
//                                    drivingminutesfromhotel: false,
//                                    whyrecommended: [
//                                        "A chic downtown mainstay, featuring high ceilings and white marble"
//                                    ],
//                                    imageurl: "http://ourhistree-prd.s3.amazonaws.com/41979/thumb/ios2xd2b5ca33bd970f641432671380.jpg",
//                                    recommendationassets: [
//                                        "http://ourhistree-prd.s3.amazonaws.com/41979/thumb/ios2xd2b5ca33bd970f641432671380.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41977/thumb/ios2xd2b5ca33bd970f641432671359.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41972/thumb/ios2xd2b5ca33bd970f641432671293.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41971/thumb/ios2xd2b5ca33bd970f641432671279.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41976/thumb/ios2xd2b5ca33bd970f641432671344.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41973/thumb/ios2xd2b5ca33bd970f641432671305.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41974/thumb/ios2xd2b5ca33bd970f641432671315.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41975/thumb/ios2xd2b5ca33bd970f641432671332.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41978/thumb/ios2xd2b5ca33bd970f641432671371.jpg",
//                                        "http://ourhistree-prd.s3.amazonaws.com/41980/thumb/ios2xd2b5ca33bd970f641432671396.jpg"
//                                    ]
//                                }
//                            ]
//                        ]
//                    }
//                }
//            ],
//            e: "",
//            t: null
//        };
//
//        apiReturn = {
//            "r": {
//                "relatedmoods": [{
//                    "slottype": 1,
//                    "moods": [{
//                        "moodid": 9,
//                        "moodname": "Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/11307\/thumb\/mosaic1ios2xb3988339b13b06cd1410209560.jpg",
//                        "width": 1,
//                        "height": 0.666
//                    }]
//                }, {
//                    "slottype": 2,
//                    "moods": [{
//                        "moodid": 56,
//                        "moodname": "Personal Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2472\/thumb\/mosaic6ios2xc57d2eca8dc637a91405035685.jpg",
//                        "width": 0.5,
//                        "height": 0.333
//                    }, {
//                        "moodid": 1,
//                        "moodname": "Dining",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/11322\/thumb\/mosaic4ios2xd4b556f593a61f231410209631.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 51,
//                        "moodname": "Chef\u2019s Table",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2497\/thumb\/mosaic2ios2x381f8b0e09ee472d1405036158.jpg",
//                        "width": 0.5,
//                        "height": 0.666
//                    }, {
//                        "moodid": 3,
//                        "moodname": "Fine Dining",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2204\/thumb\/mosaic4ios2x228588c47e7257ad1404867658.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }]
//                }, {
//                    "slottype": 7,
//                    "moods": [{
//                        "moodid": 61,
//                        "moodname": "Italian",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2197\/thumb\/mosaic3ios2xd83f57345e0ae9bf1404867607.jpg",
//                        "width": 0.594,
//                        "height": 0.395
//                    }, {
//                        "moodid": 62,
//                        "moodname": "Mediterranean",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2496\/thumb\/mosaic5ios2xf861722ad84cf6601405036154.jpg",
//                        "width": 0.395,
//                        "height": 0.395
//                    }]
//                }, {
//                    "slottype": 3,
//                    "moods": [{
//                        "moodid": 10,
//                        "moodname": "Men\u2019s Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2481\/thumb\/mosaic4ios2x18b4f1aa9c4c88111405035878.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 23,
//                        "moodname": "Tea",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2471\/thumb\/mosaic6ios2x3cd17ad0d2957d8e1405035665.jpg",
//                        "width": 0.5,
//                        "height": 0.333
//                    }, {
//                        "moodid": 43,
//                        "moodname": "Tours",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2600\/thumb\/mosaic4ios2x01b7bfd32f884b471405117735.jpg",
//                        "width": 0.5,
//                        "height": 0.5
//                    }, {
//                        "moodid": 11,
//                        "moodname": "Women\u2019s Shopping",
//                        "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/2198\/thumb\/mosaic2ios2x6f4c5337989dd31d1404867617.jpg",
//                        "width": 0.5,
//                        "height": 0.666
//                    }]
//                }],
//                "data": [[{
//                    "objectid": "77",
//                    "objecttypeid": "2",
//                    "objectname": "Scarpetta",
//                    "objecturl": null,
//                    "issaved": "f",
//                    "latitude": "34.0677970",
//                    "longitude": "-118.3987640",
//                    "walkingminutesfromhotel": "4",
//                    "drivingminutesfromhotel": "2",
//                    "whyrecommended": ["The spaghetti with tomato and basil is a staple"],
//                    "moodids": ["51", "1", "61", "62"],
//                    "imageurl": "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg",
//                    "recommendationassets": ["http:\/\/ourhistree-prd.s3.amazonaws.com\/1150\/thumb\/ios2x043200048bb2ddb01403903408.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1151\/thumb\/ios2xa5f5a6d563b902ac1403903410.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1152\/thumb\/ios2x73d37e392a7763b31403903411.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1153\/thumb\/ios2xd1e0126cd4879b7b1403903412.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1154\/thumb\/ios2xc67ccdbe38b24db41403903414.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1156\/thumb\/ios2xb18aca521a225aac1403903416.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1157\/thumb\/ios2xd91092385d24e9a31403903417.jpg", "http:\/\/ourhistree-prd.s3.amazonaws.com\/1158\/thumb\/ios2xcfbdafd55414536d1403903418.jpg"]
//                }]]
//            }, "e": "", "t": null
//        };
//
//    });
//
//    it("should convert recommendation detail", function() {
//        expect(RecommendationTransformerService).toBeDefined();
//
//        var created = RecommendationTransformerService.createRecommendationAdaptor();
//        created.id = 6020;
//        created.name = "Water Grill";
//        created.description = [
//            "Whether perfectly cooked or served from the raw bar, Water Grill has been a standard for fresh fish in LA since opening in '89. So prestigious, it has extended to other locations in Santa Monica and even San Diego. With a recent renovation, the downtown location has a newly laid back feel, but the food still remains top notch. Its extensive raw bar offerings include approximately a dozen different oysters along with clams, lobster and even sea urchin. If shellfish isn’t your thing, opt for raw crudos of salmon and bigeye tuna, the Chilean sea bass, or the clam chowder, which is a standout."
//        ];
//        created.url = "http://www.watergrill.com/";
//        created.shortDescription = "Seafood mainstay offers fabulous raw & cooked selections";
//        created.lat = "34.0490400";
//        created.lng = "-118.2547070";
//        created.street1 = "544 S. Grand Avenue";
//        created.city = "Los Angeles";
//        created.state = "CA";
//        created.postalCode = "90071";
//        created.country = "United States";
//        created.phone = "213 891 0900";
//        created.meetTheUrl = "http://ourhistree-prd.s3.amazonaws.com/55779/thumb/square206bd841a7345cdf1432843425.jpg";
//        created.meetTheName = "Justin Albertson";
//        created.meetTheTagline = "Downtown LA rising star chef";
//        created.externalServices = [
//            {
//                id: "989",
//                label: "openTable",
//                url: "http://www.opentable.com/989"
//            }
//        ];
//        created.relatedCategories = [
//            {
//                id: 1,
//                name: "Dining"
//            },
//            {
//                id: 60,
//                name: "Seafood"
//            }
//        ];
//        created.operatingHours = [
//            {
//                openTimeDay: new Date(1970, 0, 1, 16, 0, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 1
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 11, 30, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 2
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 11, 30, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 3
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 11, 30, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 4
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 11, 30, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 5
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 11, 30, 0),
//                closeTimeDay: new Date(1970, 0, 1, 22, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 6
//            },
//            {
//                openTimeDay: new Date(1970, 0, 1, 16, 0, 0),
//                closeTimeDay: new Date(1970, 0, 1, 23, 0, 0),
//                openTimeNight: null,
//                closeTimeNight: null,
//                closed: false,
//                dayOfWeek: 7
//            }
//
//        ];
//        created.meetTheDescription = "A staple on the Downtown LA foodie scene, Executive Chef Justin Albertson had already put his spin on downtown rooftop restaurant PERCH with dishes like “Little Bunny Frou Frou” before bringing his imagination to the Water Grill. Following the footsteps of other famous seafood chefs who have worked at Water Grill, such as Providence’s Michael Cimarusti, Justin brings his own signature style to the refined stalwart of Water Grill. ";
//        created.primaryImageUrl = "http://ourhistree-prd.s3.amazonaws.com/55777/thumb/ios2xd2b5ca33bd970f641432843370.jpg";
//        created.images = [
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55772/thumb/ios2xc8a76f0aaf5c69951432843234.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55772/c8a76f0aaf5c69951432843234.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55771/thumb/ios2x0a8bc5316d89ffbe1432843211.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55771/0a8bc5316d89ffbe1432843211.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55776/thumb/ios2xd2b5ca33bd970f641432843348.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55776/d2b5ca33bd970f641432843348.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55778/thumb/ios2xd2b5ca33bd970f641432843412.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55778/d2b5ca33bd970f641432843412.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55767/thumb/ios2x1f130a0021cf1c2f1432843171.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55767/1f130a0021cf1c2f1432843171.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55765/thumb/ios2xdea24608eee23ef51432843145.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55765/dea24608eee23ef51432843145.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55775/thumb/ios2xd2b5ca33bd970f641432843337.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55775/d2b5ca33bd970f641432843337.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55761/thumb/ios2x932f4d41894106dc1432843119.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55761/932f4d41894106dc1432843119.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55774/thumb/ios2xd2b5ca33bd970f641432843304.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55774/d2b5ca33bd970f641432843304.jpg"
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/55773/thumb/ios2xd2b5ca33bd970f641432843296.jpg",
//                large: "http://ourhistree-prd.s3.amazonaws.com/55773/d2b5ca33bd970f641432843296.jpg"
//            }
//        ];
//
//        var nearbyRec = RecommendationTransformerService.createRecommendationAdaptor();
//        nearbyRec.id = 3508;
//        nearbyRec.typeId = 2;
//        nearbyRec.name = "Bottega Louie";
//        nearbyRec.lat = "34.0469840";
//        nearbyRec.lng = "-118.2565760";
//        nearbyRec.walkingMinutesFromHotel = null;
//        nearbyRec.drivingMinutesFromHotel = null;
//        nearbyRec.shortDescription = "A chic downtown mainstay, featuring high ceilings and white marble";
//        nearbyRec.primaryImageUrl = "http://ourhistree-prd.s3.amazonaws.com/41979/thumb/ios2xd2b5ca33bd970f641432671380.jpg";
//        nearbyRec.images = [
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41977/thumb/ios2xd2b5ca33bd970f641432671359.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41972/thumb/ios2xd2b5ca33bd970f641432671293.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41971/thumb/ios2xd2b5ca33bd970f641432671279.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41976/thumb/ios2xd2b5ca33bd970f641432671344.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41973/thumb/ios2xd2b5ca33bd970f641432671305.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41974/thumb/ios2xd2b5ca33bd970f641432671315.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41975/thumb/ios2xd2b5ca33bd970f641432671332.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41978/thumb/ios2xd2b5ca33bd970f641432671371.jpg",
//                large: null
//            },
//            {
//                thumb: "http://ourhistree-prd.s3.amazonaws.com/41980/thumb/ios2xd2b5ca33bd970f641432671396.jpg",
//                large: null
//            }
//        ];
//        created.nearby = [nearbyRec];
//
//        var converted = RecommendationTransformerService.fromJSON(apiDetailReturn['r'][0]);
//        expect(converted).toEqual(created);
//    });
//
//    it("should convert OurStay results to RecommendationAdaptor", function () {
//
//        expect(RecommendationTransformerService).toBeDefined();
//
//        var recommendationAdaptor = RecommendationTransformerService.createRecommendationAdaptor();
//        recommendationAdaptor.id = 77;
//        recommendationAdaptor.typeId = 2;
//        recommendationAdaptor.name = "Scarpetta";
//        recommendationAdaptor.url = null;
//        recommendationAdaptor.description = null;
//        recommendationAdaptor.shortDescription = "The spaghetti with tomato and basil is a staple";
//        recommendationAdaptor.lat = "34.0677970";
//        recommendationAdaptor.lng = "-118.3987640";
//        recommendationAdaptor.walkingMinutesFromHotel = 4;
//        recommendationAdaptor.drivingMinutesFromHotel = 2;
//        recommendationAdaptor.primaryImageUrl = "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg";
//        recommendationAdaptor.images = [
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1151\/thumb\/ios2xa5f5a6d563b902ac1403903410.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1152\/thumb\/ios2x73d37e392a7763b31403903411.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1153\/thumb\/ios2xd1e0126cd4879b7b1403903412.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1154\/thumb\/ios2xc67ccdbe38b24db41403903414.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1155\/thumb\/ios2x92ee153db4dd5d591403903415.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1156\/thumb\/ios2xb18aca521a225aac1403903416.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1157\/thumb\/ios2xd91092385d24e9a31403903417.jpg",
//                large: null
//            },
//            {
//                thumb: "http:\/\/ourhistree-prd.s3.amazonaws.com\/1158\/thumb\/ios2xcfbdafd55414536d1403903418.jpg",
//                large: null
//            }
//        ];
//
//        var t1 = RecommendationTransformerService.fromJSON(apiReturn["r"]["data"]);
//        var t2 = [recommendationAdaptor];
//
//        expect(t1).toEqual(t2);
//    });
//
//    it("should handle arrays of objects too, since API returns variations", function () {
//        expect(
//            RecommendationTransformerService.fromJSON(variedApiReturn["r"]["data"]).length
//        ).toEqual(1);
//    });
//});
//
