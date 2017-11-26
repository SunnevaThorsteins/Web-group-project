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

  fetchJson() {
    const json = 'videos.json';
    const r = new XMLHttpRequest();

    r.open('GET', json, true);
    r.onload = () => {
      if (r.status >= 200 && r.status < 400) {
        const data = JSON.parse(r.response);
        console.log(data);
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
/* hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
 *þarf að vera this. á undan þeim */
  constructor() {
    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /* gætum svo þurft að bæta við add addEventListener á takkana hérna */
  }

  load() {
    this.createControles();
    /* það sem valentín gerði á töflunni ;) */
    // const request = new XMLHttpRequest();
    // const qs = new URLSerchParams(window.location.serch);
    // const id = parseInt(qs.get('id'), 10);
    // request.open. ()
    this.getVideo(); // nær í myndbandið?
  }

  // býr til grunnin að controles
  createControles() {
    const controleContainer = document.querySelector('.buttons__container');
    const playingButton = document.createElement('button');
    const forwardButton = document.createElement('button');
    const backButton = document.createElement('button');
    const fullscreenButton = document.createElement('button');
    const soundButton = document.createElement('button');
    playingButton.classList.add('button--play');
    forwardButton.classList.add('button--forward');
    backButton.classList.add('button--back');
    soundButton.classList.add('button--unmute');
    fullscreenButton.classList.add('normalSize'); // þegar myndbandið er venjulegt
    playingButton.setAttribute('click', this.playPause());
    forwardButton.setAttribute('click', this.skip(3));
    backButton.setAttribute('click', this.skip(-3));
    fullscreenButton.setAttribute('click', this.fullscreen());
    soundButton.setAttribute('click', this.sound());
    controleContainer.appendChild(playingButton);
    controleContainer.appendChild(forwardButton);
    controleContainer.appendChild(backButton);
    controleContainer.appendChild(fullscreenButton);
    controleContainer.appendChild(soundButton);
  }

  // spólar framm og til baka
  skip(value) {
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    video.currentTime += value;
  }

  // annaðhvort muta-ar eða setur hljóðið aftur á myndbandið
  sound() {
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  }

  // gerir skjáinn annaðhvort fullscreen eða tekur það af
  fullscreen() {
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndb
    if (document.querySelector('normalSize')) {
      const norm = video.querySelector('normalSize');
      norm.classList.remove('normalSize');
      norm.classList.add('fullscreenSize');
    } else {
      const full = video.querySelector('fullscreenSize');
      full.classList.remove('fullscreenSize');
      full.classList.add('normalSize');
    }
  }

  /* fær inn id af myndbandi og annaðhvort byrjar að spila það
   * eða setur það á pásu. Ætti líklega líka að breyta play takkanum
   * í pause takka og öfugt */
  playPause() {
    const video = document.querySelector('vid'); // klasinn sem þarf til þess að við vitum hvaða myndband er verið að tala um
    if (video.paused) {
      video.play();
      /* held ég sé að finna takkann sem er að hafa þetta á pásu og breyta honum í play takka */
      const play = video.querySelector('.button--pause');
      play.classList.remove('.button--pause');
      play.classList.add('.button--play');
    } else {
      video.pause();
      const pause = video.querySelector('.button--play');
      pause.classList.remove('.button--play');
      pause.classList.add('.button--pause');
    }
    return; // veit ekki hvort það þarf að vera return :/
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
