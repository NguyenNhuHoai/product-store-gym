import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Lưu ảnh vào thư mục uploads
    filename: (req, file, cb) => {
      const filename = Date.now() + extname(file.originalname); // Tạo tên file duy nhất
      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn kích thước file lên tới 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Kiểm tra loại file
    const isMimeTypeValid = allowedTypes.test(file.mimetype);
    const isExtnameValid = allowedTypes.test(
      extname(file.originalname).toLowerCase(),
    );

    if (isMimeTypeValid && isExtnameValid) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type!'));
  },
};
