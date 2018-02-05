
  function go( url ){
    //开始时间和结束时间
    var startTime = new Date().getTime();
    var endTime = 0;
    var totalTime = 0;
  // 制作倒计时背景
    var str = '';
    var str1 = '';
    //下层背景
    function bottoms(){
      for(var i = 0 ; i < 30; i++){
        str += '<div class="time-item time-item1"></div>';
      }
      $('.time-bg').html(str);
      for(var i = 0 ; i < 30; i++){
        $('.time-item1').eq(i).css({
          'transform':'rotate('+i*12+'deg)',
          'transform-origin':'50% 100%'
        });
      }
    }
    //上层背景
    function tops(){
      for(var i = 0 ; i < 30; i++){
        str1 += '<div class="time-item time-item2"></div>';
      }
      $('.time-bg1').html(str1);
      for(var i = 0 ; i < 30; i++){
        $('.time-item2').eq(i).css({
          'transform':'rotate('+i*12+'deg)',
          'transform-origin':'50% 100%'
        });
      }
    }

    bottoms();
    tops();

  var questionNum = 1;
  //首次赋值题号
  $('.question-no-num').html(questionNum);

  //倒计时
  var timer;
  var num = 0;
  var grade = 2;
  var total = grade == 1? 60 : 30;
  $('.time .num').html(total);
  setTimeout(downs,2000)
  // downs();
  function downs(){
    timer= setInterval(function aa(){
      total--;
      num++;
      //删除第一个元素
      if(grade == 2){  //一年级时间是60s
        $('.time-item2').eq(0).remove();
      }else if( grade == 1 && num%2 == 0){//一年级时间是30s
        $('.time-item2').eq(0).remove();
      }
      if(total <= 0){
        removeclass();
        clearInterval(timer);
        setTimeout(function(){
            questionNum++;
            if(questionNum == 11 ){
              endTime  = new Date().getTime();
              totalTime = endTime - startTime;
              sessionStorage.setItem('totaltime',totalTime);
              setTimeout(function(){
               location.href = './'+url+'.html'
              },2000)
            }
            addclass();
        },200)
        }
        $('.time .num').html(total);

      },1000)
    }

   // 下一题动画
  var rightAnswerNum = 1;
  var n = 0; //控制点击次数
  $('li').on('click',function(){
    n++;
    if(n >= 2){
      console.log(n)
      return;
    }
    var that = $(this);
    questionNum++;
    if(questionNum == 11){
      endTime  = new Date().getTime();
      totalTime = endTime - startTime;
      sessionStorage.setItem('totaltime',totalTime);
      setTimeout(function(){
       location.href = './'+url+'.html';
      },2000)
    }
    //倒计时临界值时点击
    if(total >= 1){
      clearInterval(timer)
      //显示正确答案
      var selectIndex = that.index();
      if(selectIndex == rightAnswerNum){
          that.addClass('right');
      }else{
          that.addClass('wrong');
          $('li').eq(rightAnswerNum).addClass('right');
      }
    }
      removeclass()
      //跳转到下一题
      setTimeout(addclass,2000)
    
  })

  //添加动画效果
  function addclass(){
    $('.question-no-num').html(questionNum);
    $('.question-no-bg img').addClass('animate');
    $('.question-no-num').addClass('animate');
    $('.question-no-type').addClass('animate');
    $('.question-title').addClass('bounceInUp1');
    // 清楚 right wrong
    $('li').attr('class','');
    $('li').eq(0).addClass('bounceInUp2');
    $('li').eq(1).addClass('bounceInUp3');
    $('li').eq(2).addClass('bounceInUp4');
    total = grade ==  1? 60 : 30;
    n = 0;
    // 重新绘制倒计时上层
    tops();
    setTimeout(downs,2000)
    $('.time .num').html(total);
 
  }
  //清除动画效果
  function removeclass(){
    
    $('.question-no-num').removeClass('animate');
    $('.question-no-type').removeClass('animate');
    $('.question-no-bg img').removeClass('animate');
    $('.question-title').removeClass('bounceInUp1');
    $('li').eq(0).removeClass('bounceInUp2');
    $('li').eq(1).removeClass('bounceInUp3');
    $('li').eq(2).removeClass('bounceInUp4');
  }
    }
