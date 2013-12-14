define(function(require,exports,module){
    var zoom = function($img,type){
        if(typeof($img)!='object')
            $img = $($img);
        var Calculation = function($o){
            var $p = $o.parent();
            var pW =$p .width();
            var pH = $p.height();
            var tW = $o.width();
            var tH = $o.height();
            var WRatio = pW/tW;
            var HRatio = pH/tH;
            var Ratio = 0;
            type
                ? (Ratio=Math.max(WRatio,HRatio))
                : (Ratio=Math.min(WRatio,HRatio));
            tW = Math.ceil(tW*Ratio);
            tH = Math.ceil(tH*Ratio);
            $o.width(tW);
            $o.height(tH);
            $o.css('marginLeft',(pW-tW)/2);
            $o.css('marginTop',(pH-tH)/2);
        };
        $img.each(function(){
            var $this = $(this);
            $this.load(function(){
                Calculation($this);
            });
            Calculation($this);
        });
    };

    exports.init = function(){
        zoom('.main .right img',true);
        var $wrapper = $('.wrapper:first');
        var _Width = $wrapper.width();
        $(window).resize(function(){
            var w = $wrapper.width();
            if(w!=_Width){
                _Width = w;
                zoom('.main .right img',true);
            }
        });
    }
});