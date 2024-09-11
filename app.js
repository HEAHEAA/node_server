const userController = require('./controller/userController');
const fileController = require('./controller/fileController');

const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//파일 저장위치 및 파일명 설정 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/'); //저장할 폴더
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random() * 169);
        cb(null, uniqueSuffix+'-'+file.originalname); //고유한 파일명 생성
    }
});


const upload = multer({storage: storage});

//업로드 폴더가 없으면 생성
if(!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
}

app.post('/register', userController.Register);
app.post('/login', userController.Login);
app.post('/refresh_token', userController.refreshJWT);

app.get('/sample', userController.authenticateToken ,userController.SampleAPI);


app.post('/upload', upload.single('file'), userController.authenticateToken, fileController.filesUpload);
app.get('/file/:sys_file_id', userController.authenticateToken, fileController.filesShowClient);





app.listen(port, ()=> {
    console.log(`Node_Server API listening on Port : ${port}`);
});
