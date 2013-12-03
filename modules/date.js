/**
 * date相关功能
 */

/**
 * newList使用的格式化时间方法，格式化成 November 5, 2013
 * @param date
 */
exports.newList = function(date){
    var monthList = {
        0:'January',
        1:'February',
        2:'March',
        3:'April',
        4:'May',
        5:'June',
        6:'July',
        7:'August',
        8:'September',
        9:'October',
        10:'November',
        11:'December'
    };
    var date = new Date();
    return monthList[date.getMonth()]+' '+date.getDate()+','+date.getFullYear();
};