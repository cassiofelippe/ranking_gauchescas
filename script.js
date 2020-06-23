window.onload = function() {
  $(document).ready(function() {
    let tracks = [
      {
        id: 1,
        name: 'Querência Amada',
        artist: 'Oswaldir & Carlos Magrão',
        youtube: '',
        spotify: 'https://open.spotify.com/track/0aEaDpVX8uSNZUrl0LSCb2?si=vj7nUlDnRVCWD5Objp7htg'
      },
      {
        id: 2,
        name: 'Veterano',
        artist: 'Leopoldo Rassier',
        youtube: '',
        spotify: 'https://open.spotify.com/track/0kbhaFa3siTlOAwtPc3NcB?si=zypOIT3FSNyjeC6fX2LbxA'
      },
      {
        id: 3,
        name: 'Timbre de Galo',
        artist: 'Pedro Ortaça',
        youtube: '',
        spotify: 'https://open.spotify.com/track/3dY5uFXD0ulsupJXEj6pcS?si=nWo_hu3eRMyRDRE8r7wzew'
      }
    ];

    tracks.forEach(t => {
      let tbody = document.querySelector('table#ranking > tbody');
      let tr = document.createElement('tr');
      let id = document.createElement('td');
      id.innerText = t['id'];
      let name = document.createElement('td');
      name.innerText = t['name'];
      let artist = document.createElement('td');
      artist.innerText = t['artist'];
      let links = document.createElement('td');
      // let youtube = document.createElement('svg');
      links.innerHTML = `
        <svg onclick="alert()" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
        <svg onclick="alert()" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/>
        </svg>
      `;
      let handler = document.createElement('td');
      handler.className = 'handler';
      handler.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
          <path d="M12 0l8 10h-16l8-10zm8 14h-16l8 10 8-10z"/>
        </svg>
      `;
      tr.appendChild(id);
      tr.appendChild(name);
      tr.appendChild(artist);
      tr.appendChild(links);
      tr.appendChild(handler);
      tbody.appendChild(tr);
    });

    let dragger = tableDragger(document.querySelector('table#ranking'), {
      mode: 'row',
      dragHandler: '.handler',
      onlyBody: true
    });

    dragger.on('drop',function(from, to) {
      let first = tracks[from - 1];
      let second = tracks[to - 1];
      first['id'] = to;
      second['id'] = from;
    });

    const url = `https://open.spotify.com/`;

    request = function({route = 'track', id, body, method = 'GET', callback = function(){}} = {}) {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            return callback(JSON.parse(request.responseText)['response']);
          } else if (![200].includes(this.status)) {
            alert('Request failed!');
          }
        }
      };

      request.open(method, `${url}/${route}/${id}`);
      request.send();
    };

    getTrack = function() {
      request({route: 'track', id: '0kbhaFa3siTlOAwtPc3NcB'});
    };

    create = function(tag) {
      return document.createElement(tag);
    };

    createTr = function({route, text, action, body, method, callback} = {}) {
      let tr = create('tr');
      let button = create('button');

      action = this[action];

      button.onclick = function() {
        return action({route, body, method, callback});
      }
      button.innerText = text;
      tr.appendChild(button);

      return tr;
    };

    createTables = function({item, tbody} = {}) {
      for (const key in item) {
        let tr = create('tr');

        let tdKey = create('td');
        tdKey.appendChild(document.createTextNode(key));
        tr.appendChild(tdKey);
        let tdValue = create('td');
        tdValue.appendChild(document.createTextNode(item[key]));
        tr.appendChild(tdValue);
        
        tbody.appendChild(tr);
      }
    };
  });
}

