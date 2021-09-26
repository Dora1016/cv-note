// 通过css选择器找到元素
let demo = document.querySelector("#demo")  


let string=`
你好呀，我是前端小白白
接下来我要加样式啦
我要加的样式是
body{
    color:red;
}
`
// 解决换行符出现的问题
// 那能不能不在这里替换呢？去计时器函数看当前的字符是什么，发现一个回车就立即变成html标签，也就是一下子就变成4个字符
// string.substring(0,n)我就不能再是0-n了，因为顺序变了，之前是12345...现在就要1对4啦，那这个顺序就不一致了，
// 我们需要一个字符串来容纳我们要展示的字符串，所以有了字符串2
let string2 = ''


// 注意回车在html里会变成空格，我们要把回车变成html里面的回车string.replace('把啥'，'变啥')
// 但是replace之后把第一个回车变成br,需要使用正则表达式//g
// string = string.replace(/\n/g, '<br>')  
// 当换行还是没有出现时，就打印那个字符出了问题string[n]
// 然鹅换行时出现了，但是！！！因为我们用的是innerHtml,就一定会出现html标签<b会被用户看到，等加了r html才发现这是个换行符，为时已晚吖


// console.log(string.length)   打印方便看问题

// charCodeAt可以得出一个Unicode字符编码


// demo.innerHTML=string[n] //初始值
// substring接受两个参数，从哪到哪

// let n = 0  //用一个变量等于0 0的好处是可以当作下标
// 这一句话是有问题的，我们做的所有操作只能影响后面的，如果第一句话里面有回车，
// 我是不是就不能做一遍，除非我在外面再判断一下是不是回车，代码就重复了，
// 所以我们得想办法把下面一句代码放在计时器里面，怎么放呢？先直接删掉，那么n就不从0开始，从-1开始
// demo.innerHTML=string.substring(0,n)
// 为什么从-1开始呢？最开始你自己写n是0，那么计时器里n+1，就是从1开始了。然而0那就是没人做了
// 是-1的话，计时器就是从0开始
let n= -1

// 把1变成2 demo.innerHTML = 2（setTimeout只有变一次效果）
// 不停的变 |1、用一个变量等于1 |2、初始值就是n |3、setInterval可以一直变
/* setInterval(()=>{
     n+=1
     demo.innerHTML=n
},1000)*/
//老手不用interval，老手用setTimeout递归能够实现同样的效果，好处是可以随时停止



let step = () => {
/* console.log('1秒钟之后显示加1')   打印一下帮助理解
   setTimeout( ()=>{
       console.log(n)  //n=10 直接写n>=string.length，n为10之后还是会往下走，n就是11了，内容还是undefined,
       这时候要打印看问题了,打印一个n和字符长度
       写出n就会出现问题.一种写出n+1就能解决问题了,第二种挪位置，
       看下面代码如果你不知道是n还是n+1，两个都试一试
       
       n+=1
       demo.innerHTML=string.substring(0,n) 
       if(n>=string.length){   
            return
       }  
       
       //如果是n+1，为什么写n+1呢，是为了解决一开始demo.innerHTML=string[n]依次打印最后结果是n为11时，出现undefined,
       所以下面两行代码你不能在这里待着吖，如果是substring就没这个问题，不过n是会走到11
        n+=1
        demo.innerHTML=string.substring(0,n) 
       //
        
       step()
    
        // if(n<string.length){
            step() 
           }else{
            console.log('我累了，调不动自己了')  
           }     //委婉写法，不过会往下走，内容就是undefined // 
    
   },1000)
*/
//优化一下代码，上面的太复杂了，当作自己笔记看
    setTimeout( ()=>{
        console.log(n)
        n+=1
        // console.log(string[n])
        if(string[n] === '\n'){   //如果是回车
            string2 = string2 + "<br>"

        }else{  //如果不是回车就照搬
            string2 = string2 + string[n]
        }
        demo.innerHTML = string2
        // demo.innerHTML=string.substring(0,n)  不这么写了
        
        //console.log(string2)
        if(n < string.length){
            step()
        }else{
            console.log('好啦，调完了')
        }
    },100)

}
step()

// 为啥是递归呢 自己调用自己，看下面代码
/*  setTimeout( ()=>{
       n+=1
       demo.innerHTML=n
       step()
    
        setTimeout( ()=>{
        
            step()
    
        },1000)
            setTimeout( ()=>{
            
                step() 
        
            },1000)
                setTimeout( ()=>{n
               
                   step()
            
                },1000)
    },1000) */
// 如果多写两次次step() 结果为1 3  2不见了
/*  let step = () => {
        console.log('1秒钟之后显示加1')
        setTimeout( ()=>{
            n+=1
            demo.innerHTML=n
        
        },1000)
    }
step() =>1变2
step() =>2不会变3 
因为时间是错的，由于你两次设置setTimeout都是1s之后，
就好像你在睡觉之前跟手机说给我定一个6小时之后的闹钟，
然后你马上又说了一句给我定一个6小时后的闹钟
结果手机会在6小时之后响两次闹钟
这个也一样，你第一次说我在1s之后把1变成2，
然后你第二次又说我要在1s之后把2变成3
所以最后的结果是1变成2马上变成3，中间没有那个过程
不能step再step,除非你是第一次step() 1000,第二次是step() 2000才可能
*/
