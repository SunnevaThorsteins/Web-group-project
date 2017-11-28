class VideoRentSite {
  constructor() {
    this.container = document.querySelector('.videos');
  }

  load() {
    this.fetchJsonOne();
  }

  videoLength(duration) {
    if (duration < 60) {
      if (duration < 10) {
        return '0:0' + duration;
      } else {
        return "0:" + duration;
      }
    } else {
      const min = parseInt(duration/60);
      let sec = duration -(min*60);
      if (sec < 10){
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }
  }

  sincePosted(made) {
    const current = new Date().getTime();
    const created = current - made;
    const sec = created / 1000;
    const min = sec / 60;
    const klst = min / 60;
    let day = klst / 24;
    let week;
    let month;
    let year;

    /* ef meira en 365 dagar síðan "created" */
    if (day >= 365) {
      year = parseInt(day/365);
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
      week = parseInt(day/7);
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
    } else {
      klst = parseInt(klst);
      if (klst === 1){
        return 'Fyrir ' + klst + ' klukkustund síðan';
      } else {
        return 'Fyrir ' + klst + ' klukkustundum síðan';
      }
    }
  }

  createVideolist(data) {
    const categories = data.categories;
    const videos = data.videos;

    for (let i=0; i<categories.length; i++) {
      const cats = categories[i];
      const videoContainer = document.getElementById(i);
      const heading = document.createElement('h1');
      const parentDiv = videoContainer.parentNode;
      parentDiv.insertBefore(heading, videoContainer);
      heading.appendChild(document.createTextNode(categories[i]['title']));
      this.createCategorylist(videoContainer, cats, videos);
    }
  }

  createCategorylist(videoContainer, cats, videos) {
    for (let i = 0; i <= cats.videos.length - 1; i++) {
      const id = cats.videos[i];
      const col = document.createElement('div');
      col.classList.add('cardlist__col');

      this.createVideoElement(col, videos[id - 1]['poster'], videos[id - 1]['video'], videos[id - 1]['title'], videos[id - 1]['created'], videos[id - 1]['duration'], videos[id - 1]['id']);
      videoContainer.appendChild(col);
    }
  }

  createVideoElement(col, poster, video, title, posted, duration, id) {
    const card = document.createElement('div');
    const headingCont = document.createElement('div');
    const aElement = document.createElement('a');
    const cardImg = document.createElement('img');
    const cardHeading = document.createElement('h3');
    const since = document.createElement('p');
    const length = document.createElement('p');
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

  fetchJsonOne() {
    const json = 'videos.json';
    const r = new XMLHttpRequest();
    r.open('GET', json, true);
    r.onload = () => {
      if (r.status >= 200 && r.status < 400) {
        const data = JSON.parse(r.response);
        this.createVideolist(data);
      } else {
        console.log('villa!', r);
      }
    };
    r.onerror = () => {
      console.log('villa í tengingu');
    };
    r.send();
  }
}

class Player {

  constructor() {
    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
  }

  load() {
    this.fetchJsonTwo();
  }

  fetchJsonTwo() {
    const json = 'videos.json';
    const r = new XMLHttpRequest();
    r.open('GET', json, true);
    r.onload = () => {
      if (r.status >= 200 && r.status < 400) {
        const data = JSON.parse(r.response);
        this.Video(data);
      } else {
        console.log('villa!', r);
      }
    };
    r.onerror = () => {
      console.log('villa í tengingu');
    };
    r.send();
  }

  Video(data) {
    const Videos = data.videos;
    const url = window.location.href;
    const vidContainer = document.querySelector('.video');
    const vid = document.createElement('video');
    const overButton = document.createElement('button');
    const playImg = document.createElement('img');
    const over = document.createElement('div');
    const match = url.match(/id=(\d+)/);
    const matchid = match[1];
    vid.classList.add('vid');
    const header = document.querySelector('.video__header');

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
      const error = document.createTextNode('Myndband finnst ekki');
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
  createControls() {
    const controlContainer = document.querySelector('.video');
    const playingButton = document.createElement('button');
    const forwardButton = document.createElement('button');
    const backButton = document.createElement('button');
    const screenButton = document.createElement('button');
    const soundButton = document.createElement('button');
    const backImg = document.createElement('img');
    const playImg = document.createElement('img');
    const soundImg = document.createElement('img');
    const screenImg = document.createElement('img');
    const forwardImg = document.createElement('img');
    const divCon = document.createElement('div');
    const button = document.createElement('div');
    const aEl = document.createElement('a');
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
  skipforward() {
    const vid = document.querySelector('.vid');
    vid.currentTime += 3;
  }

  skipbackwards() {
    const vid = document.querySelector('.vid');
    vid.currentTime -= 3;
  }

  // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið
  sound() {
    const video = document.querySelector('.vid');
    if (document.querySelector('.mute')) {
      video.muted = false;
      const mute = document.querySelector('.mute');
      mute.classList.remove('mute');
      mute.classList.add('unmute');
      mute.firstChild.removeAttribute('src');
      mute.firstChild.setAttribute('src', '/img/mute.svg');
    } else {
      video.muted = true;
      const unmute = document.querySelector('.unmute');
      unmute.classList.remove('unmute');
      unmute.classList.add('mute');
      unmute.firstChild.removeAttribute('src');
      unmute.firstChild.setAttribute('src', '/img/unmute.svg');
    }
  }

  // gerir skjáinn fullscreen
  fullscreen() {
    const vid = document.querySelector('.vid');
    const rfs = vid.requestFullscreen || vid.webkitRequestFullScreen ||
    vid.mozRequestFullScreen || vid.msRequestFullscreen;
    rfs.call(vid);
  }

  playPause() {
    const vid = document.querySelector('.vid');
    if (vid.paused) {
      vid.play();
      const play = document.querySelector('.pause');
      play.classList.remove('pause');
      play.classList.add('play');
      play.firstChild.removeAttribute('src');
      play.firstChild.setAttribute('src', '/img/pause.svg');
      const dis = document.querySelector('.lay');
      dis.classList.remove('lay');
      dis.classList.add('none');
    } else {
      vid.pause();
      const pause = document.querySelector('.play');
      pause.classList.remove('play');
      pause.classList.add('pause');
      pause.firstChild.removeAttribute('src');
      pause.firstChild.setAttribute('src', '/img/play.svg');
      const none = document.querySelector('.none');
      none.classList.remove('none');
      none.classList.add('lay');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const VideoSite = new VideoRentSite();
  const player = new Player();

  const findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});
