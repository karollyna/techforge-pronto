import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Configuração do armazenamento no disco com prevenção de colisão de nomes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Evita colisão gerando um hash único + nome original formatado
    const fileHash = crypto.randomBytes(10).toString('hex');
    const extension = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extension).replace(/\s+/g, '-');
    
    cb(null, `${basename}-${fileHash}${extension}`);
  },
});

// Validação de extensão (Apenas imagens)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de arquivo inválido. Apenas JPG, PNG e WEBP são permitidos.'));
  }
};

// Exporta o middleware pronto com limite de 5MB
export const uploadMiddleware = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB por arquivo
  },
  fileFilter: fileFilter,
});