'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoRentSite = function () {
  function VideoRentSite() {
    _classCallCheck(this, VideoRentSite);

    this.container = document.querySelector('.videos');
  }

  _createClass(VideoRentSite, [{
    key: 'load',
    value: function load() {
      this.fetchJsonOne();
    }
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
  }, {
    key: 'sincePosted',
    value: function sincePosted(made) {
      var current = new Date().getTime();
      var created = current - made;
      var sec = created / 1000;
      var min = sec / 60;
      var klst = min / 60;
      var day = klst / 24;
      var week = void 0;
      var month = void 0;
      var year = void 0;

      /* ef meira en 365 dagar síðan "created" */
      if (day >= 365) {
        year = parseInt(day / 365);
        if (year === 1) {
          return 'Fyrir ' + year + ' ári síðan';
        } else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      } else if (day >= 30) {
        month = parseInt(day / 30);
        if (month === 1) {
          return 'Fyrir ' + month + ' mánuði síðan';
        } else {
          return 'Fyrir ' + month + ' mánuðum síðan';
        }
      } else if (day >= 7) {
        week = parseInt(day / 7);
        if (week === 1) {
          return 'Fyrir ' + week + ' viku síðan';
        } else {
          return 'Fyrir ' + week + ' vikum síðan';
        }
      } else if (klst >= 24) {
        day = parseInt(day);
        if (day === 1) {
          return 'Fyrir ' + day + ' degi síðan';
        } else {
          return 'Fyrir ' + day + ' dögum síðan';
        }
      }
    }
  }, {
    key: 'createVideolist',
    value: function createVideolist(data) {
      var categories = data.categories;
      var videos = data.videos;

      for (var i = 0; i < categories.length; i++) {
        var cats = categories[i];
        var VideoContainer = document.getElementById(i);
        var heading = document.createElement('h1');
        var parentDiv = VideoContainer.parentNode;
        parentDiv.insertBefore(heading, VideoContainer);
        heading.appendChild(document.createTextNode(categories[i]['title']));

        this.createCategorylist(VideoContainer, cats, videos);
      }
    }
  }, {
    key: 'createCategorylist',
    value: function createCategorylist(VideoContainer, cats, videos) {
      for (var i = 0; i <= cats.videos.length - 1; i++) {
        var id = cats.videos[i];
        var col = document.createElement('div');
        col.classList.add('cardlist__col');

        this.createVideoElement(col, videos[id - 1]['poster'], videos[id - 1]['video'], videos[id - 1]['title'], videos[id - 1]['created'], videos[id - 1]['duration'], videos[id - 1]['id']);

        VideoContainer.appendChild(col);
      }
    }
  }, {
    key: 'createVideoElement',
    value: function createVideoElement(col, poster, video, title, posted, duration, id) {
      var card = document.createElement('div');
      var headingCont = document.createElement('div');
      var aElement = document.createElement('a');
      var cardImg = document.createElement('img');
      var cardHeading = document.createElement('h3');
      var since = document.createElement('p');
      var length = document.createElement('p');
      col.classList.add('cardlist__col');
      card.classList.add('card');
      aElement.setAttribute('href', 'site.html?id=' + id);
      aElement.classList.add('card__imgCont');
      cardImg.classList.add('card__img');
      cardImg.setAttribute('src', poster);
      since.classList.add('cardText');
      length.classList.add('time');
      cardHeading.classList.add('card__heading');
      headingCont.appendChild(cardHeading);
      cardHeading.appendChild(document.createTextNode(title));
      since.appendChild(document.createTextNode(this.sincePosted(posted)));
      length.appendChild(document.createTextNode(this.videoLength(duration)));
      col.appendChild(card);
      aElement.appendChild(length);
      aElement.appendChild(cardImg);
      aElement.appendChild(headingCont);
      aElement.appendChild(since);
      card.appendChild(aElement);
    }
  }, {
    key: 'fetchJsonOne',
    value: function fetchJsonOne() {
      var _this = this;

      var json = 'videos.json';
      var r = new XMLHttpRequest();
      r.open('GET', json, true);
      r.onload = function () {
        if (r.status >= 200 && r.status < 400) {
          var data = JSON.parse(r.response);
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
  function Player() {
    _classCallCheck(this, Player);

    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
  }

  _createClass(Player, [{
    key: 'load',
    value: function load() {
      this.fetchJsonTwo();
    }
  }, {
    key: 'fetchJsonTwo',
    value: function fetchJsonTwo() {
      var _this2 = this;

      var json = 'videos.json';
      var r = new XMLHttpRequest();
      r.open('GET', json, true);
      r.onload = function () {
        if (r.status >= 200 && r.status < 400) {
          var data = JSON.parse(r.response);
          _this2.Video(data);
        } else {
          console.log('villa!', r);
        }
      };
      r.onerror = function () {
        console.log('villa í tengingu');
      };
      r.send();
    }
  }, {
    key: 'Video',
    value: function Video(data) {
      var Videos = data.videos;
      var url = window.location.href;
      var vidContainer = document.querySelector('.video');
      var vid = document.createElement('video');
      var overButton = document.createElement('button');
      var playImg = document.createElement('img');
      var over = document.createElement('div');
      var match = url.match(/id=(\d+)/);
      var matchid = match[1];
      vid.classList.add('vid');
      var header = document.querySelector('.video__header');

      if (matchid == 1) {
        vid.setAttribute('src', Videos[0]['video']);
        vid.setAttribute('type', 'video/mp4');
        header.appendChild(document.createTextNode(Videos[0]['title']));
      } else if (matchid == 2) {
        vid.setAttribute('src', Videos[1]['video']);
        vid.setAttribute('type', 'video/mp4');
        header.appendChild(document.createTextNode(Videos[1]['title']));
      } else if (matchid == 3) {
        vid.setAttribute('src', Videos[2]['video']);
        vid.setAttribute('type', 'video/mp4');
        header.appendChild(document.createTextNode(Videos[2]['title']));
      } else if (matchid == 4) {
        vid.setAttribute('src', Videos[3]['video']);
        vid.setAttribute('type', 'video/mp4');
        header.appendChild(document.createTextNode(Videos[3]['title']));
      } else {
        var error = document.createTextNode('Myndband finnst ekki');
        header.appendChild(error);
      }

      overButton.classList.add('lay');
      playImg.setAttribute('src', '/img/play.svg');
      over.classList.add('over');
      playImg.classList.add('overlayButton');
      overButton.appendChild(playImg);
      over.appendChild(overButton);
      overButton.addEventListener('click', this.playPause.bind());
      over.appendChild(vid);
      vidContainer.appendChild(over);

      this.createControls();
    }

    // býr til grunnin að controls

  }, {
    key: 'createControls',
    value: function createControls() {
      var controlContainer = document.querySelector('.video');
      var playingButton = document.createElement('button');
      var forwardButton = document.createElement('button');
      var backButton = document.createElement('button');
      var screenButton = document.createElement('button');
      var soundButton = document.createElement('button');
      var backImg = document.createElement('img');
      var playImg = document.createElement('img');
      var soundImg = document.createElement('img');
      var screenImg = document.createElement('img');
      var forwardImg = document.createElement('img');
      var divCon = document.createElement('div');
      var button = document.createElement('div');
      var aEl = document.createElement('a');
      aEl.setAttribute('href', 'index.html');
      aEl.classList.add('back--button');
      aEl.appendChild(document.createTextNode('Til baka'));
      divCon.classList.add('buttons__container');
      button.classList.add('buttons');
      playingButton.classList.add('pause');
      forwardButton.classList.add('forward');
      backButton.classList.add('back');
      soundButton.classList.add('unmute');
      screenButton.classList.add('normalSize');
      soundButton.appendChild(soundImg);
      playingButton.appendChild(playImg);
      forwardButton.appendChild(forwardImg);
      backButton.appendChild(backImg);
      screenButton.appendChild(screenImg);
      soundImg.setAttribute('src', '/img/mute.svg');
      soundImg.classList.add('button');
      playImg.setAttribute('src', '/img/play.svg');
      playImg.classList.add('button');
      forwardImg.setAttribute('src', '/img/next.svg');
      forwardImg.classList.add('button');
      backImg.setAttribute('src', '/img/back.svg');
      backImg.classList.add('button');
      screenImg.setAttribute('src', '/img/fullscreen.svg');
      screenImg.classList.add('button');
      button.appendChild(backButton);
      button.appendChild(playingButton);
      button.appendChild(soundButton);
      button.appendChild(screenButton);
      button.appendChild(forwardButton);
      divCon.appendChild(button);
      controlContainer.appendChild(divCon);
      controlContainer.appendChild(aEl);
      playingButton.addEventListener('click', this.playPause.bind());
      forwardButton.addEventListener('click', this.skipforward.bind());
      backButton.addEventListener('click', this.skipbackwards.bind());
      screenButton.addEventListener('click', this.fullscreen.bind());
      soundButton.addEventListener('click', this.sound.bind());
    }

    // spólar framm og til baka

  }, {
    key: 'skipforward',
    value: function skipforward() {
      var vid = document.querySelector('.vid');
      vid.currentTime += 3;
    }
  }, {
    key: 'skipbackwards',
    value: function skipbackwards() {
      var vid = document.querySelector('.vid');
      vid.currentTime -= 3;
    }

    // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið

  }, {
    key: 'sound',
    value: function sound() {
      var video = document.querySelector('.vid');
      if (document.querySelector('.mute')) {
        video.muted = false;
        var mute = document.querySelector('.mute');
        mute.classList.remove('mute');
        mute.classList.add('unmute');
        mute.firstChild.removeAttribute('src');
        mute.firstChild.setAttribute('src', '/img/mute.svg');
      } else {
        video.muted = true;
        var unmute = document.querySelector('.unmute');
        unmute.classList.remove('unmute');
        unmute.classList.add('mute');
        unmute.firstChild.removeAttribute('src');
        unmute.firstChild.setAttribute('src', '/img/unmute.svg');
      }
    }

    // gerir skjáinn fullscreen

  }, {
    key: 'fullscreen',
    value: function fullscreen() {
      var vid = document.querySelector('.vid');
      var rfs = vid.requestFullscreen || vid.webkitRequestFullScreen || vid.mozRequestFullScreen || vid.msRequestFullscreen;
      rfs.call(vid);
    }
  }, {
    key: 'playPause',
    value: function playPause() {
      var vid = document.querySelector('.vid');
      if (vid.paused) {
        vid.play();
        var play = document.querySelector('.pause');
        play.classList.remove('pause');
        play.classList.add('play');
        play.firstChild.removeAttribute('src');
        play.firstChild.setAttribute('src', '/img/pause.svg');
        var dis = document.querySelector('.lay');
        dis.classList.remove('lay');
        dis.classList.add('none');
      } else {
        vid.pause();
        var pause = document.querySelector('.play');
        pause.classList.remove('play');
        pause.classList.add('pause');
        pause.firstChild.removeAttribute('src');
        pause.firstChild.setAttribute('src', '/img/play.svg');
        var none = document.querySelector('.none');
        none.classList.remove('none');
        none.classList.add('lay');
      }
    }
  }]);

  return Player;
}();

document.addEventListener('DOMContentLoaded', function () {
  var VideoSite = new VideoRentSite();
  var player = new Player();

  var findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});

//# sourceMappingURL=script-compiled.js.map