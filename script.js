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

    }

    /*nær í gögnin sem við fáum fyrir myndböndin og setur þau inn setur inn
    svona loading gæja ef það er bið á því að þetta loadist*/
    function load() {

    }

    /*sér um að myndböndin líti rétt út, setur overlay klasa á */
    function videoApperance() {

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
