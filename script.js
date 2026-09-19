    //サービスワーカー登録
    if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./sw.js').then(reg=>console.log('SW登録成功!',reg)
        )//thenここまで
        .catch(err=>console.log('SW登録失敗🥲',err)
        );//catchここまで
      }//ロードイベントのアロー関数ここまで
      );//イベリス ここまで
    }//ifここまで
    
    //regはServiceWorkerRegistrationのオブジェクトで、このSWがどこにいるか何をしているかなど詳細情報が詰まっている
    
    
    const countriesList=[
      {
        id:'JPtoday',
        locale:'ja-JP',
        TIMEZONE:'Asia/Tokyo',
        format:{
       // ↑ コロンを忘れず！
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
      }
      ,
      {
        id:'USAtoday',
        locale:'en-US',
        TIMEZONE:'America/New_York',
        format:{
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true}
          },
          {
        id:'UKtoday',
        locale:'en-GB',
        TIMEZONE:'Europe/London',
        format:{
          year: '2-digit',
          month: 'short',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
          },
      {
        id: 'FRtoday',
        locale: 'fr-FR',
        TIMEZONE: 'Europe/Paris',
        format: {
          year: '2-digit',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
      },
      { id: 'GERtoday',
        locale: 'de-DE',
        TIMEZONE: 'Europe/Berlin',
        format: {
          year: '2-digit',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
      },
     {
        id: 'SPAtoday',
        locale: 'es-ES',
        TIMEZONE: 'Europe/Madrid',
        format: {
          year: '2-digit',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
      },
     {
        id: 'ITAtoday',
        locale: 'it-IT',
        TIMEZONE: 'Europe/Rome',
        format: {
          year: '2-digit',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'}
     }
    ]
    
    const colors={
      0:'pink',
      1:'#241BDE',
      2:'#a00',
      3:'#0080AB',
      4:'#070',
      5:'gold',
      6:'#BF5900'
    };//キーと値はイコールじゃない！
    //ゲットデイ メソッドはデイトオブジェクトにしかついてない機能。
    //しかしゲット デイは国によって曜日ID が違ったりブラウザに依存するのでやりたい結果にならないことがある。できたら 使わない方がいい。
    const weekMap=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    
    //曜日ごとに色分けするのに必要な曜日ID取得用↓
    
    function showNow(){
      const nowtime=new Date();/*同じ箱を指し続けるからconstでOK。中の日付(オブジェクトの中身は変わってもいい。)*/
    
    /*ニューデ一トコンストラクターだけだと「Wed Sep 16 2026 09:13:06 GMT+0900 (日本標準時) 」と表示される。見やすくするためにはフォーマットメソッド、各国の表記ルールに従うならさらにイントル日付 フォーマットもいる*/
      countriesList.forEach(
        c=>{
          const DIV = document.getElementById(c.id);//←オブジェクトで既に文字列化してあるからここではシングルコーテーション不要。
          DIV.textContent=new Intl.DateTimeFormat(
            c.locale,{
              timeZone:c.TIMEZONE,
              ...c.format
            }).format(nowtime);//timeZoneはブラウザのプロパティ。TIMEZONEは私が作った辞書オブジェクトのキー○
            
          const engWeek=new Intl.DateTimeFormat('en-US',{
        timeZone:c.TIMEZONE,
        weekday:'short'
      }).format(nowtime);
      //formatToPartsだと 配列で帰ってくるからファインドメソッドが必要だったけど、formatだと指定したものだけ文字列で返してくる
       DIV.style.color=colors[weekMap.indexOf(engWeek)]??'white';
       //「??」は、左がnull/undefinedなら右を使う
       
        })//forEachここまで
    }//showNow関数ここまで
  
    
    showNow();
    setInterval(showNow, 1000);
    