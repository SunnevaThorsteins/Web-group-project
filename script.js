document.addEventListener('DOMContentLoaded', function () { //þeeeetta á kannski að vera hérna, er allavega í verkefni 9 og 8 :)
  const main = document.querySelector('main');
  console.log(main);
  program.init(main);
});

  var program = function () {

    function getJson() {
      var r = new XMLHttpRequest();
      //var jsonVideos = 'video.json';

      r.open('GET', 'videos.json' , true);

      r.onload = function() {
        if (r.status >= 200 && r.status < 400) {
          console.log(r.response);
        } else {
          console.log('villa!', r);
        }
      };

      r.onerror = function() {
        console.log('villa í tengingu');
      };

      r.send();
    }

    //listi yfir breytur? Það virðist vera gert oft



    /*síðan undir venjulegum kringumstæðum. Sér um að kalla á föll
    og/eða allt það sem þarf til þess að búa til síðuna áður en eitthvað
    er leigt af henni */

    function videoRent() {

    }


    /*sér um að byggju upp síðuna, búa til öll elementin sem við þurfum
     og appenda þau rétt fyrir rent*/
    function createRent() {
    createRent() {
      /*ætti líklega að kalla í sectionin eða eitthvað?*/
      video(/*kallar á ákveðið myndband*/);
      video(/*kallar á eitthvað annað myndband*/);
      video(/*kallar á enn annað myndband*/);

    }

    /*sér um að kalla á öll föllin fyrir myndbandið, videoLegth, sincePosted, load ofl.
     *setur einnig card klasa á viðeigandi gæja */
     function video(/*myndbanda jason fylkið eða hvað?*/){

       load(); //geri ráð fyrir að það eigi að vera eitthvað gildi sem fer inn í þetta fall
       videoLenght();
     }

    /*nær í gögnin sem við fáum fyrir myndböndin og setur svona loading gæja ef það er bið á því að þetta loadist*/
    function load() {

    }

    /*sér um að littli kassinn sem er með lengd myndbandsins sé settur rétt inn, fær inn lengdina í sekúndum og skilar
     *á forminu mín:sek*/
     /*þetta fall er á mjög miklu tilraunarstigi*/
    function videoLenght(duration) {
      if (duration < 60){
        if (duration < 10){
          return "0:0" + duration;
        }
        else {
          return "0:" + duration;
        }
      }
      else {
      }
      return min + ":" + sec;
    }

    /*sér um að það sé rétt lengd frá því myndbandið var birt.
     *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
     *langt er síðan myndbandið var birt*/
    function sincePosted(created){
      /*þarf að setja betur upp en þetta er svona í grófum dráttum
       *gæti verið að við gætum notað const
       *fæ alltaf út undefined þegar og það tengist eitthvað var gæjunum en veit ekki hvernig á að laga það*/
      var sec = created/1000;
      var min = sec/60;
      var klst = min/60;
      var day = klst/24;
      var week;
      var month;
      var year;

      /*ef meira en 365 dagar síðan "created"*/
      if (day >= 365) {
        year = parseInt(day/365);
        if (year === 1){
          return 'Fyrir ' + year + ' ári síðan';
        }
        else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      }
      /*ef meiri en 30 dagar síðan "created"*/
      else if (day >= 30){
        month = parseInt(day/30);
        if (month === 1){
          return 'Fyrir ' + month + ' mánuði síðan';
        }
        else {
          return 'Fyrir ' + month + ' mánuðum síðan';
        }
      }
      /*ef meira en 7 dagae er síðan "created"*/
      else if (day >= 7){
        week = parseInt(day/7);
        if(week === 1){
          return 'Fyrir ' + week + ' viku síðan';
        }
        else {
          return 'Fyrir ' + week + ' vikum síðan';
        }
      }
      /*ef meira en 24klst síðan "created"*/
      else if (klst >= 24){
        day = parseInt(day);
        if (day === 1){
          return 'Fyrir ' + day + ' degi síðan';
        }
        else {
          return 'Fyrir ' + day + ' dögum síðan';
        }
      }
      else {
        klst = parseInt(klst);
        if (klst === 1){
          return 'Fyrir ' + klst + 'klukkustund síðan';
        }
        else {
          return 'Fyrir ' + klst + 'klukkustundum síðan';
        }
      }
    }

    /*útfærir það sem gerist þegar ýtt er á myndbönd*/
    function watch(){

    }

    /*útfærir controles gæjan, það sem kemur undir þegar
    maður er að horfa á myndand*/
    function controles() {

    }

    function init(main) {
        console.log(getJson());
    }
    return {
      init: init
    }
}();
