$(document).ready(function(){
    //만약 접속하고 있는 기기의 가로크기가 480초과일 시 menu영역이 보이고, 480이하이면 메뉴영역 숨김
    var winWidth=$(window).width();
    if(winWidth>480){
        $('header .menu').show();
        $('.mo-menu').hide();
    }else{
        $('header .menu').hide();
        $('.mo-menu').hide();
    }

    $('.sitemap').hide();
    $('header .menu-btn').click(function(){
        if(winWidth>=1600){
            $(this).toggleClass('active');
            $('header .menu-btn span').css('background-color','#fff');
            $('header .menu-btn').css('background-color','#f40000');
            //sitemap연결
            $('.sitemap').show();
        }
    });
    // $('header .menu-btn').click(function(){
    //     $(this).toggleClass('active');
    //     $('header .menu-btn span').css('background-color','#f40000');
    //     $('header .menu-btn').css('background-color','#fff');
    //     // site close를 클릭하면sitemap 사라짐
    //     $('.sitemap').hide();
    // });
    //mo-close를 클릭하면 mo-menu영역 사라짐
    // $('.mo-close').click(function(){
    //     $('.mo-menu').hide();
    // });

    //모바일버전 mo-nav 아코디언 메뉴*/
    $('.mo-nav .sub').hide();
    $('.mo-nav > ul > li').click(function(){
        //만약 클릭한 메뉴에 active가 설정되어 있지 않다면
        if($(this).attr('class') != 'active'){
            //.mo-nav의 모든 주메뉴에 active 클래스 제거
            $('.mo-nav > ul > li').removeClass('active');
            //클릭한 메뉴에만 active클래스 추가
            $(this).addClass('active');
            //모든 서브메뉴 숨김
            $('.mo-nav .sub').slideUp();
            //클릭한 메뉴의 서브메뉴만 나타남
            $(this).find('.sub').slideToggle();
        //클릭한 메뉴에 active가 설정되어 있다면
        }else{
            //클릭한 메뉴에서 active 클래스 제거
            $(this).removeClass('active');
            //클릭한 메뉴의 서브메뉴 숨김
            $(this).find('.sub').slideUp();
        }
    });
    //메인 슬라이드
    //인덱스 번호를 나타내는 변수 선언 및 초기화
    var num=0;
    //왼쪽 이미지의 총개수를 읽어서 total변수에 저장
    var total=$('.photo').length;
    //왼쪽 이미지의 높이를 읽어서 imgHeight변수에 저장
    var imgHeight=$('.photo').height();
    console.log(imgHeight);



    //만약 접속한 기기의 가로길이가 1600이상이면 양쪽 슬라이드 실행, 1600 미만이면 모바일 슬라이드(한쪽 슬라이드) 실행
    if(winWidth>=1600){
        //pc버전 슬라이드
        
    //왼쪽 이미지 영역 - 첫번째 이미지가 보임
        $('.photo').css('z-index',1);
        $('.p1').css('z-index',5);
        //가운데 이미지 영역 - 첫번째 이미지만 보임
        $('.small').hide();
        $('.small:first').show();
        //오른쪽 글자 영역 - 첫번째 글자들만 보임
        $('.txt').removeClass('active').hide();
        $('.txt:first').show().addClass('active');
        //number(숫자)영역 - 첫번째 숫자만 보임
        $('.number a').hide();
        $('.number a:first').show();

        //next-btn버튼 클릭하면 왼쪽 이미지가 위로 올라옴
        $('.next-btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,10000);
            barfn();
            //이미지의 인덱스 번호를 1씩 증가
            num++;
            //이미지의 인덱스 번호가 이미지의 총개수보다 같거나 크면 0으로 초기화
            if(num>=total) {num=0;}
            console.log(num);
            //왼쪽 이미지의 개수만큼 반복
            $('.photo').each(function(){
                //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
                var imgNum=$(this).index();
                //만약 num값과 imgNum값이 같으면
                if(num==imgNum){
                    //모든 이미지는 순서를 뒤로 함.
                    $('.photo').css('z-index',1);
                    //imgNum 인덱스번호에 해당하는 이미지 이동
                    $(this).css({'top':imgHeight,'z-index':5});
                    $(this).animate({'top':0},700,"easeOutExpo");
                    $(this).prev().css('z-index',3);
                }
            });
            //가운데 이미지의 개수만큼 반복
            $('.small').each(function(){
                //가운데 이미지의 인덱스번호를 centerNum변수에 저장
                var centerNum=$(this).index();
                //만약 num값과 centerNum값이 같다면
                if(num==centerNum){
                    //모든 가운데 이미지 안보임
                    $('.small').fadeOut();
                    $(this).fadeIn();
                }
            });
            //number(숫자)의 개수만큼 반복
            $('.number a').each(function(){
                //숫자(a태그)의 인덱스 번호를 aNum변수에 저장
                var aNum=$(this).index();
                //만약 num값과 aNum값이 같으면
                if(num==aNum){
                    //모든 숫자 안보임
                    $('.number a').hide();
                    //현재 숫자만 보임
                    $(this).show();
                }
            });
            //txt영역 글자 애니메이션
            $('.txt').each(function(){
                //txt영역의 인덱스 번호를 txtNum변수에 저장
                var txtNum=$(this).index();
                //만약 num값과 txtNum값이 같다면
                if(num==txtNum){
                    $('.txt').removeClass('active').hide();
                    $(this).show().addClass('active');
                }
            });
        });
        //prev 버튼 클릭하면 왼쪽 이미지가 아래로 내려옴
        $('.prev-btn').click(function(){
            clearInterval(auto);
            auto=setInterval(movefn,10000);
            barfn();
            //이미지의 인덱스 번호를 1씩 감소
            num--;
            //이미지의 인덱스 번호가 0보다 작으면 total-1로 초기화, 인덱스번호가 0부터 시작하기 때문
            if(num<0) {num=total-1;}
            console.log(num);
            //왼쪽 이미지의 개수만큼 반복
            $('.photo').each(function(){
                //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
                var imgNum=$(this).index();
                //만약 num값과 imgNum값이 같으면
                if(num==imgNum){
                    //모든 이미지는 순서를 앞으로 함.
                    //$('.photo').css('z-index',1);
                    //imgNum 인덱스번호에 해당하는 이미지 이동
                    $(this).next().css('z-index',1);
                    $(this).prev().css('z-index',3);
                    $(this).css({'top':-imgHeight,'z-index':5});
                    $(this).animate({'top':0},700,"easeOutExpo");
                }
            });
                    //가운데 이미지의 개수만큼 반복
        $('.small').each(function(){
            //가운데 이미지의 인덱스번호를 centerNum변수에 저장
            var centerNum=$(this).index();
            //만약 num값과 centerNum값이 같다면
            if(num==centerNum){
                //모든 가운데 이미지 안보임
                $('.small').fadeOut();
                $(this).fadeIn();
            }
        });
        //number(숫자)의 개수만큼 반복
        $('.number a').each(function(){
            //숫자(a태그)의 인덱스 번호를 aNum변수에 저장
            var aNum=$(this).index();
            //만약 num값과 aNum값이 같으면
            if(num==aNum){
                //모든 숫자 안보임
                $('.number a').hide();
                //현재 숫자만 보임
                $(this).show();
            }
        });
        //txt영역 글자 애니메이션
        $('.txt').each(function(){
            //txt영역의 인덱스 번호를 txtNum변수에 저장
            var txtNum=$(this).index();
            //만약 num값과 txtNum값이 같다면
            if(num==txtNum){
                $('.txt').removeClass('active').hide;
                $(this).show().addClass('active');
            }
        });
    });
        //10초마다 자동으로 실행(10초마다 movefn함수 호출)
        var auto=setInterval(movefn, 10000);
        //함수선언
        function movefn(){
            $('.next-btn').trigger('click');
            barfn();
        }
        //함수선언
        function barfn(){
            $('.bar').stop();
            $('.bar').css('width',0);
            //slide-bar 안에 자식객체 bar의 가로길이 길어짐
            $('.bar').stop().animate({'width':'100%'},9500);
        }
        //함수호출
        barfn();
        //box영역(.box-hover에 마우스 오버 시 .box-move가 살짝 이동함)
        $('.box ul li').mouseover(function(){
            //0~50사이의 무작위 수 발생
            var x=Math.ceil(Math.random()*50);
            var y=Math.ceil(Math.random()*50);
            $(this).find('.box-move').stop().animate({'left':x, 'top':y},1000);
    
        });
        //box-btn 클릭 시 오른쪽 3개의 이미지가 이동함
        var sw=0;
        //.box ul의 길이 /2한 값을 ulMove변수에 저장
        var ulMove=Math.ceil($('.box ul').width()/2);
        $('.box-btn').click(function(e){
            e.preventDefault();
            //만약 sw값이 0이면
            e.preventDefault();
            if(sw==0){
                sw=1;
                $('.box-btn').css('background-position','left center');
                $('.box ul').stop().animate({left:-ulMove},700,'easeInOutExpo');
            }else{
                sw=0;
                $('.box-btn').css('background-position','right center');
                $('.box ul').stop().animate({left:0},700,'easeInOutExpo');
            }
        });
        //fullpage
        $('#fullpage').fullpage({
            //fullpage의 동그란 메뉴 사용
            navigation: true,
            //fullpage의 동그란 메뉴 위치를 화면 왼쪽으로 설정
            navigationPosition:'left',
            //fullpage의 동그란 메뉴에 메뉴이름 설정
            navigationTooltips:['MAIN','MENU','COMMUNITY','FRANCHISE'],
            //fullpage의 동그란 메뉴의 이름을 사용
            showActiveTooptip:true,
            //fullpage의 내용을 불러온 다음 function안의 명령어 실행
            //매개변수(anchorLink:메뉴랑 section연동, index:section의 인덱스 번호, direction: 화면이 이동하는 방향)
            afterLoad:function(anchorLink, index, direction){
                //2번째 section이거나 4번째 section일때는 (논리연산자||:또는)
                if(index==2 || index==4 ){
                    //네비게이션의 주메뉴에 active 설정
                    $('header nav > ul > li').addclass('active');
                }
                //첫번째 section이거나 3번째 section일때는
                if(index==1 || index==3){
                    //네비게이션의 주메뉴의 active 클래스 제거
                    $('header nav > ul > li').removeclass('active');
                }
            },
            //section이 이동할 때 function 다음의 명령어 실행
            //매개변수(index:section의 인덱스 번호, nextIndex:다음 section을 가리킴, direction:화면이 이동하는 방향)
            onLeave:function(index, nextIndex, direction){
                //만약 section의 인덱스번호가 4이고, 다음 section의 인덱스번호가 5이면(section4에서 아래로 이동할때)
                if(index==4 && nextIndex==5){
                    //header 안의 menu영역 사라짐
                    $('header .menu').fadeOut();
                    //그렇지 않으면
                }else{
                    //header안의 메뉴영역 나타남
                    $('header .menu').fadeIn();
                }
            }
        });

    }else{
        //태블릿, 모바일 버전 슬라이드
        //photo의 인덱스 번호를 나타내는 변수
        var mo_num=0;
        //photo의 총 개수를 mo_total변수에 저장
        var mo_total=$('.photo').length;
        //photo의 가로길이를 imgWidth변수에 저장
        var imgWidth=$('.photo').width();
        //모든 photo 보임
        $('.photo').show();
        //모든 center-img 안의 small도 보임
        $('.small').show();
        //마지막 photo 이미지를 첫번째 photo이미지의 왼쪽에 배치
        $('.photo:last-child').prependTo('.left-img');
        //마지막 small이미지를 첫번째 small 이미지의 왼쪽에 배치
        $('.small:last').prependTo('.center-img');
        //.left-img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.left-img').css('left',-imgWidth);
        //.center-img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.center-img').css('left',-imgWidth);
        //number a 중 첫번째 a에 active 설정
        $('.number a:first').addClass('active');
        //right-txt의 txt객체 중 첫번째 txt에 active 설정
        $('.right-txt .txt:first').addClass('active');
        //mo_num에 해당하지 않는 .txt는 active클래스 제거
        $('.txt').eq(mo_num-1).removeClass('active');
        //mo_num에 해당하는 .txt에 active클래스 실행
        $('.txt').eq(mo_num).addClass('active');

        //next-btn에 클릭이벤트 설정
        $('.next-btn').click(function(){
            //이미지의 인덱스번호를 1씩 증가
            mo_num++;
            //만약 인덱스번호가 mo_total값 이상이면 0으로 초기화
            if(mo_num>=mo_total){mo_num=0;}
            //mo_num에 해당하지 않는 number a는 active 클래스 제거
            $('.number a').eq(mo_num-1).removeClass('active');
            //mo_num에 해당하는 number a에 active 설정
            $('.number a').eq(mo_num).addClass('active');
            //'-='+imgWidth ==> 왼쪽으로 .photo의 가로길이만큼 이동
            $('.left-img').animate({left:'-='+imgWidth},700,'easeOutExpo',function(){
                //.left-img영역이 이동하고 난 후 첫번째 photo가 left-img영역의 맨뒤로 추가됨
                $('.photo:first').appendTo('.left-img');
                $('.left-img').css('left',-imgWidth);
            });
            $('.center-img').animate({left:'-='+imgWidth},700,'easeOutExpo',function(){
                //.left-img영역이 이동하고 난 후 첫번째 photo가 left-img영역의 맨뒤로 추가됨
                $('.small:first').appendTo('.center-img');
                $('.center-img').css('left',-imgWidth);
            });
        });

        //prev-btn에 클릭이벤트 설정
        $('.prev-btn').click(function(){
            //이미지의 인덱스번호를 1씩 감소
            mo_num--;
            //만약 인덱스번호가 0미만이면 mo_total-1으로 초기화
            if(mo_num<0){mo_num=mo_total-1;}
            //mo_num에 해당하지 않는 number a는 active 클래스 제거
            //:not()메서드는 ()안의 조건의 반대가 되는 객체 선택자
            $('.number a:not(:eq(mo_num))').removeClass('active');
            //mo_num에 해당하는 number a는 active 클래스 설정
            $('.number a').eq(mo_num).addClass('active');
            //mo_num에 해당하는 number a에 active 설정
            $('.txt:not(:eq(mo_num))').removeClass('active');
            $('.txt').eq(mo_num).addClass('active');

            //'+='+imgWidth ==> 오른쪽으로 .photo의 가로길이만큼 이동
            $('.left-img').animate({left:'+='+imgWidth},700,'easeOutExpo',function(){
                //.left-img영역이 이동하고 난 후 마지막 photo가 left-img영역의 맨앞로 추가됨
                $('.photo:last').appendTo('.left-img');
                $('.left-img').css('left',-imgWidth);
            });
            
            $('.center-img').animate({left:'+='+imgWidth},700,'easeOutExpo',function(){
                //.center-img영역이 이동하고 난 후 마지막 photo가 center-img영역의 맨앞으로 추가됨
                $('.small:last').appendTo('.center-img');
                $('.center-img').css('left',-imgWidth);
            });
        });//prev-btn

        //mo-box 슬라이드
        var mo_width=$('.mo-box ul li').outerWidth();
        $('.mo-box ul li:last').prependTo('.mo-box ul');
        $('.mo-box ul').css('left',-mo_width);

        //배열선언
        var startX={};
        var endX={};
        $('.mo-box ul').on({
            //mo-box ul 객체에 touchstart이벤트 설정, e:이벤트를 전달하는 매개변수
            'touchstart':function(e){
                //e.touches[0] : 터치이벤트가 발생한 객체
                //pageX : 가로스크롤을 포함한 브라우저 화면을 기준으로 한 X좌표
                startX=e.touches[0].pageX;
            },
            //.mo-box ul 객체에 touchmove이벤트 설정, e:이벤트를 전달하는 매개변수
            'touchmove':function(e){
                //touch움직임이 끝난 지점의 x좌표값을 endX배열에 저장
                endX=e.touches[0].pageX;
                //touch한 시작X좌표에서 움직임이 끝난 x좌표값을 빼서 fnX에 저장
                var fnX=startX-endX;
                //aksdir fnX값이 0보다 크면(왼쪽방향)
                if(fnX>0){
                    $('.mo-box ul').stop().animate({'left':'-='+mo_width},700,'easeInExpo',function(){
                        $('.mo-box ul li:first').appendTo('.mo-box ul');
                        $('.mo-box ul').css('left',-mo_width);
                    });
                //fnX값이 0보다 크지 않다면(작거나 같다면, 오른쪽 방향)
                }else{
                    $('.mo-box ul').stop().animate({'left':'+='+mo_width},700,'easeInExpo',function(){
                        $('.mo-box ul li:last').prependTo('.mo-box ul');
                        $('.mo-box ul').css('left',-mo_width);
                    });
                }
            }
        });
    } //if







    

    
    
});