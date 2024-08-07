const readline = require("readline")
const fs = require("fs")
const http = require('http')
const url = require("url")

const events = require('events')

//USER DEFINE MODULES
const user = require('./Modules/user')
const replaceHtml = require('./Modules/replaceHtml')
/*
Lecture 4:
READING INPUT AND WRITING OUTPUT
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.question("Please enter your name: ", (name)=> {
    console.log("You entered:", name)
    rl.close()
})
rl.on("close", ()=> {  
    console.log("Interface closed")
    process.exit(0)
})
    */

/* LECTURE 5:
    Reading and Writing to a File

let textIn = fs.readFileSync('./Files/input.txt', 'utf8')
console.log(textIn)

let content = `Data read now from input.txt: ${textIn}. \nDate created ${new Date}`
fs.writeFileSync('./Files/output.txt', content)
*/

/* Lecture 7: Reading and Writing to file Asyn

When executed, 'Reading....' is logged synchronously.
The asynchronous file operations (fs.readFile calls) begin.
Each fs.readFile function reads a file and once complete, executes its callback function which logs the respective file's contents.
After all reads and writes are complete, the success message 'File written successfully.' is logged.

fs.readFile('./Files/start.txt', 'utf-8', (error1, data1) => {
    console.log(data1)
    fs.readFile(`./Files/${data1}.txt`, 'utf-8', (error2, data2)=>{
        console.log(data2)
        fs.readFile('./Files/append.txt', 'utf-8', (error, data3)=>{
            console.log(data3)
            fs.writeFile('./Files/output.txt', `${data2} \n\n${data3} \n\n Date created ${new Date}`, ()=>{
                console.log('File written successfully.')
            })
        })
    })
})
console.log('Reading....')
*/

/* Lecture 8 to 14:
Creating a web server & Routes
*/
const html = fs.readFileSync('./Template/index.html', "utf-8")
let products = JSON.parse(fs.readFileSync('./Data/products.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', "utf-8")
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8')

//function replaceHtml(template, product){
  //  let output = template.replace('{{%IMAGE%}}', product.productImage)
  //  output = output.replace('{{%NAME%}}', product.name)
 //   output = output.replace('{{%MODELNAME%}}', product.modeName)
   // output = output.replace('{{%MODELNO%}}', product.modelNumber)
   // output = output.replace('{{%SIZE%}}', product.size)
    //output = output.replace('{{%CAMERA%}}', product.camera)
   // output = output.replace('{{%PRICE%}}', product.price)
    //output = output.replace('{{%COLOR%}}', product.color)
    //output = output.replace('{{%ID%}}', product.id)
    //output = output.replace('{{%ROM%}}', product.ROM)
    //output = output.replace ("{{%DESC%}}", product.Description)
    //return output
//}
/// Step 1: Create A Server
/*
const server = http.createServer((request, response) => {
    let {query, pathname: path} = url.parse(request.url, true)
    if (path === '/' || path === '/home'){
        response.writeHead(200, {'Content-Type': 'text-html',
            'my-header': 'Hello, world.'
        })
        response.end(html.replace('{{%CONTENT%}}', "Youre Home"))
    } else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {'Content-Type': 'text-html',
            'my-header': 'Hello, world'
        })
        response.end(html.replace('{{%CONTENT%}}', 'Youre in About page'))
    } else if (path.toLocaleLowerCase() === '/contact'){
        response.end(html.replace('{{%CONTENT%}}', 'Youre in Contact page'))
    } else if(path.toLocaleLowerCase() === '/products'){
        // response for request to just products
        if(!query.id){
            let productHtmlArray = products.map((prod)=>{
                return replaceHtml(productListHtml, prod)
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(productResponseHtml)
        //console.log(productHtmlArray.join(','))
        // response for when single product is clicked
        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod)
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml))
        }
        
    } else {
        response.writeHead(404)
        response.end(html.replace('{{%CONTENT%}}', '404: E no dey.'))
    }
    
    //console.log(response)
}) */
/**********
UNDERSTANDING EVENT DRIVEN ARCHITECTURE
***********/

const server = http.createServer()
server.on('request', (request, response)=>{
    let {query, pathname: path} = url.parse(request.url, true)
    if (path === '/' || path === '/home'){
        response.writeHead(200, {'Content-Type': 'text-html',
            'my-header': 'Hello, world.'
        })
        response.end(html.replace('{{%CONTENT%}}', "Youre Home"))
    } else if (path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {'Content-Type': 'text-html',
            'my-header': 'Hello, world'
        })
        response.end(html.replace('{{%CONTENT%}}', 'Youre in About page'))
    } else if (path.toLocaleLowerCase() === '/contact'){
        response.end(html.replace('{{%CONTENT%}}', 'Youre in Contact page'))
    } else if(path.toLocaleLowerCase() === '/products'){
        // response for request to just products
        if(!query.id){
            let productHtmlArray = products.map((prod)=>{
                return replaceHtml(productListHtml, prod)
            })
            let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','))
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(productResponseHtml)
        //console.log(productHtmlArray.join(','))
        // response for when single product is clicked
        } else {
            let prod = products[query.id]
            let productDetailResponseHtml = replaceHtml(productDetailHtml, prod)
            response.end(html.replace('{{%CONTENT%}}', productDetailResponseHtml))
        }
        
    } else {
        response.writeHead(404)
        response.end(html.replace('{{%CONTENT%}}', '404: E no dey.'))
    }
})
// Step 2: Start the server
server.listen(8000, '127.0.0.1', () => {
    console.log("Server wanna be startin something....")
}) 

/***************
EMITTING & HANDLING CUSTOM EVENTS
****************/

let myEmitter = new user()

myEmitter.on('userCreated', (id, name)=>{
    console.log(`A new user ${name} with ID ${id} is created`)
})

myEmitter.on('userCreated', (id, name)=>{
    console.log(`A new user ${name} with ID ${id} is added to database`)
})
myEmitter.emit('userCreated', '001', "John")
