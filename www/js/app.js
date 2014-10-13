// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('starter', ['ionic', 'ngCordova']).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('MapCtrl', function ($scope, $cordovaGeolocation, $location, $ionicScrollDelegate, $http, $ionicPopup, $timeout, $ionicSideMenuDelegate, $ionicLoading, $compile) {
    $scope.devList = [
        {text: "General", checked: true},
        {text: "Museum", checked: true},
        {text: "Sightseeing", checked: true},
        {text: "Theaters", checked: true},
        {text: "Art", checked: true},
        {text: "Spiritual Monuments", checked: true},
        {text: "Education", checked: true},
        {text: "Entertainment", checked: true},
        {text: "Parks", checked: true}
    ];
    $scope.by = {means: 'TRANSIT'};
    $scope.helper = {t: true};
    $scope.destList = [
        {type: 'General', list: [], icon: "img/misc.png", showList: false},
        {type: 'Museum', list: [], icon: "img/museum.png", showList: false},
        {type: 'Sightseeing', list: [], icon: "img/sights.png", showList: false},
        {type: 'Theaters', list: [], icon: "img/theater.png", showList: false},
        {type: 'Art', list: [], icon: "img/art.png", showList: false},
        {type: 'Spiritual Monuments', list: [], icon: "img/church.png", showList: false},
        {type: 'Education', list: [], icon: "img/education.png", showList: false},
        {type: 'Entertainment', list: [], icon: "img/entertainment.png", showList: false},
        {type: 'Parks', list: [], icon: "img/park.png", showList: false}
    ];
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    $scope.toggler = function () {
        $scope.devList.forEach(function (dest) {
            dest.checked = $scope.helper.t;
        });
    };
    $scope.deleteMarkers = function (list) {
        list.forEach(function (i) {
            i.marker.setMap(null);
        });
    };

    $scope.getResults = function () {
        var send = [];
        $scope.devList.forEach(function (dest) {
            if (dest.checked)
                send.push(dest.text);
        });
        var req = "http://62.217.125.30/~ellakuser/master/index.php/crawl_apis/data/lat/";
        req += $scope.position.lat() + "/long/" + $scope.position.lng() + "/categories/";
        req += send.join("_");

        $http.get(req).
                success(function (data, status, headers, config) {
                    data = data.results;
                    // first : empty the lists, delete markerrs
                    $scope.destList.forEach(function (i) {
                        $scope.deleteMarkers(i.list);
                        i.list = [];
                    });
                    var L = $scope.devList, item, D = $scope.destList;
                    // second: results to correct category
                    // for museum
                    if (L[1].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/museum/i) != -1) {
                                D[1].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[1], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for sightseeing
                    if (L[2].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/sight/i) != -1 ||
                                    item.search(/landmark/i) != -1 ||
                                    item.search(/historic/i) != -1) {
                                D[2].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[2], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for theaters
                    if (L[3].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/theater/i) != -1 ||
                                    item.search(/house/i) != -1 ||
                                    item.search(/hall/i) != -1) {
                                D[3].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[3], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for art
                    if (L[4].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/art/i) != -1) {
                                D[4].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[4], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for spiritual mon
                    if (L[5].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/church/i) != -1 ||
                                    item.search(/temple/i) != -1) {
                                D[5].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[5], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for education
                    if (L[6].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/library/i) != -1 ||
                                    item.search(/cultural/i) != -1 ||
                                    item.search(/book/i) != -1) {
                                D[6].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[6], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for entertainment
                    if (L[7].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/enter/i) != -1 ||
                                    item.search(/theme/i) != -1 ||
                                    item.search(/casino/i) != -1 ||
                                    item.search(/night/i) != -1 ||
                                    item.search(/play/i) != -1) {
                                D[7].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[7], data[j]);
                                data[j] = null;
                            }
                        }
                    }
                    // for parks
                    if (L[8].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            item = data[j].category;
                            if (item.search(/park/i) != -1 ||
                                    item.search(/square/i) != -1) {
                                D[8].list.push(data[j]);
                                // place a marker
                                $scope.newMarker(D[8], data[j]);
                                data[j] = null;
                            }
                        }
                    }// for general
                    if (L[0].checked) {
                        for (var j = 0; j < data.length; j++) {
                            if (data[j] == null)
                                continue;
                            D[0].list.push(data[j]);
                            // place a marker
                            $scope.newMarker(D[0], data[j]);
                            data[j] = null;
                        }
                    }
                    $ionicLoading.hide();
                }).
                error(function (data, status, headers, config) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Something went horribly wrong :(',
                        template: status
                    });
                });
    }
    var previnfo;
    $scope.newMarker = function (i, x) {
        x.infow = new google.maps.InfoWindow();
        x.marker = new google.maps.Marker({
            position: new google.maps.LatLng(x.lat, x.long),
            map: $scope.map,
            icon: i.icon
        });
        var content = '<a href="" ng-click="openRight(\'' + x.lat + '\')"><strong>' + x.name + '</strong></a>';
        var compiled = $compile(content)($scope);
        x.infow.setContent(compiled[0]);
        x.opened = false;
        google.maps.event.addListener(x.marker, 'mousedown', function () {
        		if(previnfo){
        				previnfo.close();
        			}
        		x.infow.open($scope.map, this);
            $scope.markerEvent(i, x);
            previnfo = x.infow;
        });
    };
    $scope.markerEvent = function (a, b) {
        $scope.destList.forEach(function (l) {
            l.showList = false;
            l.list.forEach(function (it) {
                it.opened = false;
            });
        });
        a.showList = true;
        b.opened = true;
        //b.infow.open($scope.map, b.marker);
    };

    $scope.onMap = function (list) {
        $scope.map.setCenter(new google.maps.LatLng(list.lat, list.long));
        list.infow.open($scope.map, list.marker);
        $scope.map.setZoom(17);
    };

    function initialize() {
        var myLatlng = new google.maps.LatLng(37.9908372, 23.7383394);

        var mapOptions = {
            center: myLatlng,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map((document.getElementById('map_canvas')), mapOptions);
        var input = document.getElementById('pac-input');

        var auto_options = {
            types: ['(regions)'],
            componentRestrictions: {country: "gr"}
        };

        var autocomplete = new google.maps.places.Autocomplete(input, auto_options);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29),
            draggable: true
        });
        google.maps.event.addListener(marker, 'dragend', function (evt) {
            var x = evt.latLng.lat();
            var y = evt.latLng.lng();
            $scope.position = new google.maps.LatLng(x, y);
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            $scope.position = place.geometry.location;
            $scope.position.k -= 0.000000527264;
            $scope.position.B -= 0.000001245434;

            $scope.loading = $ionicLoading.show({
                content: 'Getting location...',
                showBackdrop: true
            });
            $scope.getResults();

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setIcon(/** @type {google.maps.Icon} */({
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }

            infowindow.setContent('<div><strong>' + place.name + '</strong></div>');
            infowindow.open(map, marker);
        });

        $scope.map = map;
        $scope.marker = marker;
        $scope.infowindow = infowindow;
        $scope.mapOptions = mapOptions;
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap($scope.map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

    $scope.calcRoute = function (list) {
        if (!$scope.position) {
            var alertPopup = $ionicPopup.alert({
                title: 'Not so fast',
                template: 'Specify a start point by searching a region or by using the "Track Me" button .'
            });
            alertPopup.then(function (res) {
            });
            return;
        } else {
            var inner = '<ion-radio ng-model="by.means" value="DRIVING" selected>Driving</ion-radio><ion-radio ng-model="by.means" value="TRANSIT">Transit</ion-radio><ion-radio ng-model="by.means" value="WALKING">Walking</ion-radio>';
            var myPopup = $ionicPopup.show({
                template: inner,
                title: 'Enter means of transport',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>GO</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.by.means) {
                                e.preventDefault();
                            }
                            return $scope.by.means;
                        }
                    },
                ]
            });
            myPopup.then(function (res) {
                if (!$scope.by.means)
                    return;
                var request = {
                    origin: $scope.position,
                    destination: new google.maps.LatLng(list.lat, list.long),
                    travelMode: google.maps.TravelMode[res]
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    }
                });
            });
        }
    }
    $scope.replay = function () {
        $timeout(function () {
            if ($ionicSideMenuDelegate.isOpenLeft()) {
                $scope.replay();
            }
            else {
                if ($scope.position) {
                    $scope.loading = $ionicLoading.show({
                        content: 'Getting current location...',
                        showBackdrop: true
                    });
                    $scope.getResults();
                }
            }
            return;
        }, 400);
    };

    $scope.openRight = function (id) {
        $ionicSideMenuDelegate.toggleRight();
        //scroll
        $location.hash(id);
        $ionicScrollDelegate.anchorScroll(true);
    }

    $scope.geoLocate = function () {
        if (!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });
        var geoMarker;
        $cordovaGeolocation.getCurrentPosition().then(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
            $scope.position = pos;
            var infow = new google.maps.InfoWindow();
            geoMarker = new google.maps.Marker({
                position: pos,
                map: $scope.map,
                anchorPoint: new google.maps.Point(0, -29),
                draggable: true
            });
            geoMarker.setIcon(/** @type {google.maps.Icon} */({
                url: "img/geo.png",
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            }));
            google.maps.event.addListener(geoMarker, 'dragend', function (evt) {
                var x = evt.latLng.lat();
                var y = evt.latLng.lng();
                $scope.position = new google.maps.LatLng(x, y);
            });
            infow.setContent('<div>You are Here!</div>');
            infow.open($scope.map, geoMarker);
            if ($scope.infowindow) {
                $scope.infowindow.close();
                $scope.infowindow = infow;
            }
            if ($scope.marker) {
                $scope.marke.setVisible(false);
                $scope.marker = geoMarker;
            }

            $scope.map.setCenter(pos);
            $scope.getResults();
        }, function (error) {
        		$ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Oh no !',
                template: '1. Geolocation failed <br>2. Blame google .'
            });            
        });
    };

    $timeout(function () {
        $ionicSideMenuDelegate.canDragContent(false);
    }, 1000);
});
