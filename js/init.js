(function() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
        var s = scripts[i];
        if (s.getAttribute("type") != "snippet") {
            continue
        }
        var lines = s.textContent.replace(/^\s*\r?\n/,'').replace(/\t/, '    ').split(/\r?\n/);
        var text = '';
        var maxlen = 0;
        var offset = 0;
        for (var j = 0; j < lines[0].length; j++) {
            if (lines[0][j] == ' ') {
                offset += 1;
            } else {
                break;
            }
        }
        for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            var loffset = 0;
            for (var k = 0; k < line.length; k++) {
                if (line[k] == ' ') {
                    loffset += 1;
                } else {
                    break;
                }
                if (loffset == offset) {
                    break;
                }
            }
            line = line.substring(loffset)
            if (line.length > maxlen) {
                maxlen = line.length;
            }
            text += line + "\n";
        }
        text = text.replace(/['"<>]/g, function(x) { return { '"': '&quot;', "'": '&apos;', '<': '&lt;', '>': '&gt;' }[x] });
        var c = document.createElement('code');
        c.innerHTML = text;
        if (s.getAttribute("lang")) {
            c.className += " lang-"  + s.getAttribute("lang");
        }
        var p = document.createElement('pre');
        if (maxlen > 55 && !s.getAttribute("noscale")) {
            p.style['font-size'] = Math.floor(55/maxlen*20)*5 + '%';
        }
        p.appendChild(c);
        s.parentNode.replaceChild(p, s);
        hljs.highlightBlock(c);
    }
})();
