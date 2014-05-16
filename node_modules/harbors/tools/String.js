var harbors = require('../index');

harbors.String = {
    /**
     * Return a random string
     * @param length
     * @param start
     * @param end
     * @returns {string}
     */
    random: function(length, start, end){
        length = length || 15;
        var str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = start ? start.toString() : '';
        for(var i=0;i<length;i++){
            result += str[Math.random() * 62 | 0];
        }
        result += end ? end.toString() : '';
        return result;
    }
};