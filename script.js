class VideoRentSite {

  constructor() {
    //this.keyName = 'videos';
    this.container = document.querySelector('.videos');
  }

  /* þetta er fallið sem vil lendum fyrst í þegar við byrjum */
  load() {
  }

  createVideolist(data) {
    console.log(data);
    const categories = data.categories;
    console.log(categories);
    const videos = data.videos;
    console.log(videos);

    for (let i=0; i<categories.length; i++) {
      const cats = categories[i];
      console.log('CATS', cats);
      this.createCategorylist(cats, videos);
    }
  }

  createCategorylist(cats, videos) {
    const div = document.createElement('div');
    console.log(div);
    //...
    appendChild(createTextNode(cats.title));
    for (let i=0; i<=cats.videos.length; i++) {
      const id = cats.videos[i];
      const video = videos.find(videos => videos.id === id);
    }
    const el = createVideolist(video);
  }

  /* sér um að littli kassinn sem er með lengd myndbandsins sé
   * settur rétt inn, fær inn lengdina í sekúndum og skilar
   * á forminu mín:sek */
  /* þetta fall er á mjög miklu tilraunarstigi */
  videoLenght(duration) {
    if (duration < 60) {
      if (duration < 10) {
        return '0:0' + duration;
      } else {
        return "0:" + duration;
      }
    } else {
      const min = parseInt(duration/60);
      const sec = duration -(min*60);
      if (sec < 10){
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }
  }

  /* sér um að það sé rétt lengd frá því myndbandið var birt.
     *fær inn lengdina í millisekúndum og skilar streng sem segir til um hversu
     *langt er síðan myndbandið var birt */
  sincePosted(created) {
    /* þarf að setja betur upp en þetta er svona í grófum dráttum
     * gæti verið að við gætum notað const */
      var current = new Date().getTime();
      var created = current - created;
      var sec = created/1000;
      var min = sec/60;
      var klst = min/60;
      var day = klst/24;
      var week;
      var month;
      var year;

      /*ef meira en 365 dagar síðan "created"*/
      // const hours

      if (day >= 365) {
        year = parseInt(day/365);
        if (year === 1) {
          return 'Fyrir ' + year + ' ári síðan';
        }
        else {
          return 'Fyrir ' + year + ' árum síðan';
        }
      }
      /*ef meiri en 30 dagar síðan "created"*/
      else if (day >= 30) {
        month = parseInt(day/30);
        if (month === 1) {
          return 'Fyrir ' + month + ' mánuði síðan';
        }
        else {
          return 'Fyrir ' + month + ' mánuðum síðan';
        }
      }
      /*ef meira en 7 dagae er síðan "created"*/
      else if (day >= 7) {
        week = parseInt(day/7);
        if(week === 1) {
          return 'Fyrir ' + week + ' viku síðan';
        }
        else {
          return 'Fyrir ' + week + ' vikum síðan';
        }
      }
      /*ef meira en 24klst síðan "created"*/
      else if (klst >= 24){
        day = parseInt(day);
        if (day === 1) {
          return 'Fyrir ' + day + ' degi síðan';
        }
        else {
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

  createElement(poster, /* video? ,*/ title) {
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

/*hér á að skilgreina tilviksbreytur, allar breytur sem við viljum upphafsstilla
 *þarf að vera this. á undan þeim*/
  constructor() {
    this.keyName = 'player';
    this.player = document.querySelector('.player');
    this.controls = document.querySelector('.controls');
    this.back = document.querySelector('.back');
    /*gætum svo þurft að bæta við add addEventListener á takkana hérna*/
  }

  load() {
    //const request = new XMLHttpRequest();
    //const qs = new URLSerchParams(window.location.serch);
    //const id = parseInt(qs.get('id'), 10);
    // request.open. ()
  }

/* fær inn id af myndbandi og annaðhvort byrjar að spila það
 * eða setur það á pásu. Ætti líklega líka að breyta play takkanum
 * í pause takka og öfugt */
  playPause(videoId){
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
