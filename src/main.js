let html = document.querySelector("#demo")
let style = document.querySelector("#style")  

//同时把这个代码写入html和css当中
let string=`
/*你好呀，我是前端小白白
接下来我要加样式啦
我要加的样式是*/
body{
    color:red;
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
        
        
        if(n < string.length-1){
            //如果不是最后一个就继续
            n+=1            
            step()
        }else{
            console.log('好啦，调完了')
        }
    },100)
}
step()

// style的innerHtml是可以被改写的,如以下代码
/* setTimeout(()=>{
    style.innerHTML = `
    body{
      color:red;
    }
    `
},1000)*/
