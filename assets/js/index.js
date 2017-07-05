
function isInRegion(el, upperBound, lowerBound){
    return el.getBoundingClientRect().top < upperBound && el.getBoundingClientRect().top > lowerBound;
}
function isEndRegion(el, lowerBound){
    return el.getBoundingClientRect().top < lowerBound;
}
function getOffsetPercent(el, top, bottom){
    return (top - el.getBoundingClientRect().top) / (top - bottom);
}
function getOffsetLeft( elem ){
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}


window.addEventListener('scroll', (e) => {
    // beer fixed
    {
        let beer = document.querySelector('#beer');

        let upperBound = -100;
        let lowerBound = -(document.querySelector('#cheers .block--two').offsetTop + 
                        document.querySelector('#cheers').offsetTop);

        if(isInRegion(document.body, upperBound, lowerBound)){
            let offset = -(document.body.getBoundingClientRect().top - upperBound);
            beer.style.transform = `translateY(${offset}px)`;
        }else if(isEndRegion(document.body, lowerBound)){
            beer.style.transform = `translateY(${-(lowerBound - upperBound)}px)`;
        }else{
            beer.removeAttribute('style');
        }
    }

    // banner text merge
    {
        let banner_text = document.querySelector('#banner .text-container');
        let left = banner_text.querySelector('.text--left');
        let right = banner_text.querySelector('.text--right');

        let upperBound = -20;
        let lowerBound = -150;
        let offset = 100;

        if(isInRegion(banner_text, upperBound, lowerBound)){
            left.style.transform = `translateX(${offset*getOffsetPercent(banner_text, upperBound, lowerBound)}px)`;
            right.style.transform = `translateX(-${offset*getOffsetPercent(banner_text, upperBound, lowerBound)}px)`;
        }else if(isEndRegion(banner_text, lowerBound)){
            left.style.transform = `translateX(${offset}px)`;
            right.style.transform = `translateX(-${offset}px)`;
        }else{
            left.removeAttribute('style');            
            right.removeAttribute('style');            
        }
    }

    // feature title fade
    {
        let feature_title = document.querySelector('#feature .title');
        
        let upperBound = 500;
        let lowerBound = 100;
        if(isInRegion(feature_title, upperBound, lowerBound)){
            feature_title.style.opacity = getOffsetPercent(feature_title, upperBound, lowerBound);
        }else if(isEndRegion(feature_title, lowerBound)){
            feature_title.style.opacity = 1;
        }else{
            feature_title.removeAttribute('style');            
        }
    }

    // feature offsets
    let featureUpperBound = 600;
    let featureLowerBound = 500;
    let featureOffset = 100;
    let featureElements = ['.feature--one .feature__title', '.feature--one .feature__text',
        '.feature--two .feature__title', '.feature--two .feature__text',
        '.feature--three .feature__title', '.feature--three .feature__text'];
    featureElements.forEach((el, i) => {
        let element = document.querySelector(`#feature ${el}`);

        // second feature offset another direction
        let upperBound = featureUpperBound + i*50;
        let lowerBound = featureLowerBound + i*50;
        let offset = (i==2||i==3) ? -featureOffset : featureOffset;
        
        if(isInRegion(element, upperBound, lowerBound)){
            element.style.transform = `translateX(${offset*(1-getOffsetPercent(element, upperBound, lowerBound))}px)`;
            element.style.opacity = getOffsetPercent(element, upperBound, lowerBound); 
        }else if(isEndRegion(element, lowerBound)){
            element.style.transform = `translateX(0px)`;
            element.style.opacity = 1;
        }else{
            element.removeAttribute('style');
        }
    });
    

    
});
