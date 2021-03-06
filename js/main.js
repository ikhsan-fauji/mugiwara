// show navbar in the small device
function showNavBar () {
  const navMenu = document.getElementById('mobile-menu');
  if (navMenu.style.display === 'block') {
    navMenu.style.display = 'none';
  } else {
    navMenu.style.display = 'block';
  }
}

function home () {
  arc(3, 'Arc Terbaru'); // load 3 arc for home content
}

function back () {
  // back to previous history
  window.history.go(-1);
}

// Limit the displayed article as preview
function previewArticle () {
  const previews = document.querySelectorAll('.preview');
  for (const preview of previews) {
    // limit description to 150 character
    preview.innerHTML = preview.innerHTML.slice(0, 150) + ' ... ';
  }
}

// Add click event for all detail class
function detail () {
  const details = document.querySelectorAll('.detail');
  for (const detail of details) {
    detail.addEventListener('click', function () {
      // get detail dataset attribute to save in the local storage
      localStorage.setItem('detail', detail.dataset.detail);
    })
  }
}

function arc (max, title) {
  // If max parameter is defined, The rendered arcs will be displayed as many parameters
  const arcList = max ? arcData.slice(0, max) : arcData;
  let article = `<h2 class="section-title">${ title ? title : 'List Arc' }</h2>`;
  // Iterating each arc element
  for (const arc of arcList) {
    article += `
      <article class="card arc-box">
        <figure class="arc-image">
          <img src="${ arc.image }" alt="Wano Kuni">
        </figure>

        <section class="arc-detail">
          <h3 class="title">
            <a href="arc-detail.html" class="detail" data-detail="${ arc.id }">${ arc.title }</a>
          </h3>

          <p class="sub-title">Chapter: ${ arc.startChapter } - ${ arc.endChapter }</p>
          <p class="arc-description preview">${ arc.description }</p>

          <a href="arc-detail.html" class="btn-default detail" data-detail="${ arc.id }">Detail</a>
        </section>
      </article>
      \n`;
  }
  // Embedding the arcs element to the content
  const element = document.getElementById('content');
  element.innerHTML = article;

  detail();
  previewArticle();
}

function arcDetail () {
  const id = localStorage.getItem('detail');
  if (id) {
    const selectedArc = arcData.filter(arc => arc.id === parseInt(id))[0];
    if (selectedArc !== undefined && selectedArc !== null) {
      const detail = `
        <h2 class="section-title">Arc Detail</h2>

        <article class="card arc-detail-box">
          <figure class="arc-detail-image">
            <img src="${ selectedArc.image }" alt="${ selectedArc.alt }">
          </figure>

          <section class="detail-description">
            <h3 class="title"><a href="#">${ selectedArc.title }</a></h3>
            <p class="sub-title">Chapter: ${ selectedArc.startChapter } - ${ selectedArc.endChapter }</p>
            <p class="arc-description">${ selectedArc.description }</p>
          </section>
        </article>

        <button class="btn-default detail" onclick="window.history.go(-1)">Back</button>
      `;
      // Embedding the detail element to the content
      const element = document.getElementById('content');
      element.innerHTML = detail;
    } else {
      alert('Arc tidak tersedia');
      back();
    }
  } else {
    alert('Oops terdapat kesalahan saat mengambil data');
    back();
  }
}

function characters () {
  let crewData = '<h2 class="section-title">Kru Topi Jerami</h2>';
  for (const crew of strawHatPirates) {
    crewData += `
    <article class="card-outline character-box">
      <figure class="character-image">
        <img src="${ crew.image }" alt="Gambar ${ crew.name }">
      </figure>

      <section class="character-detail">
        <h3 class="title">
          <a href="character-detail.html" class="detail" data-detail="${ crew.id }">${ crew.name }</a>
        </h3>

        <p class="sub-title">${ crew.position }</p>
      </section>
    </article>
    `;
  }

  // Embedding the character elements to the content
  const element = document.getElementById('content');
  element.innerHTML = crewData;
  detail();
}

function characterDetail () {
  const id = localStorage.getItem('detail');
  if (id) {
    const character = strawHatPirates.filter(crew => crew.id === parseInt(id))[0];
    if (character !== undefined && character !== null) {
      const detail = `
        <h2 class="section-title">Kru Topi Jerami</h2>

        <article class="card-outline character-detail-box">
          <figure class="character-detail-image">
            <img src="${ character.image }" alt="Gambar ${ character.name }">
          </figure>

          <section class="character-detail">
            <h3 class="title"><a href="#">${ character.name }</a></h3>
            <p class="sub-title">${ character.position }</p>

            <table id="tb-detail">
              <tr>
                <th>Jenis Kelamin</th>
                <td>${ character.sex }</td>
              </tr>
              <tr>
                <th>Usia</th>
                <td>${ character.age }</td>
              </tr>
              <tr>
                <th>Ulang Tahun</th>
                <td>${ character.brithDay }</td>
              </tr>
              <tr>
                <th>Tinggi</th>
                <td>${ character.height } Cm</td>
              </tr>
            </table>

            <button class="btn-default detail btn-character-detail" onclick="window.history.go(-1)">Back</button>
          </section>
        </article>

        <article class="card-outline detail-overview">
          <h3 class="title"><a href="#">${ character.name }</a></h3>

          <h4>Harga Buronan</h4>
          <p>${ character.bounty } Beli</p>

          <h4>Buah Setan</h4>
          <p>${ character.devilFruit  || '-'}</p>

          <h4>Intro</h4>
          <div>${ character.introduction }</div>

          <h4>Kilas Kekuatan dan Kemampuan</h4>
          <p>${ character.powersAndAbilityOverview }</p>
        </article>
      `;
      // Embedding the detail element to the content
      const element = document.getElementById('content');
      element.innerHTML = detail;
    } else {
      alert('Character tidak tersedia');
      back();
    }
  } else {
    alert('Oops terdapat kesalahan saat mengambil data');
    back();
  }
}


function showQuotes (index = 0) {
  const quoteElement = document.getElementById('quotes')
  const displayedQuote = `
  <article class="card-outline">
    <h1 class="quote">${ quotes[index].quote }</h1>
    <p class="quote-by">${ quotes[index].quoteBy }</p>
  </article>
  `;

  quoteElement.innerHTML = displayedQuote;

  index++;
  if (index === quotes.length) index = 0;

  // change the quote every 5 second
  setTimeout(() => {
    showQuotes(index);
  }, 5000)
}

showQuotes();
