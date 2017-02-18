var sliderTime = 3000;
angular.module('website', ['ngAnimate', 'ngTouch'])
    .controller('sliderCtrl', function ($scope, $interval) {
        $scope.slides = [
            {image: 'images/image01.png', description: 'Maquillaje 1'},
            {image: 'images/image02.png', description: 'Maquillaje 2'},
            {image: 'images/image03.png', description: 'Maquillaje 3'},
            {image: 'images/image04.png', description: 'Maquillaje 4'},
            {image: 'images/image05.png', description: 'Maquillaje 5'}
        ];

        $interval.c
        $scope.direction = 'left';
        $scope.currentIndex = 0;
        $scope.auto = null;
        $scope.createInterval = function () {
            $scope.auto = $interval(function () {
            $scope.prevSlide(false);
            }, sliderTime);
        }

        $scope.setCurrentSlideIndex = function (index, stop=true) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
            if (stop)
                $interval.cancel ($scope.auto);
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function (stop=true) {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
            if (stop)
                $interval.cancel ($scope.auto);
        };

        $scope.nextSlide = function (stop=true) {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
            if (stop)
                $interval.cancel ($scope.auto);
        };
        $scope.createInterval();
    })

    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width()
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });