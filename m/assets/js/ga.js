let globalTimer;
let isCounting = false;
function countThenSend(pageName){
    if(!isCounting){
        isCounting = true;
        globalTimer = setTimeout(() => { sendPageView(pageName) }, 800);
    }
}
function stopCount(){
    clearTimeout(globalTimer);
    isCounting = false;
}

function sendPageView(pageName){
    ga('send', {
        hitType: 'pageview',
        page: pageName
    });
}

function isInBlock(el){
    return el.getBoundingClientRect().top <= 200 && el.getBoundingClientRect().top > -(el.offsetHeight-200);
}
let data = [
    {
        dom: document.getElementById('banner'),
        pageName: 'Bar Beer子網01-主視覺',
    },
    {
        dom: document.getElementById('feature'),
        pageName: 'Bar Beer子網02-商品特色',
    },
    {
        dom: document.querySelector('#cheers .block--one'),
        pageName: 'Bar Beer子網03-一個人',
    },
    {
        dom: document.querySelector('#cheers .block--two'),
        pageName: 'Bar Beer子網04-一群人',
    },
    {
        dom: document.getElementById('campaign'),
        pageName: 'Bar Beer子網-近期活動',
    },
    {
        dom: document.getElementById('lineup'),
        pageName: 'Bar Beer子網-系列商品',
    },
    {
        dom: document.getElementById('tvcm'),
        pageName: 'Bar Beer子網-電視廣告',
    },
]

let currentBlock = 0;
countThenSend('Bar Beer子網01-主視覺');
window.addEventListener('scroll', function(){
    data.forEach((el, i) => {
        if(isInBlock(el.dom)){
            if(i != currentBlock){
                stopCount();
                currentBlock = i;
            }
            countThenSend(el.pageName);
        }
    })
})

document.querySelector('#banner .share').onclick = function(){
    ga('send', {
        hitType: 'event',
        eventCategory: '分享Bar Beer子網',
        eventAction: '點選',
        eventLabel: 'Bar Beer子網'
    })
}

document.querySelector('#campaign .button').onclick = function(event){
    event.preventDefault();

    let link = this.href;
    ga('send', {
        hitType: 'event',
        eventCategory: '前往近期活動-[Show Girl 服裝設計比賽]',
        eventAction: '點選',
        eventLabel: 'Bar Beer子網',
        hitCallback: function(){
            window.location = link;
        }
    });
}

document.querySelectorAll('#tvcm .cm').forEach((el) => {
    let videoName = el.querySelector('.cm__name').innerHTML;

    el.onclick = function(event){
        ga('send', {
            hitType: 'event',
            eventCategory: `觀看TVC-[${videoName}]`,
            eventAction: '播放',
            eventLabel: 'Bar Beer子網',
        });
    }
})

document.querySelectorAll('#social .link-btn').forEach((el) => {
    let socialName = el.querySelector('img').getAttribute('alt');

    el.onclick = function(event){
        ga('send', {
            hitType: 'event',
            eventCategory: `前往社群-[${socialName}]`,
            eventAction: '點選',
            eventLabel: 'Bar Beer子網',
        });
    }
})
