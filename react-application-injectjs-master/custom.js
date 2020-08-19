if ((window.location.href.indexOf('Style%20Library') > 0))
    {
    
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = '/sites/dev/Style%20Library/custom.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }