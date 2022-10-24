import puppeteer from 'puppeteer';
import fs from "fs"
import pdfMake from "pdfmake"

async function screenshot(req){
try{
var fonts={
  Roboto:{
    normal:"./fonts/Poppins-Medium.ttf",
    italics:"./fonts/Poppins-Italic.ttf",
    bold:"./fonts/Poppins-SemiBold.ttf"
        }
      }

  let pdfmake= new pdfMake(fonts)    

  const browser = await puppeteer.launch({headless: true, defaultViewport:null});
  const page = await browser.newPage();
  await page.goto('https://developers.google.com/web/');


await page.screenshot({path: "./screenshot.png",fullPage: true});
await new Promise(resolve =>setTimeout(resolve,2000))
var docDefinition={
  pageSize:"A4",
  pageMargins:[30,40,30,40],
  footer: function (currentPage,pageCount){
    if(currentPage!=1){
      return [{text:`${currentPage}`/`${pageCount}`, color:"red",fontSize:8, absolutePosition:{x:540,y:10}},
      {canvas:[{type:'line',x1:30,y1:10,x2:575,y2:10, lineColor:'#CE181E',lineWidth:0.7}]}]
    }
  },
  header:function(currentPage,pageCount,pageSize){
    if(currentPage!=1){
      return[{text:"rajnikant",color:"red",fontSize:8,absolutePosition:{x:30,y:10}}]
    }
  },
  content:[
    {image:'./screenshot.png',pageBreak:'after'},
    // {
    //   toc:{
    //     title:{text:"tbale of content",bold:true},
    //     //textStyle:{italics:true},
    //     numberStyle:{fontSize:10}
    //   }
    // },
    //{text:'\n',pageBreak:'after'},
    {text:"hi rajnikant"}
  ]
}

var pdfDoc=pdfmake.createPdfKitDocument(docDefinition,{})
const writeStrim=fs.createWriteStream('tets.pdf')
pdfDoc.pipe(writeStrim)
pdfDoc.end()
await browser.close();
// return new Promise((resolve,reject)=>{
//    writeStrim.on('error',(err)=>{reject(err)}).on('finish',()=>{resolve()})
// }
// )
console.log('done!')
const data= fs.readFileSync('./tets.pdf')
return data
} catch(error){
  console.log(error)
}
};

export default screenshot
