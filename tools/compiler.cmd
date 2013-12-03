@if (0===0) @end/*
:: ----------------------------------------------------------
:: atc - Template Compiler Tools[CMD] v1.0
:: https://github.com/cdc-im/atc
:: Released under the MIT, BSD, and GPL Licenses
:: ----------------------------------------------------------

@echo off
title loading..
cd %~dp0
call CScript.EXE "%~dpnx0" //Nologo //e:jscript %*
title Compile Tools
goto cmd
*/

// ����ǰ��ģ���Ŀ¼
var $path = '../host/www/';

// ���ô������ģ�����
var $charset = 'UTF-8';

// ���ø����������뷽ʽ(Ϊtrue���¡��ÿ���������ļ��У�Ϊfalse�򵥶�������ļ�)
var $cloneHelpers = false;

// ģ������·��
var template = require('./arttemplate/template.min.js');

// js��ʽ������·��
var js_beautify = require('./arttemplate/beautify.js');





// ����ϵͳ���API��װ
var OS = {
    
    file: {
    
        /** 
         * �ļ���ȡ
         * @param    {String}        �ļ�·��
         * @param    {String}        ָ���ַ���
         * @param     {Boolean}         �Ƿ�Ϊ����������. Ĭ��false
         * @return    {String}         �ļ�����
         */
        read: function (path, charset, isBinary) {
            charset = charset || 'UTF-8';
            var stream = new ActiveXObject('adodb.stream');
            var fileContent;

            stream.type = isBinary ? 1 : 2;
            stream.mode = 3;
            stream.open();
            stream.charset = charset;
            try {
                stream.loadFromFile(path);
            } catch (e) {
                OS.console.log(path);
                throw e;
            }
            fileContent = new String(stream.readText());
            fileContent.charset = charset;
            stream.close();
            return fileContent.toString();
        },


        /**
         * �ļ�д��
         * @param     {String}         �ļ�·��
         * @param     {String}         Ҫд�������
         * @param    {String}        ָ���ַ���. Ĭ��'UTF-8'
         * @param     {Boolean}         �Ƿ�Ϊ����������. Ĭ��false
         * @return     {Boolean}         �����Ƿ�ɹ�
         */
         write: function (path, data, charset, isBinary) {
            var stream = new ActiveXObject('adodb.stream');
            
            stream.type = isBinary ? 1 : 2;

            if (charset) {
                stream.charset = charset;
            } else if (!isBinary) {
                stream.charset = 'UTF-8';
            }
            
            try {
                stream.open();
                if (!isBinary) {
                    stream.writeText(data);
                } else {
                    stream.write(data);
                }
                stream.saveToFile(path, 2);

                return true;
            } catch (e) {
                throw e;
            } finally {
                stream.close();
            }

            return true;
        },

        
        /**
         * ö��Ŀ¼�������ļ���(������Ŀ¼�ļ�)
         * @param    {String}    Ŀ¼
         * @return    {Array}        �ļ��б�
         */
        get: (function () {
            var fso = new ActiveXObject('Scripting.FileSystemObject');
            var listall = function (infd) {
            
                var fd = fso.GetFolder(infd + '\\');
                var fe = new Enumerator(fd.files);
                var list = [];
                
                while(!fe.atEnd()) { 
                    list.push(fe.item() + '');
                    fe.moveNext();
                }
                
                var fk = new Enumerator(fd.SubFolders);
                for (; !fk.atEnd(); fk.moveNext()) {
                    list = list.concat(listall(fk.item()));
                }
                
                return list;
            };
            
            return function (path) {
                var list = [];
                try {
                    list = listall(path);
                } catch (e) {
                }
                return list;
            }
        })()
    },
    
    app: {


        /**
         * ��ȡ����·����
         * @return  {String}
         */
        getFullName: function () {
          return WScript.ScriptFullName
        },
    
        /**
         * ��ȡ���в���
         * @return    {Array}            �����б�
         */
        getArguments: function () {
            var Arguments = WScript.Arguments;
            var length = Arguments.length;
            var args = [];
            
            if (length) {
                for (var i = 0; i < length; i ++) {
                    args.push(Arguments(i));
                }
            }
            
            return args;
        },
        
        quit: function () {
            WScript.Quit(OS.app.errorlevel);
        },
        
        errorlevel: 0
    },
    
    // ����̨
    console: {
        error: function (message) {
            OS.app.errorlevel = 1;
            WScript.Echo(message);
        },
        log: function (message) {
            WScript.Echo(message);
        }
    }
};

var Global = this;
var console = OS.console;
var log = console.log;
var error = console.error;

function require (path) {
    this.$dependencies = this.$dependencies || [];
    this.$dependencies.push(path);
}

this.$dependencies = this.$dependencies || [];
for (var i = 0; i < this.$dependencies.length; i ++) {
    Global.eval(OS.file.read(this.$dependencies[i], 'UTF-8'));
}


/*-----*/


if (!Array.prototype.forEach) {
  // ES5 15.4.4.18
  // https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/array/foreach
  Array.prototype.forEach = function(fn, context) {
    for (var i = 0, len = this.length >>> 0; i < len; i++) {
      if (i in this) {
        fn.call(context, this[i], i, this);
      }
    }
  }; 
}

if (!String.prototype.trim) {
String.prototype.trim = (function() {

    // http://perfectionkills.com/whitespace-deviations/
    var whiteSpaces = [

      '\\s',
      '00A0', // 'NO-BREAK SPACE'
      '1680', // 'OGHAM SPACE MARK'
      '180E', // 'MONGOLIAN VOWEL SEPARATOR'
      '2000-\\u200A',
      '200B', // 'ZERO WIDTH SPACE (category Cf)
      '2028', // 'LINE SEPARATOR'
      '2029', // 'PARAGRAPH SEPARATOR'
      '202F', // 'NARROW NO-BREAK SPACE'
      '205F', // 'MEDIUM MATHEMATICAL SPACE'
      '3000' //  'IDEOGRAPHIC SPACE'

    ].join('\\u');

    var trimLeftReg = new RegExp('^[' + whiteSpaces + ']+');
    var trimRightReg = new RegExp('[' + whiteSpaces + ']+$');

    return function() {
      return String(this).replace(trimLeftReg, '').replace(trimRightReg, '');
    }

  })();
}



/*!
 * ģ�������
 * @param   {String}    ģ��
 * @param   {String}    �ⲿ��������·���������������Ѹ����������ƺ���뵽�����ڣ�
 * @return  {String}    ����õ�ģ��
 */
var compiler = (function () {

    template.isCompress = true;


    // ��ȡincludeģ��
    // @see https://github.com/seajs/seajs/blob/master/src/util-deps.js
    var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*include|(?:^|[^$])\binclude\s*\(\s*(["'])(.+?)\1\s*(,\s*(.+?)\s*)?\)/g; //"
    var SLASH_RE = /\\\\/g

    var parseDependencies = function (code) {
        var ret = [];
        var uniq = {};

        code
        .replace(SLASH_RE, "")
        .replace(REQUIRE_RE, function(m, m1, m2) {
            if (m2 && !uniq.hasOwnProperty(m2)) {
                ret.push(m2);
                uniq[m2] = true;
            }
        });

      return ret
    };


    // ��װ��RequireJS��SeaJSģ��
    var toModule = function (code, helpersPath) {

        template.onerror = function (e) {
            throw e;
        };

        var render = template.compile(code); // ʹ��artTemplate����ģ��
        

        render = render.toString()
        .replace(/^function\s+(anonymous)/, 'function');


        // SeaJS��RequireJS�淶�����·��ǰ����Ҫ����.��
        var fixPath = function (path) {
            path = path
            .replace(/\\/g, '/')
            .replace(/\.js$/, '');

            if (!/^(\.)*?\//.test(path)) {
                path = './' + path;
            }
            return path;
        };


        var dependencies = [];
        parseDependencies(render).forEach(function (path) {
            dependencies.push(
                '\'' + path + '\': ' + 'require(\'' + fixPath(path) + '\')'
            );
        });
        var isDependencies = dependencies.length;
        dependencies = '{' + dependencies.join(',') + '}';


        // �����������
        var helpers;

        if (helpersPath) {

            helpersPath = fixPath(helpersPath);

            helpers = 'require(\'' + helpersPath + '\')';

        } else {

            helpers = [];
            var prototype = render.prototype;

            for (var name in prototype) {
                if (name !== '$render') {
                    helpers.push(
                        '\'' + name + '\': ' + prototype[name].toString()
                    );
                }
            }
            helpers = '{' + helpers.join(',') + '}';
        }


        code =
        (isDependencies ? 'var dependencies=' + dependencies + ';' : '')
        +      'var helpers = ' + helpers + ';'
        +      (isDependencies ? 'var $render=function(id,data){'
        +          'return dependencies[id](data);'
        +      '};' : '')
        +      'var Render=' + render  + ';'
        +      'Render.prototype=helpers;'
        +      'module.exports = function(data){'
        +          (isDependencies ? 'helpers.$render=$render;' : '')
        +          'return new Render(data) + \'\';'
        +      '}';
        
        
        return code;
    };


    // �ⲿJS��ʽ������
    var format = function(code) {

        if (typeof js_beautify !== 'undefined') {

            js_beautify =
            typeof js_beautify === 'function'
            ? js_beautify
            : js_beautify.js_beautify;

            var config = {
                indent_size: 4,
                indent_char: ' ',
                preserve_newlines: true,
                braces_on_own_line: false,
                keep_array_indentation: false,
                space_after_anon_function: true
            };

            code = js_beautify(code, config);
        }
        return code;
    };

    return function (source, helpersPath) {
        var code = toModule(source, helpersPath);
        return format(code);
    }

})();


// Canonicalize a path
// realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
function realpath (path) {
  var DOT_RE = /\/\.\//g
  var MULTIPLE_SLASH_RE = /([^:\/])\/\/+/g
  var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//g

  path = path.replace(DOT_RE, "/")

  path = path.replace(MULTIPLE_SLASH_RE, "$1\/")

  while (path.match(DOUBLE_DOT_RE)) {
    path = path.replace(DOUBLE_DOT_RE, "/")
  }

  return path
}

// ���·��ת��Ϊ����·��
if (/^\./.test($path)) {
  $path = realpath((OS.app.getFullName().replace(/[^\/\\]*?$/, '') + $path).replace(/\\/g, '/'));
}


log('$path = ' + $path);
log('-----------------------');




// �Ѹ����������Ϊ�������ļ�
var writeHelpers = function () {

    if ($cloneHelpers) {
        return;
    }

    var helpersName = 'helpers.js';

    var helpers = [];
    var path = $path + helpersName;
    var prototype = template.prototype;

    for (var name in prototype) {
        if (name !== '$render') {
            helpers.push('\'' + name + '\': ' + prototype[name].toString());
        }
    }
    helpers = '{\r\n' + helpers.join(',\r\n') + '}';

    var module = 'module.exports = ' + helpers;

    if (typeof js_beautify !== 'undefined') {
        var config = {
            indent_size: 4,
            indent_char: ' ',
            preserve_newlines: true,
            braces_on_own_line: false,
            keep_array_indentation: false,
            space_after_anon_function: true
        };
        module = typeof js_beautify === 'function'
        ? js_beautify(module, config)
        : js_beautify.js_beautify(module, config);
    }


    OS.file.write(path, module, $charset);

    return helpersName;
};



var helpersName = writeHelpers();
var args = OS.app.getArguments(); // ��ȡʹ����ק��ʽ�򿪵��ļ��б�
var list = args.length ? args : OS.file.get($path); // ��������ļ��б�


list.forEach(function (path, index) {
    // ��·�� "\" ת���� "/"
    path = list[index] = path.replace(/\\/g, '/');
    
    // �Ϸ���У��
    if (path.indexOf($path) !== 0) {
        error('���棺' + path + '����ģ��Ŀ¼�У����ܵ���·������');
    }
});


// ��������е�ģ��
list.forEach(function (path) {
    var SUFFIX_RE = /\.(html|htm|tpl)$/i;
    if (!SUFFIX_RE.test(path)) {
        return;
    }

    var name = helpersName;
    
    // ���㸨������ģ������·��
    if (name) {
        var prefix = './';
        var length = path.replace($path, '').replace(/[^\/]/g, '').length;

        if (length) {
          prefix = (new Array(length + 1)).join('../');
        }

        name = prefix + name;
    }

    log('����: ' + path);

    var source = OS.file.read(path, $charset);
    var code = compiler(source, name);
    var target = path.replace(SUFFIX_RE, '.js');

    OS.file.write(target, code, $charset);

    log('���: ' + target);
});

log('-----------------------');
log('����');

OS.app.quit();

/*-----------------------------------------------*//*
:cmd
::if %errorlevel% == 0 exit
pause>nul
exit
*/





