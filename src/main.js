let html = document.querySelector("#html")
let style = document.querySelector("#style")  

//同时把这个代码写入html和css当中
let string=`/* 你好,我叫小徐
 * 接下来我要演示一下我的前端功底
 * 首先我得准备一个div
 * */ 
#div1{
    
    border: 1px solid red;
    height: 200px;
    width: 200px;
}
/* 接下来我把div变成一个八卦图
 * 注意啦啦啦啦
 * 首先，把div变成一个圆
 */
#div1{
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    border:none;
}
/* 八卦是阴阳形成的
 * 一黑一百
 * */
#div1{
    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);
}
/* 下面加两个风火轮 */
#div1::before{
    width: 100px;
    height: 100px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);
    border-radius: 50%;
}
#div1::after{
    width: 100px;
    height: 100px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);
    border-radius: 50%;
}
`
let string2 = '' 

let n= 0

let step = () => {
    setTimeout( ()=>{
        // console.log(string[n])
        // console.log(n) //length不-1，53的时候就undefined了
        // console.log(string.length) //54
        //如果是回车 
        //如果不是回车就照搬
        // string2 += (string[n] === '\n' ? "<br>" : string[n])
        if(string[n] === "\n"){
            string2 += "<br>"
        }else if(string[n] === " "){  //改缩进 在html里，无数个空格也会被改成一个空格
            string2 += "&nbsp;"
        }else{
            string2 += string[n]
        }
        
        
        html.innerHTML = string2
        // style.innerHTML = string2 直接style里加内容，会把nbsp这些html标签写入css,变通一下用subString()
        style.innerHTML = string.substring(0,n) //直接这样写还是有一些问题，html的文字可能对样式有些影响，所以给文字加注释
        window.scrollTo(0,99999);  //写完就滚一下
        html.scrollTo(0,99999);
        
        if(n < string.length-1){
            //如果不是最后一个就继续
            n+=1            
            step()
        }else{
            console.log('好啦，调完了')
        }
    },50)
}
step()

// 有个问题，也没如果没有足够大去容纳我们的代码，用户不拖拽就看不到效果，该怎么解决？ window.scrollTo(0,99999);
// 怎么设置换行,到了页面自动折行 word-break:break-all;
// 手机页面会出现八卦图被挡的情况，使用媒体查询 
// 手机很窄但手机很长，可以使用上下结构 



// style的innerHtml是可以被改写的,如以下代码
/* setTimeout(()=>{
    style.innerHTML = `
    body{
      color:red;
    }
    `
},1000)*/
