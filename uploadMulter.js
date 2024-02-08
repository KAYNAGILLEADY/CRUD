// import path from 'path'
import multer from "multer"

// const uploadsFolder = path.resolve(__dirname, 'uploads/')

const storage = multer.diskStorage({ // função feita pelo chat-gpt
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
      },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Gera um timestamp único
        const timestamp = Date.now();

        // Gera um número aleatório entre 0 e 1000
        const randomNumber = Math.floor(Math.random() * 1000);
        // Indica o novo nome do arquivo:
        cb(null, `${timestamp}-${randomNumber}.${extensaoArquivo}`)
    }
});

const upload = multer({storage: storage})

export default upload;