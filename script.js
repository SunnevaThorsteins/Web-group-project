class VideoRentSite {
  constructor() {
    // this.keyName = 'videos';
    this.container = document.querySelector('.videos');
  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */
  load() {
  }


  /* sér um að littli kassinn sem er með lengd myndbandsins sé
   * settur rétt inn, fær inn lengdina í sekúndum og skilar
   * á forminu mín:sek */
  /* þetta fall er á mjög miklu tilraunarstigi */
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

  /* sér um að það sé rétt lengd frá því myndbandið var birt.
     *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
     *langt er síðan myndbandið var birt */
  sincePosted(made) {
    /* þarf að setja betur upp en þetta er svona í grófum dráttum
     * gæti verið að við gætum notað const */
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

  createVideolist(data) {
    const categories = data.categories;
    const videos = data.videos;

    for (let i=0; i<categories.length; i++) {
      console.log('****************TELJARIII****************');
      const cats = categories[i];
      const VideoContainer = document.getElementById(i);
      const heading = document.createElement('h2');

      heading.appendChild(document.createTextNode(categories[i]['title']));
      VideoContainer.appendChild(heading);
      this.createCategorylist(VideoContainer, cats, videos);
    }
  }

  createCategorylist(VideoContainer, cats, videos) {
    for (let i = 0; i <= cats.videos.length - 1; i++) {
      console.log('*************', [i + 1], '*************');
      const id = cats.videos[i];
      const col = document.createElement('div'); //fast
      col.classList.add('cardlist__col');
      const videlement = this.createVideoElement(col, videos[id - 1]['poster'], videos[id - 1]['video'], videos[id - 1]['title'], videos[id - 1]['created'], videos[id - 1]['duration'], videos[id - 1]['id']);
      VideoContainer.appendChild(col);
    }
  }

  createVideoElement(col, poster, video, title, posted, duration, id) {
    console.log('poster', poster);
    console.log('video', video);
    console.log('title', title);
    console.log('posted', posted);
    console.log('duration', duration);
    console.log('id', id);
    const card = document.createElement('div');
    const cardContent = document.createElement('div');
    const aElement = document.createElement('a');
    const cardImg = document.createElement('img');
    const cardHeading = document.createElement('h3');
    const since = document.createElement('p');
    const length = document.createElement('p');
    col.classList.add('cardlist__col');
    card.classList.add('card');
    aElement.setAttribute('href', 'site.html');
    aElement.classList.add('card__imgCont');
    cardImg.classList.add('card__img');
    cardImg.setAttribute('src', poster);
    cardContent.classList.add('cardContent');
    since.classList.add('cardText');
    length.classList.add('time');
    cardHeading.appendChild(document.createTextNode(title));
    since.appendChild(document.createTextNode(this.sincePosted(posted)));
    length.appendChild(document.createTextNode(this.videoLength(duration)));
    col.appendChild(card);
    aElement.appendChild(length);
    aElement.appendChild(cardImg);
    card.appendChild(aElement);
    cardContent.appendChild(cardHeading);
    cardContent.appendChild(since);
    card.appendChild(cardContent);
  }

  getId(data) {
    const id = data.videos['id'];
    console.log('************ID*****************', id);
    document.images.addEventListener("click", this.WriteId(id), false);
  }

  WriteId (id) {
    console.log('************ID*****************', id);
  }

  fetchJson() {
    const json = 'videos.json';
    const r = new XMLHttpRequest();

    r.open('GET', json, true);
    r.onload = () => {
      if (r.status >= 200 && r.status < 400) {
        const data = JSON.parse(r.response);
        console.log(data);
        this.createVideolist(data);
        this.getId(data);
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
/* hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
 *þarf að vera this. á undan þeim */
  constructor() {
    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /* gætum svo þurft að bæta við add addEventListener á takkana hérna */
  }

  tempVid() {
    const vidContainer = document.querySelector('.video');
    const div = document.createElement('div');
    const vid = document.createElement('video');
    const overButton = document.createElement('button');
    const playImg = document.createElement('img');
    const overlay = document.createElement('div');
    div.classList.add('vidContainer');
    vid.classList.add('vid');
    vid.setAttribute('src', '/videos/bunny.mp4');
    vid.setAttribute('type', 'video/mp4');
    overButton.classList.add('display');
    playImg.setAttribute('src', '/img/play.svg');
    overlay.classList.add('overlay');
    playImg.classList.add('button');
    overButton.appendChild(playImg);
    overlay.appendChild(overButton);
    overButton.addEventListener('click', this.playPause.bind());
    div.appendChild(vid);
    div.appendChild(overlay);
    vidContainer.appendChild(div);
  }

  load() {
    this.tempVid();
    this.createControls();
    /* það sem valentín gerði á töflunni ;) */
    // const request = new XMLHttpRequest();
    // const qs = new URLSerchParams(window.location.serch);
    // const id = parseInt(qs.get('id'), 10);
    // request.open. ()
    // this.getVideo(); // nær í myndbandið?
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
    screenButton.classList.add('normalSize'); // þegar myndbandið er venjulegt
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
    const video = document.querySelector('.vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
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
    const vid = document.querySelector('.vid'); // klasinn sem þarf til þess að við vitum hvaða myndband er verið að tala um
    if (vid.paused) {
      vid.play();
      const play = document.querySelector('.pause');
      play.classList.remove('pause');
      play.classList.add('play');
      play.firstChild.removeAttribute('src');
      play.firstChild.setAttribute('src', '/img/pause.svg');
      const dis = document.querySelector('.display');
      dis.classList.remove('display');
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
      none.classList.add('display');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const VideoSite = new VideoRentSite();
  const player = new Player();
  VideoSite.fetchJson();
  const findingClass = document.querySelector('.cardlist');
  if (findingClass) {
    VideoSite.load();
  } else {
    player.load();
  }
});
