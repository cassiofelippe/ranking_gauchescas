window.onload = function() {
  $(document).ready(function() {
    let dragger = tableDragger(document.querySelector('table#ranking'), {
      mode: 'row',
      dragHandler: '.handler',
      onlyBody: true
    });

    dragger.on('drop',function(from, to){
      console.log(from);
      console.log(to);
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

