export class createBlogDto {
  title: string;
  content: string;
  thumbnail_url?: string; // thêm optional nếu client lỡ gửi
}
