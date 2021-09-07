var letter = [];
function convert(list) {
    var result=[];
    list.forEach(el => {
       result.push(String.fromCharCode(el)); 
    });
    return result;
}

//letters
letter['b'] = convert([0x92C]);
letter['c'] = convert([0x915, 0x938]);
letter['d'] = convert([0x926, 0x921, 0x95C]);
letter['f'] = convert([0x92B]);
letter['g'] = convert([0x917]);
letter['h'] = convert([0x939]);
letter['j'] = convert([0x91C]);
letter['k'] = convert([0x915]);
letter['l'] = convert([0x932]);
letter['m'] = convert([0x92E, 0x902]);
letter['n'] = convert([0x928, 0x902, 0x901]);
letter['p'] = convert([0x92A]);
letter['q'] = convert([0x915]);
letter['r'] = convert([0x930]);
letter['s'] = convert([0x938]);
letter['t'] = convert([0x91F, 0x924]);
letter['v'] = convert([0x935]);
letter['w'] = convert([0x935]);
letter['x'] = convert([0x91C]);
letter['y'] = convert([0x92F]);
letter['z'] = convert([0x95B]);
letter['halant'] = convert([0x94D]);

//digits
letter['0'] = convert([0x966]);
letter['1'] = convert([0x967]);
letter['2'] = convert([0x968]);
letter['3'] = convert([0x969]);
letter['4'] = convert([0x96A]);
letter['5'] = convert([0x96B]);
letter['6'] = convert([0x96C]);
letter['7'] = convert([0x96D]);
letter['8'] = convert([0x96E]);
letter['9'] = convert([0x96F]);

//sounds
letter['a'] = convert([0x905, 0x93E]);
letter['aa'] = convert([0x906, 0x93E]);
letter['i'] = convert([0x907, 0x93F]);
letter['ee'] = convert([0x908, 0x940]);
letter['u'] = convert([0x909, 0x941]);
letter['oo'] = convert([0x90A, 0x942]);
letter['e'] = convert([0x90F, 0x947]);
letter['ai'] = convert([0x910, 0x948]);
letter['o'] = convert([0x913, 0x94B]);
letter['au'] = convert([0x914, 0x94C]);
letter['ou'] = convert([0x914, 0x94C]);
letter['ri'] = convert([0x90B, 0x943]);
letter['ei'] = letter['ee'];

//letter combinations
letter['bh'] = convert([0x92D]);
letter['ch'] = convert([0x91A]);
letter['chh'] = convert([0x91B]);
letter['dh'] = convert([0x927, 0x922, 0x95D]);
letter['fh'] = convert([0x95E]);
letter['gh'] = convert([0x918]);
letter['jh'] = convert([0x91D]);
letter['kh'] = convert([0x916]);
letter['ph'] = convert([0x92B]);
letter['sh'] = convert([0x936, 0x937]);
letter['th'] = convert([0x920, 0x925]);
letter['gy'] = [String.fromCharCode(0x91C)+String.fromCharCode(0x94D)+String.fromCharCode(0x91E)];

//other symbols
letter['='] = ['='];
letter[','] = [','];
letter['"'] = ['"'];
letter["'"] = ["'"];
letter['.'] = ['.'];
letter['{'] = ['{'];
letter['}'] = ['}'];
letter['-'] = ['-'];
letter['+'] = ['+'];
letter['<'] = ['<'];
letter['>'] = ['>'];
letter['?'] = ['?'];
letter['/'] = ['/'];
letter['\\'] = ['\\'];
letter[':'] = [':'];
letter[';'] = [';'];
letter['['] = ['['];
letter[']'] = [']'];
letter['|'] = ['|'];
letter['`'] = ['`'];
letter['~'] = ['~'];
letter['!'] = ['!'];
letter['@'] = ['@'];
letter['#'] = ['#'];
letter['$'] = ['$'];
letter['%'] = ['%'];
letter['^'] = ['^'];
letter['&'] = ['&'];
letter['*'] = ['*'];
letter['('] = ['('];
letter[')'] = [')'];
letter['_'] = ['_'];

module.exports = letter;
