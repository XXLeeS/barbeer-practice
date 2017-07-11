(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// let Waypoint = require('waypoints/lib/noframework.waypoints');
require('./index.js');

},{"./index.js":2}],2:[function(require,module,exports){
'use strict';

function isInRegion(el, upperBound, lowerBound) {
    return el.getBoundingClientRect().top <= upperBound && el.getBoundingClientRect().top > lowerBound;
}
function isEndRegion(el, lowerBound) {
    return el.getBoundingClientRect().top <= lowerBound;
}
function getOffsetPercent(el, top, bottom) {
    return (top - el.getBoundingClientRect().top) / (top - bottom);
}
function getOffsetTopAbs(el) {
    var offsetTop = 0;
    do {
        if (!isNaN(el.offsetTop)) {
            offsetTop += el.offsetTop;
        }
    } while (el = el.offsetParent);

    return offsetTop;
}

window.addEventListener('scroll', function (e) {
    // beer fixed
    {
        var beer = document.querySelector('#beer');

        var upperBound = 0;
        var lowerBound = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;

        if (isInRegion(document.body, upperBound, lowerBound)) {
            var offset = -(document.body.getBoundingClientRect().top - upperBound);
            beer.style.transform = 'translateY(' + offset + 'px)';
        } else if (isEndRegion(document.body, lowerBound)) {
            beer.style.transform = 'translateY(' + -(lowerBound - upperBound) + 'px)';
        } else {
            beer.removeAttribute('style');
        }
    }

    // banner text merge
    {
        var banner_text = document.querySelector('#banner .text-container');
        var left = banner_text.querySelector('.text--left');
        var right = banner_text.querySelector('.text--right');

        var _upperBound = 150;
        var _lowerBound = 0;
        var _offset = 95;

        if (isInRegion(banner_text, _upperBound, _lowerBound)) {
            left.style.transform = 'translateX(' + _offset * getOffsetPercent(banner_text, _upperBound, _lowerBound) + 'px)';
            right.style.transform = 'translateX(-' + _offset * getOffsetPercent(banner_text, _upperBound, _lowerBound) + 'px)';
        } else if (isEndRegion(banner_text, _lowerBound)) {
            left.style.transform = 'translateX(' + _offset + 'px)';
            right.style.transform = 'translateX(-' + _offset + 'px)';
        } else {
            left.removeAttribute('style');
            right.removeAttribute('style');
        }
    }

    // feature title fade
    {
        var feature_title = document.querySelector('#feature .title');

        var _upperBound2 = 500;
        var _lowerBound2 = 100;
        if (isInRegion(feature_title, _upperBound2, _lowerBound2)) {
            feature_title.style.opacity = getOffsetPercent(feature_title, _upperBound2, _lowerBound2);
        } else if (isEndRegion(feature_title, _lowerBound2)) {
            feature_title.style.opacity = 1;
        } else {
            feature_title.removeAttribute('style');
        }
    }

    // feature beer shadow
    {
        var beer_shadow = document.querySelector('#feature .beer-shadow');

        var _upperBound3 = -getOffsetTopAbs(document.querySelector('#feature')) + 800;
        var _lowerBound3 = -getOffsetTopAbs(document.querySelector('#cheers'));
        var cssTranslateX = 10;

        if (isInRegion(document.body, _upperBound3, _lowerBound3)) {
            var _offset2 = -(document.body.getBoundingClientRect().top - _upperBound3);
            beer_shadow.style.transform = 'translate(' + cssTranslateX + 'px, ' + _offset2 + 'px)';
        } else if (isEndRegion(document.body, _lowerBound3)) {
            // beer_shadow.style.transform = `translate(${cssTranslateX}px, ${offset}px)`;
        } else {
            beer_shadow.removeAttribute('style');
        }
    }

    // feature offsets
    var featureUpperBound = 600;
    var featureLowerBound = 500;
    var featureOffset = 100;
    var featureElements = ['.feature--one .feature__title', '.feature--one .feature__text', '.feature--two .feature__title', '.feature--two .feature__text', '.feature--three .feature__title', '.feature--three .feature__text'];
    featureElements.forEach(function (el, i) {
        var element = document.querySelector('#feature ' + el);

        var upperBound = featureUpperBound + i * 50;
        var lowerBound = featureLowerBound + i * 50;
        // second feature offset another direction
        var offset = i == 2 || i == 3 ? -featureOffset : featureOffset;

        if (isInRegion(element, upperBound, lowerBound)) {
            element.style.transform = 'translateX(' + offset * (1 - getOffsetPercent(element, upperBound, lowerBound)) + 'px)';
            element.style.opacity = getOffsetPercent(element, upperBound, lowerBound);
        } else if (isEndRegion(element, lowerBound)) {
            element.style.transform = 'translateX(0px)';
            element.style.opacity = 1;
        } else {
            element.removeAttribute('style');
        }
    });

    // empty hand moving
    var handCssTranslateX = -525;
    {
        var hand_wrapper = document.querySelector('#cheers .hand-wrapper');

        var _upperBound4 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 400;
        var _lowerBound4 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
        var _offset3 = 150;

        if (isInRegion(document.body, _upperBound4, _lowerBound4)) {
            hand_wrapper.style.transform = 'translateX(' + (handCssTranslateX + _offset3 * getOffsetPercent(document.body, _upperBound4, _lowerBound4)) + 'px)';
        } else if (isEndRegion(document.body, _lowerBound4)) {
            // hand_wrapper.style.transform = `translateX(-375px)`;
        } else {
            hand_wrapper.removeAttribute('style');
        }
    }
    {
        var _hand_wrapper = document.querySelector('#cheers .hand-wrapper');

        var _upperBound5 = -getOffsetTopAbs(document.querySelector('#cheers .block--one')) + 180;
        var _lowerBound5 = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;
        var offsetTopAbs = -getOffsetTopAbs(_hand_wrapper);

        if (isInRegion(document.body, _upperBound5, _lowerBound5)) {
            _hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 1;
            var _offset4 = -(document.body.getBoundingClientRect().top - _upperBound5);
            _hand_wrapper.style.transform = 'translate(-375px, ' + _offset4 + 'px)';
        } else if (isEndRegion(document.body, _lowerBound5)) {
            _hand_wrapper.style.transform = 'translate(-375px, ' + -(_lowerBound5 - _upperBound5) + 'px)';
        } else {
            _hand_wrapper.querySelector('.empty-hand--shadow').style.opacity = 0;
        }
    }

    // another hand cheers
    {
        var another_hand = document.querySelector('#cheers .another-hand');
        var foam = document.querySelector('#cheers .foam');

        var _lowerBound6 = -getOffsetTopAbs(document.querySelector('#cheers .block--two')) + 100;

        if (isEndRegion(document.body, _lowerBound6)) {
            another_hand.classList.remove('back');
            another_hand.classList.add('cheer');
            another_hand.addEventListener("webkitAnimationEnd", function (event) {
                if (event.animationName == 'cheer') {
                    foam.classList.add('show');
                }
            });
        } else {
            another_hand.classList.add('back');
            foam.classList.remove('show');
            another_hand.addEventListener("webkitAnimationEnd", function (event) {
                if (event.animationName == 'back') {
                    another_hand.classList.remove('cheer');
                }
            });
        }
    }

    // foam appear
    // function showFoam(){
    //     let foam = document.querySelector('#cheers .foam');


    // }
    // function hideFoam(){
    //     let foam = document.querySelector('#cheers .foam');
    //     foam.
    // }

    // cheers text fade
    document.querySelectorAll('#cheers .text p').forEach(function (el) {
        var upperBound = 400;
        var lowerBound = 300;

        if (isInRegion(el, upperBound, lowerBound)) {
            el.style.opacity = getOffsetPercent(el, upperBound, lowerBound);
        } else if (isEndRegion(el, lowerBound)) {
            el.style.opacity = 1;
        } else {
            el.removeAttribute('style');
        }
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHNcXGpzXFxhcHAuanMiLCJhc3NldHNcXGpzXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7QUFDQSxRQUFRLFlBQVI7Ozs7O0FDQUEsU0FBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdCLFVBQXhCLEVBQW9DLFVBQXBDLEVBQStDO0FBQzNDLFdBQU8sR0FBRyxxQkFBSCxHQUEyQixHQUEzQixJQUFrQyxVQUFsQyxJQUFnRCxHQUFHLHFCQUFILEdBQTJCLEdBQTNCLEdBQWlDLFVBQXhGO0FBQ0g7QUFDRCxTQUFTLFdBQVQsQ0FBcUIsRUFBckIsRUFBeUIsVUFBekIsRUFBb0M7QUFDaEMsV0FBTyxHQUFHLHFCQUFILEdBQTJCLEdBQTNCLElBQWtDLFVBQXpDO0FBQ0g7QUFDRCxTQUFTLGdCQUFULENBQTBCLEVBQTFCLEVBQThCLEdBQTlCLEVBQW1DLE1BQW5DLEVBQTBDO0FBQ3RDLFdBQU8sQ0FBQyxNQUFNLEdBQUcscUJBQUgsR0FBMkIsR0FBbEMsS0FBMEMsTUFBTSxNQUFoRCxDQUFQO0FBQ0g7QUFDRCxTQUFTLGVBQVQsQ0FBeUIsRUFBekIsRUFBNEI7QUFDeEIsUUFBSSxZQUFZLENBQWhCO0FBQ0EsT0FBRTtBQUNBLFlBQUksQ0FBQyxNQUFNLEdBQUcsU0FBVCxDQUFMLEVBQXlCO0FBQ3JCLHlCQUFhLEdBQUcsU0FBaEI7QUFDSDtBQUNGLEtBSkQsUUFJUSxLQUFLLEdBQUcsWUFKaEI7O0FBTUEsV0FBTyxTQUFQO0FBQ0g7O0FBR0QsT0FBTyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxVQUFDLENBQUQsRUFBTztBQUNyQztBQUNBO0FBQ0ksWUFBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFYOztBQUVBLFlBQUksYUFBYSxDQUFqQjtBQUNBLFlBQUksYUFBYSxDQUFDLGdCQUFnQixTQUFTLGFBQVQsQ0FBdUIscUJBQXZCLENB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LGFBQU4sSUFBdUIsTUFBMUIsRUFBaUM7QUFDN0IsaUNBQWEsU0FBYixDQUF1QixNQUF2QixDQUE4QixPQUE5QjtBQUNIO0FBQ0osYUFKRDtBQUtIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixpQkFBMUIsRUFBNkMsT0FBN0MsQ0FBcUQsVUFBQyxFQUFELEVBQVE7QUFDekQsWUFBSSxhQUFhLEdBQWpCO0FBQ0EsWUFBSSxhQUFhLEdBQWpCOztBQUVBLFlBQUcsV0FBVyxFQUFYLEVBQWUsVUFBZixFQUEyQixVQUEzQixDQUFILEVBQTBDO0FBQ3RDLGVBQUcsS0FBSCxDQUFTLE9BQVQsR0FBbUIsaUJBQWlCLEVBQWpCLEVBQXFCLFVBQXJCLEVBQWlDLFVBQWpDLENBQW5CO0FBQ0gsU0FGRCxNQUVNLElBQUcsWUFBWSxFQUFaLEVBQWdCLFVBQWhCLENBQUgsRUFBK0I7QUFDakMsZUFBRyxLQUFILENBQVMsT0FBVCxHQUFtQixDQUFuQjtBQUNILFNBRkssTUFFRDtBQUNELGVBQUcsZUFBSCxDQUFtQixPQUFuQjtBQUNIO0FBQ0osS0FYRDtBQWNILENBM0xEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGxldCBXYXlwb2ludCA9IHJlcXVpcmUoJ3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzJyk7XHJcbnJlcXVpcmUoJy4vaW5kZXguanMnKTsiLCJcclxuZnVuY3Rpb24gaXNJblJlZ2lvbihlbCwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCl7XHJcbiAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IHVwcGVyQm91bmQgJiYgZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wID4gbG93ZXJCb3VuZDtcclxufVxyXG5mdW5jdGlvbiBpc0VuZFJlZ2lvbihlbCwgbG93ZXJCb3VuZCl7XHJcbiAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIDw9IGxvd2VyQm91bmQ7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0UGVyY2VudChlbCwgdG9wLCBib3R0b20pe1xyXG4gICAgcmV0dXJuICh0b3AgLSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApIC8gKHRvcCAtIGJvdHRvbSk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0T2Zmc2V0VG9wQWJzKGVsKXtcclxuICAgIGxldCBvZmZzZXRUb3AgPSAwO1xyXG4gICAgZG97XHJcbiAgICAgIGlmICghaXNOYU4oZWwub2Zmc2V0VG9wKSl7XHJcbiAgICAgICAgICBvZmZzZXRUb3AgKz0gZWwub2Zmc2V0VG9wO1xyXG4gICAgICB9XHJcbiAgICB9d2hpbGUoIGVsID0gZWwub2Zmc2V0UGFyZW50ICk7XHJcblxyXG4gICAgcmV0dXJuIG9mZnNldFRvcDtcclxufVxyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZSkgPT4ge1xyXG4gICAgLy8gYmVlciBmaXhlZFxyXG4gICAge1xyXG4gICAgICAgIGxldCBiZWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JlZXInKTtcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5ibG9jay0tdHdvJykpICsgMTAwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgbGV0IG9mZnNldCA9IC0oZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB1cHBlckJvdW5kKTtcclxuICAgICAgICAgICAgYmVlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgYmVlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgkey0obG93ZXJCb3VuZCAtIHVwcGVyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGJlZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBiYW5uZXIgdGV4dCBtZXJnZVxyXG4gICAge1xyXG4gICAgICAgIGxldCBiYW5uZXJfdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYW5uZXIgLnRleHQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgbGV0IGxlZnQgPSBiYW5uZXJfdGV4dC5xdWVyeVNlbGVjdG9yKCcudGV4dC0tbGVmdCcpO1xyXG4gICAgICAgIGxldCByaWdodCA9IGJhbm5lcl90ZXh0LnF1ZXJ5U2VsZWN0b3IoJy50ZXh0LS1yaWdodCcpO1xyXG5cclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IDE1MDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IDk1O1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGJhbm5lcl90ZXh0LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGxlZnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQqZ2V0T2Zmc2V0UGVyY2VudChiYW5uZXJfdGV4dCwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCl9cHgpYDtcclxuICAgICAgICAgICAgcmlnaHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7b2Zmc2V0KmdldE9mZnNldFBlcmNlbnQoYmFubmVyX3RleHQsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpfXB4KWA7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oYmFubmVyX3RleHQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgbGVmdC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgICAgICAgICByaWdodC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGVmdC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJpZ2h0LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZmVhdHVyZSB0aXRsZSBmYWRlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGZlYXR1cmVfdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmVhdHVyZSAudGl0bGUnKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IDUwMDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IDEwMDtcclxuICAgICAgICBpZihpc0luUmVnaW9uKGZlYXR1cmVfdGl0bGUsIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgZmVhdHVyZV90aXRsZS5zdHlsZS5vcGFjaXR5ID0gZ2V0T2Zmc2V0UGVyY2VudChmZWF0dXJlX3RpdGxlLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihmZWF0dXJlX3RpdGxlLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGZlYXR1cmVfdGl0bGUuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGZlYXR1cmVfdGl0bGUucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmZWF0dXJlIGJlZXIgc2hhZG93XHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGJlZXJfc2hhZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZlYXR1cmUgLmJlZXItc2hhZG93JylcclxuXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmZWF0dXJlJykpICsgODAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gLWdldE9mZnNldFRvcEFicyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzJykpO1xyXG4gICAgICAgIGxldCBjc3NUcmFuc2xhdGVYID0gMTA7XHJcblxyXG4gICAgICAgIGlmKGlzSW5SZWdpb24oZG9jdW1lbnQuYm9keSwgdXBwZXJCb3VuZCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gLShkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIHVwcGVyQm91bmQpO1xyXG4gICAgICAgICAgICBiZWVyX3NoYWRvdy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7Y3NzVHJhbnNsYXRlWH1weCwgJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihkb2N1bWVudC5ib2R5LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIC8vIGJlZXJfc2hhZG93LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtjc3NUcmFuc2xhdGVYfXB4LCAke29mZnNldH1weClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBiZWVyX3NoYWRvdy5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGZlYXR1cmUgb2Zmc2V0c1xyXG4gICAgbGV0IGZlYXR1cmVVcHBlckJvdW5kID0gNjAwO1xyXG4gICAgbGV0IGZlYXR1cmVMb3dlckJvdW5kID0gNTAwO1xyXG4gICAgbGV0IGZlYXR1cmVPZmZzZXQgPSAxMDA7XHJcbiAgICBsZXQgZmVhdHVyZUVsZW1lbnRzID0gWycuZmVhdHVyZS0tb25lIC5mZWF0dXJlX190aXRsZScsICcuZmVhdHVyZS0tb25lIC5mZWF0dXJlX190ZXh0JyxcclxuICAgICAgICAnLmZlYXR1cmUtLXR3byAuZmVhdHVyZV9fdGl0bGUnLCAnLmZlYXR1cmUtLXR3byAuZmVhdHVyZV9fdGV4dCcsXHJcbiAgICAgICAgJy5mZWF0dXJlLS10aHJlZSAuZmVhdHVyZV9fdGl0bGUnLCAnLmZlYXR1cmUtLXRocmVlIC5mZWF0dXJlX190ZXh0J107XHJcbiAgICBmZWF0dXJlRWxlbWVudHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmZWF0dXJlICR7ZWx9YCk7XHJcblxyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gZmVhdHVyZVVwcGVyQm91bmQgKyBpKjUwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gZmVhdHVyZUxvd2VyQm91bmQgKyBpKjUwO1xyXG4gICAgICAgIC8vIHNlY29uZCBmZWF0dXJlIG9mZnNldCBhbm90aGVyIGRpcmVjdGlvblxyXG4gICAgICAgIGxldCBvZmZzZXQgPSAoaT09Mnx8aT09MykgPyAtZmVhdHVyZU9mZnNldCA6IGZlYXR1cmVPZmZzZXQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaXNJblJlZ2lvbihlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXQqKDEtZ2V0T2Zmc2V0UGVyY2VudChlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl9cHgpYDtcclxuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gZ2V0T2Zmc2V0UGVyY2VudChlbGVtZW50LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTsgXHJcbiAgICAgICAgfWVsc2UgaWYoaXNFbmRSZWdpb24oZWxlbWVudCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKDBweClgO1xyXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG5cclxuICAgIC8vIGVtcHR5IGhhbmQgbW92aW5nXHJcbiAgICBsZXQgaGFuZENzc1RyYW5zbGF0ZVggPSAtNTI1O1xyXG4gICAge1xyXG4gICAgICAgIGxldCBoYW5kX3dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5oYW5kLXdyYXBwZXInKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgdXBwZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLW9uZScpKSArIDQwMDtcclxuICAgICAgICBsZXQgbG93ZXJCb3VuZCA9IC1nZXRPZmZzZXRUb3BBYnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuYmxvY2stLW9uZScpKSArIDE4MDtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gMTUwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGRvY3VtZW50LmJvZHksIHVwcGVyQm91bmQsIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7aGFuZENzc1RyYW5zbGF0ZVggKyBvZmZzZXQqZ2V0T2Zmc2V0UGVyY2VudChkb2N1bWVudC5ib2R5LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKX1weClgO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRW5kUmVnaW9uKGRvY3VtZW50LmJvZHksIGxvd2VyQm91bmQpKXtcclxuICAgICAgICAgICAgLy8gaGFuZF93cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0zNzVweClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBoYW5kX3dyYXBwZXIucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHtcclxuICAgICAgICBsZXQgaGFuZF93cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuaGFuZC13cmFwcGVyJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHVwcGVyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS1vbmUnKSkgKyAxODA7XHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS10d28nKSkgKyAxMDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFRvcEFicyA9IC1nZXRPZmZzZXRUb3BBYnMoaGFuZF93cmFwcGVyKTtcclxuXHJcbiAgICAgICAgaWYoaXNJblJlZ2lvbihkb2N1bWVudC5ib2R5LCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuZW1wdHktaGFuZC0tc2hhZG93Jykuc3R5bGUub3BhY2l0eSA9IDE7XHJcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAtKGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gdXBwZXJCb3VuZCk7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0zNzVweCwgJHtvZmZzZXR9cHgpYDtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihkb2N1bWVudC5ib2R5LCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGhhbmRfd3JhcHBlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKC0zNzVweCwgJHstKGxvd2VyQm91bmQgLSB1cHBlckJvdW5kKX1weClgO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBoYW5kX3dyYXBwZXIucXVlcnlTZWxlY3RvcignLmVtcHR5LWhhbmQtLXNoYWRvdycpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBhbm90aGVyIGhhbmQgY2hlZXJzXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IGFub3RoZXJfaGFuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjaGVlcnMgLmFub3RoZXItaGFuZGApO1xyXG4gICAgICAgIGxldCBmb2FtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NoZWVycyAuZm9hbScpOyAgICBcclxuXHJcbiAgICAgICAgbGV0IGxvd2VyQm91bmQgPSAtZ2V0T2Zmc2V0VG9wQWJzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaGVlcnMgLmJsb2NrLS10d28nKSkgKyAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaXNFbmRSZWdpb24oZG9jdW1lbnQuYm9keSwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuY2xhc3NMaXN0LnJlbW92ZSgnYmFjaycpO1xyXG4gICAgICAgICAgICBhbm90aGVyX2hhbmQuY2xhc3NMaXN0LmFkZCgnY2hlZXInKTtcclxuICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihldmVudC5hbmltYXRpb25OYW1lID09ICdjaGVlcicpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvYW0uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgYW5vdGhlcl9oYW5kLmNsYXNzTGlzdC5hZGQoJ2JhY2snKTtcclxuICAgICAgICAgICAgZm9hbS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGFub3RoZXJfaGFuZC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoZXZlbnQuYW5pbWF0aW9uTmFtZSA9PSAnYmFjaycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFub3RoZXJfaGFuZC5jbGFzc0xpc3QucmVtb3ZlKCdjaGVlcicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9hbSBhcHBlYXJcclxuICAgIC8vIGZ1bmN0aW9uIHNob3dGb2FtKCl7XHJcbiAgICAvLyAgICAgbGV0IGZvYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5mb2FtJyk7XHJcblxyXG5cclxuICAgIC8vIH1cclxuICAgIC8vIGZ1bmN0aW9uIGhpZGVGb2FtKCl7XHJcbiAgICAvLyAgICAgbGV0IGZvYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hlZXJzIC5mb2FtJyk7XHJcbiAgICAvLyAgICAgZm9hbS5cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjaGVlcnMgdGV4dCBmYWRlXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjY2hlZXJzIC50ZXh0IHAnKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGxldCB1cHBlckJvdW5kID0gNDAwO1xyXG4gICAgICAgIGxldCBsb3dlckJvdW5kID0gMzAwO1xyXG5cclxuICAgICAgICBpZihpc0luUmVnaW9uKGVsLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKSl7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSBnZXRPZmZzZXRQZXJjZW50KGVsLCB1cHBlckJvdW5kLCBsb3dlckJvdW5kKTtcclxuICAgICAgICB9ZWxzZSBpZihpc0VuZFJlZ2lvbihlbCwgbG93ZXJCb3VuZCkpe1xyXG4gICAgICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgXHJcbn0pO1xyXG5cclxuIl19
