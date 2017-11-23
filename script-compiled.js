'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoRentSite = function () {
  function VideoRentSite() {
    _classCallCheck(this, VideoRentSite);

    //this.keyName = 'videos';
    this.container = document.querySelector('.videos');
  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */


  _createClass(VideoRentSite, [{
    key: 'load',
    value: function load() {}

    /* sér um að littli kassinn sem er með lengd myndbandsins sé
     * settur rétt inn, fær inn lengdina í sekúndum og skilar
     * á forminu mín:sek */
    /* þetta fall er á mjög miklu tilraunarstigi */

  }, {
    key: 'videoLength',
    value: function videoLength(duration) {
      if (duration < 60) {
        if (duration < 10) {
          return '0:0' + duration;
        } else {
          return "0:" + duration;
        }
      } else {
        var min = parseInt(duration / 60);
        var sec = duration - min * 60;
        if (sec < 10) {
          sec = "0" + sec;
        }
        return min + ":" + sec;
      }
    }

    /* sér um að það sé rétt lengd frá því myndbandið var birt.
       *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
       *langt er síðan myndbandið var birt */

  }, {
    key: 'sincePosted',
    value: function sincePosted(made) {
      /* þarf að setja betur upp en þetta er svona í grófum dráttum
       * gæti verið að við gætum notað const */

      var current = new Date().getTime();
      var created = current - made;
      var sec = created / 1000;
      var min = sec / 60;
      var klst = min / 60;
      var day = klst / 24;
      var week = void 0;
      var month = void 0;
      var year = void 0;

      /*ef meira en 365 dagar síðan "created"*/
      if (day >= 365) {
        year = parseInt(day / 365);
        if (year === 1) {
          return 'Fyrir ' + year + ' ári síðan';
        } else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      }
      /*ef meiri en 30 dagar síðan "created"*/
      else if (day >= 30) {
          month = parseInt(day / 30);
          if (month === 1) {
            return 'Fyrir ' + month + ' mánuði síðan';
          } else {
            return 'Fyrir ' + month + ' mánuðum síðan';
          }
        }
        /*ef meira en 7 dagae er síðan "created"*/
        else if (day >= 7) {
            week = parseInt(day / 7);
            if (week === 1) {
              return 'Fyrir ' + week + ' viku síðan';
            } else {
              return 'Fyrir ' + week + ' vikum síðan';
            }
          }
          /*ef meira en 24klst síðan "created"*/
          else if (klst >= 24) {
              day = parseInt(day);
              if (day === 1) {
                return 'Fyrir ' + day + ' degi síðan';
              } else {
                return 'Fyrir ' + day + ' dögum síðan';
              }
            }

      /*  const klst = Math.floor((sec - day) / (60 * 60));
        const klstString = klst === 1 ? 'klukkustund' : 'klukkustundum';
        return 'Fyrir $(klst) $(klstString) síðan';
          else {
          klst = parseInt(klst);
          if (klst === 1){
            return 'Fyrir ' + klst + ' klukkustund síðan';
          }
          else {
            return 'Fyrir ' + klst + ' klukkustundum síðan';
          } */
    }

    /* útfærir controles gæjan, það sem kemur undir þegar */

    /*createElement(poster, video, title, posted) {
      const row = document.createElement('div'); // ætti kannski að vera bara eitt á hvert section?
      const col = document.createElement('div');
      const vid = document.createElement('video');
      const aElement = document.createElement('a');
      row.classList.add('cardlist__row');
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
      // cardImage.appendChild(document.createElement(poster));
      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');
      cardContent.appendChild(document.createElement(blalba));
      const cardHeading = document.createElement('div');
      cardHeading.classList.add('card__heading');
      cardHeading.appendChild(document.createTextNode(title));
      card.appendChild(cardImage); // ???
      card.appendChild(cardContent);
      card.appendChild(cardHeading);
        row.appendChild(card);
        return row;
    }*/

  }, {
    key: 'createVideolist',
    value: function createVideolist(data) {
      var categories = data.categories;
      var videos = data.videos;

      for (var i = 0; i < categories.length; i++) {
        console.log('****************TELJARIII****************');
        var cats = categories[i];
        this.createCategorylist(cats, videos);
      }
    }
  }, {
    key: 'createCategorylist',
    value: function createCategorylist(cats, videos) {
      var ClassContainer = document.querySelector('.videos');
      var row = document.createElement('div');
      row.classList.add('cardlist__row');
      ClassContainer.appendChild(row);

      for (var i = 0; i <= cats.videos.length - 1; i++) {
        console.log('*************', [i + 1], '*************');
        var id = cats.videos[i];
        console.log('ID', id);
        var videlement = this.createVideoElement(row, videos[i]['poster'], videos[i]['video'], videos[i]['title'], videos[i]['created'], videos[i]['duration']);
      }
    }

    // fær inn upplýsingar um myndband og "byggir" það upp, fallið sem ég var að gera en má alveg breyta eða nota annað fall

  }, {
    key: 'createVideoElement',
    value: function createVideoElement(row, poster, video, title, posted, duration) {
      console.log('poster', poster);
      console.log('video', video);
      console.log('title', title);
      console.log('posted', posted);
      console.log('duration', duration);
      var col = document.createElement('div');
      var vid = document.createElement('video'); // spurning hvort það þurfi að kalla á myndbandið hérna?
      var aElement = document.createElement('a');
      var cardImg = document.createElement('img');
      var cardTitle = document.createElement('h2');
      var since = document.createElement('p');
      var length = document.createElement('p');
      col.classList.add('cardlist__col');
      aElement.setAttribute('href', 'site.html');
      cardImg.classList.add('card__img');
      cardImg.setAttribute('src', poster);
      cardTitle.appendChild(document.createTextNode(title));
      since.appendChild(document.createTextNode(this.sincePosted(posted)));
      length.appendChild(document.createTextNode(this.videoLength(duration)));
      aElement.appendChild(vid);
      col.appendChild(aElement);
      col.appendChild(cardImg);
      col.appendChild(cardTitle);
      col.appendChild(since);
      col.appendChild(length);

      var VideoContainer = document.querySelector('.cardlist__row');
      VideoContainer.appendChild(col);
    }
  }, {
    key: 'fetchJson',
    value: function fetchJson() {
      var _this = this;

      var json = 'videos.json';
      var r = new XMLHttpRequest();

      r.open('GET', json, true);
      r.onload = function () {
        if (r.status >= 200 && r.status < 400) {
          var data = JSON.parse(r.response);
          console.log(data);
          _this.createVideolist(data);
        } else {
          console.log('villa!', r);
        }
      };
      r.onerror = function () {
        console.log('villa í tengingu');
      };
      r.send();
    }
  }]);

  return VideoRentSite;
}();

var Player = function () {

  /*hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
   *þarf að vera this. á undan þeim*/
  function Player() {
    _classCallCheck(this, Player);

    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /*gætum svo þurft að bæta við add addEventListener á takkana hérna*/
  }

  _createClass(Player, [{
    key: 'load',
    value: function load() {}
    //const request = new XMLHttpRequest();
    //const qs = new URLSerchParams(window.location.serch);
    //const id = parseInt(qs.get('id'), 10);
    // request.open. ()


    // býr til grunnin að controles

  }, {
    key: 'createControles',
    value: function createControles() {
      var controleContainer = document.createElement('div');
      var playingButton = document.createElement('button');
      var forwardButton = document.createElement('button');
      var backButton = document.createElement('button');
      var fullscreenButton = document.createElement('button');
      var soundButton = document.createElement('button');
      controleContainer.classList.add('controles');
      playingButton.setAttribute('click', playPause());
      playingButton.classList.add('button--play');
      forwardButton.setAttribute('click', skip(3));
      backButton.setAttribute('click', skip(-3));
      fullscreenButton.setAttribute('click', fullscreen());
      fullscreenButton.classList.add('normalSize'); //þegar myndbandið er venjulegt
      soundButton.setAttribute('click', sound());
      controleContainer.appendChild(playingButton);
      controleContainer.appendChild(forwardButton);
      controleContainer.appendChild(backButton);
      controleContainer.appendChild(fullscreenButton);
      controleContainer.appendChild(soundButton);
      return;
    }

    // spólar framm og til baka

  }, {
    key: 'skip',
    value: function skip(value) {
      var video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
      video.currentTime += value;
      return; // veit ekki hvort það þarf að vera return
    }

    // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið

  }, {
    key: 'sound',
    value: function sound() {
      var video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
      if (video.muted) {
        video.muted = false;
      } else {
        video.muted = true;
      }
    }

    // gerir skjáinn annaðhvort fullscreen eða tekur það af

  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      var video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
      if (document.querySelector('normalSize')) {
        var norm = button.querySelector('normalSize');
        norm.classList.remove('normalSize');
        norm.classList.add('fullscreenSize');
      } else {
        var full = button.querySelector('fullscreenSize');
        full.classList.remove('fullscreenSize');
        full.classList.add('normalSize');
      }
    }

    /* fær inn id af myndbandi og annaðhvort byrjar að spila það
     * eða setur það á pásu. Ætti líklega líka að breyta play takkanum
     * í pause takka og öfugt */

  }, {
    key: 'playPause',
    value: function playPause() {
      var video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndband er verið að tala um
      if (video.paused) {
        video.play();
        /*held ég sé að finna takkann sem er að hafa þetta á pásu og breyta honum í play takka*/
        var play = button.querySelector('.button--pause');
        play.classList.remove('.button--pause');
        play.classList.add('.button--play');
      } else {
        video.pause();
        var pause = button.querySelector('.button--play');
        pause.classList.remove('.button--play');
        pause.classList.add('.button--pause');
      }
      return; // veit ekki hvort það þarf að vera return :/
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var VideoSite = new VideoRentSite();
  var player = new Player();

  VideoSite.fetchJson();

  var findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});

//# sourceMappingURL=script-compiled.js.map