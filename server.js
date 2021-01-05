const http = require('http');
const qs = require('querystring');
const fs = require('fs');


let name=''
http.createServer(function (req,res) {
    if(req.url === "/" && req.method === "GET"){
        // Show Form Login
        fs.readFile("index.html", (err, data) => {
            if(err){
                // show eror
                res.writeHead(404, {'Content-Type':'text/html'});
                return res.end("404 Not FOund");
            }
            // kirim form login
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write('<h2>Selamat Datang</h2>')
            res.write(data);
            return res.end();
        });
    }


    let dataUser = [{name: 'Userz 1'},{name: 'User 2'},{name: 'User 3'}];
    let dataBaru = dataUser.concat({ name })
    // console.log('databaru', dataBaru)

    if(req.url === "/create-user" && req.method === "POST"){

        // ambil data dari form kemudian proses

        let requestBody = '';
        req.on('data', function(data){
            // tangkap data dari form
            requestBody += data;
        });


        // kita sudah dapat datanya
        // langkah berikutnya tinggal di parse
        
        req.on('end', function(){
            const formData = qs.parse(requestBody);

            // tapilkan username yang disubmit di console
            dataBaru.concat(formData.username)
            name = formData.username.toString()
            // console.log('databaru',dataBaru)
            console.log('User was created => ' +formData.username)

                res.writeHead(201, {'Content-Type':'text/html'});
                res.write('<h2>User was Created</h2>')
                res.write('<p>username : '+formData.username+'</p>');
                res.write("<a href='/'>kembali</a><br>");
                res.write("<a href='/user'>lihat daftar user</a>");
                res.end();


        });
    }
    if(req.url === '/user' && req.method === 'GET'){

        res.writeHead(200, {'Content-Type':'text/html'});
        res.write('<h3>mantap user</h4>')

        res.write(`<p>${dataBaru.map(coba => `<li>${coba.name}</li>`)}</p>`)
        res.end();
    }

}).listen(4000);
console.log('server berjalan')






































// const http = require('http');
// const url = require('url');
// const fs = require('fs');


// http.createServer( function(req, res){

//     const q = url.parse(req.url, true);

//     if(q.pathname === '/create-user' && req.method === 'GET'){

//         const keyword = q.query.keyword;
//         console.log('ini',keyword)

//         if(keyword){
//         res.writeHead(200, {'Content-Type':'text/html'});
//         res.write('<p>nama anda adalah : ' + keyword + '</p>')
//         res.write("<a href='/'>Kembali</a> ")
//         }
//     }else{
//         fs.readFile('index.html', (err, data) => {
//             if(err){
//                 res.writeHead(404, {'Content-Type':'text/html'});
//                 return res.end('404 Not Found')
//             }
//             res.writeHead(200, {'Content-Type':'text/html'});
//             res.write(data);
//             return res.end();
//         })
//     }
// }).listen(4000)
// console.log('server berjalan')
