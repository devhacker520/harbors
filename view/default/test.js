/**
 * Created with JetBrains WebStorm.
 * User: sj
 * Date: 13-11-13
 * Time: 下午5:24
 * To change this template use File | Settings | File Templates.
 */
function aa(cc)
{
    cc();
}

function bb()
{

    aa(function(){
        var obj={};//变量在回调函数内部

        for(var i=0;i<20000000;i++)
        {
            obj[i]=i;
        }
        console.log(obj[1]);
        obj=null;//把变量设置为空，内存也不能释放

    })
}
bb();

//设置定时器，保持进程不退出
setInterval(function(){bb()},10000);