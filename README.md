# Stóra verkefni 2:

Til þess að opna þetta verkefni þarf að fylgja eftirfarandi leiðbeiningum:

1. Fyrst þarf að downloda git og node (sjá mikilvægir linkar hér fyrir neðan). Passa þarf upp á að fylgja réttum leiðbeiningum fyrir stýrikerfið í þeirri tölvu sem notast er við.

2. Næst þarf á að klóna repo-ið af github inná local hjá notanda (sjá mikilvægir linkar hér fyrir neðan). Það er gert með því að fara upp í hægra hornið á upphafssíðunni á githup repoi verkefnisins. Þar er grænn takki sem á stendur "clone or download". Þá kemur upp gluggi sem m.a. inniheldur link. Það þarf að copy-a þann link, en hann mun gera notandanum keift að opna þetta verkefni í sinni tölvu.


3. Síðan er farið í command line glugga og stimpla inn eftirfarandi skipanir
  - cd /
  - cd ...slóð á þann stað í tölvunni sem verkefnið á að vera í...
  - npm install (setur upp node pakkastjórann í tölvunni)
  - git clone ...linkur í verkefni frá skrefi 2...
  - npm run dev (dev er skipun sem er búin að linka saman sass og browser sink í pacagejson skránni)

4. Núna ætti síðan að vera búin að opnast á vefnum.

Mikilvægir linkar: 
   - git download: https://github.com/hthg13/Stort-verkefni-2.git
   - node download: https://nodejs.org/en/download/current/
   - github repo: https://github.com/hthg13/Stort-verkefni-2
   
****************************************
Uppsetning verkefnisins: 

- verkefnið er samansett af mörgum skrám. Aðalskrárnar eru í lausu inní repoinu það eru t.d. tvær grunn html skrár, pacagejson, styleguid.css styles.css ofl.
- Nánast öllum upplýsingum er hlaðið inn gengum css eða javaScript. 
-Það er ein javaSript skrá sem heitir script.js. 
- minni scss skrár eru svo allar saman í möppunni scss. Þeim er öllum importað inn í styles.sass skránna sem síðan þýðist yfir í styles.css srkánna sem stílar í verkefninu.

****************************************
Upplýsingar um aðstandendur verkefnisins:

- Ásdís Erla Jóhannsdóttir: aej25@hi.is
- Helga Þöll Guðjónsdóttir: hthg13@hi.is
- Sunneva Þorsteinsdóttir: sth334@hi.is
