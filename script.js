document.addEventListener('DOMContentLoaded', function () { //þeeeetta á kannski að vera hérna, er allavega í verkefni 9 og 8 :
  const main = document.querySelector('main');
  console.log(main);
  program.init(main);
});

  const program = function () {

  //listi yfir breytur? Það virðist vera gert oft

    function getJson() {
      const r = new XMLHttpRequest();
      r.open('GET', 'videos.json', true);
      r.onload = function() {
        if (r.status >= 200 && r.status < 400) {
          const obj = JSON.parse(r.response);
          createVideos(obj);
          createCategories(obj);
        } else {
          console.log('villa!', r);
        }
      };
      r.onerror = function() {
        console.log('villa í tengingu');
      };
      r.send();
    }

    //Sækir videos í json hlut
    function createVideos(data) {
      const videos = data.videos;
      const id = data.videos[0]['id'];
      console.log('id FRÁ JSON', id);
      const title = data.videos[1];
      console.log('VIDEOS FRÁ JSON', videos);
      return id;
    }

    //Sækir categories í json hlut
    function createCategories(data) {
      var myH1 = document.createElement('h1');
      myH1.textContent = data.categories['title'];
      document.append.Child;

      document.write(data.categories['title']);

      /*const categories = data.categories;
      //const prufa = data.videos[0].created;
      //data['videos'][0]['created'];
      console.log('CATEGORIES FRÁ JSON', categories);
      //console.log('PRUFA', prufa);*/
    }

    function getElements() {
      /*const vid = createVideos();
      console.log('id FRÁ FALLI', id);
      //console.log('VIDEOS FRÁ FALLI', videos);
      //console.log('title FRÁ FALLI', title);*/
    }


    /*síðan undir venjulegum kringumstæðum. Sér um að kalla á föll
    og/eða allt það sem þarf til þess að búa til síðuna áður en eitthvað
    er leigt af henni */

    function videoRent() {

    }


    /*sér um að byggju upp síðuna, búa til öll elementin sem við þurfum
     og appenda þau rétt fyrir rent*/
    function createRent() {
      /*ætti líklega að kalla í sectionin eða eitthvað?*/
      video(/*kallar á ákveðið myndband*/);
      video(/*kallar á eitthvað annað myndband*/);
      video(/*kallar á enn annað myndband*/);
    }

    /*sér um að kalla á öll föllin fyrir myndbandið, videoLegth, sincePosted, load ofl.
     *setur einnig card klasa á viðeigandi gæja */
     function video(/*myndbanda jason fylkið eða hvað?*/){

       load(); //geri ráð fyrir að það eigi að vera eitthvað gildi sem fer inn í þetta fall
       videoLength();
     }

    /*nær í gögnin sem við fáum fyrir myndböndin og setur svona loading gæja ef það er bið á því að þetta loadist*/
    function load() {

    }

    /*sér um að littli kassinn sem er með lengd myndbandsins sé settur rétt inn, fær inn lengdina í sekúndum og skilar
     *á forminu mín:sek*/
     /*þetta fall er á mjög miklu tilraunarstigi*/
    function videoLenght(duration) {
      var min;
      var sec;
      if (duration < 60){
        if (duration < 10){
          return "0:0" + duration;
        }
        else {
          return "0:" + duration;
        }
      }
      else {
        min = parseInt(duration/60);
        sec = duration -(min*60);
        if (sec < 10){
          sec = "0" + sec;
        }
        return min + ":" + sec;
      }
    }

    /*sér um að það sé rétt lengd frá því myndbandið var birt.
     *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
     *langt er síðan myndbandið var birt*/
    function sincePosted(created){
      /*þarf að setja betur upp en þetta er svona í grófum dráttum
       *gæti verið að við gætum notað const
       *fæ alltaf út undefined þegar og það tengist eitthvað var gæjunum en veit ekki hvernig á að laga það*/
      //const diff = created - new Date();
      var current = new Date().getTime();
      var created = current - created;
      var sec = created/1000;
      var min = sec/60;
      var klst = min/60;
      var day = klst/24;
      var week;
      var month;
      var year;
debugger
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
          return 'Fyrir ' + klst + ' klukkustund síðan';
        }
        else {
          return 'Fyrir ' + klst + ' klukkustundum síðan';
        }
      }
    }

    /*útfærir það sem gerist þegar ýtt er á myndbönd á rent síðunni*/
    function watch(){

    }

    /*fær inn id af myndbandi og annaðhvort byrjar að spila það
     *eða setur það á pásu. Ætti líklega líka að breyta play takkanum
     *í pause takka og öfugt*/
    function playPause(videoId){
      var video = videoId;
      if(video.paused){
        /*held ég sé að finna takkann sem er að hafa þetta á pásu og breyta honum í play takka*/
        var pauseButton = button.querySelector('.button--pause');
        pauseButton.classList.remove('.button--pause');
        pauseButton.classList.add('.button--play');
        video.play();
      }
      else {
        video.pause();
        var playButton = button.querySelector('.button--play');
        playButton.classList.remove('.button--play');
        playButton.classList.add('.button--pause');
      }
      return;
    }

    /*útfærir controles gæjan, það sem kemur undir þegar*/

    function createElement(poster, /* video? ,*/ title) {
      const row = document.createElement('div');
      row.classList.add('cardlist__row');
      const col = document.createElement('div');
      col.classList.add('cardlist__col');
      col.appendChild(document.createElement(blabla));
      row.appendChild(col);

      const card = document.createElement('div');
      card.classList.add('card');
      const cardImage = document.createElement('img');
      cardImage.classList.add('card__img');
      cardImage.src = 'poster'; // ?????
      console.log(cardImage.src);
      cardImage.setAttribute('src', poster); // ???????
      //cardImage.appendChild(document.createElement(poster));
      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');
      cardContent.appendChild(document.createElement(blalba));
      const cardHeading = document.createElement('div');
      cardHeading.classList.add('card__heading');
      cardHeading.appendChild(document.createTextNode(title));
      card.appendChild(cardImage); //???
      card.appendChild(cardContent);
      card.appendChild(cardHeading);

      row.appendChild(card);

      return row;
    }

    /*útfærir control gæjann, það sem kemur undir þegar
    maður er að horfa á myndand*/
    function controls() {

    }

    function init(main) {
        getJson();
        getElements();

    }
    return {
      init: init
    }
}();
