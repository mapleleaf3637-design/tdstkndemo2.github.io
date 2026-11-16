# Hướng dẫn nhanh – The Lost Elephant Archive

## Dùng ngay trên GitHub Pages

1. Giải nén file ZIP. Bạn sẽ thấy thư mục `the-lost-elephant-archive`.
2. Tạo một repository trên GitHub, rồi đưa **toàn bộ nội dung bên trong thư mục** lên nhánh `main`. Phải có `index.html` ở thư mục gốc của repository.
3. Vào **Settings → Pages → Build and deployment**.
4. Chọn **Deploy from a branch**, nhánh **main**, thư mục **/(root)**, rồi nhấn **Save**.
5. Mở đường dẫn GitHub Pages được GitHub cung cấp. Website chạy trực tiếp, không cần cài thư viện hay build.

## Chạy và chỉnh sửa trên máy

Mở terminal ở thư mục chứa `index.html`, chạy:

```bash
python -m http.server 8000
```

Truy cập `http://localhost:8000`. Không nên nháy đúp mở `index.html` bằng giao thức `file://` vì các ES modules sẽ bị trình duyệt hạn chế.

**Những file cần biết:**

- `assets/prologue/1.png` → `9.png`: chín ảnh gốc, đúng thứ tự đã cung cấp.
- `js/data/prologue-scenes.js`: toàn bộ lời thoại của chín cảnh; chỉnh nội dung ở đây.
- `js/config.js`: đường dẫn ảnh, tốc độ gõ chữ và chuyển cảnh.
- `js/components/ProloguePlayer.js`: hiệu ứng gõ chữ, tương tác chạm, Skip và chuyển cảnh.
- `js/screens/ArchiveEntry.js`: màn hình bản đồ tri thức với sáu nhánh và tiến độ.
- `js/stages/stage1.js`: vị trí dành cho Stage 1 khi nhóm phát triển tiếp.
- `js/router.js`: hệ thống chuyển màn hình tập trung.
- `js/gameState.js`: trạng thái và tiến độ trò chơi.

## Quan trọng khi tiếp tục phát triển Stage 1

- **Skip** chỉ bỏ qua Prologue và dẫn tới Archive Entry, không nhảy qua Stage 1.
- Hướng dẫn tương tác thực sự của Stage 1 **chưa được xây dựng**; bản hiện tại là màn giới thiệu/placeholder có mô tả các bước học.
- Khi bổ sung Stage 1, hãy hiển thị hướng dẫn nếu `getGameState().stage1TutorialCompleted === false`.
- Chỉ gọi `setStage1TutorialCompleted()` **sau khi người chơi thực sự hoàn thành hướng dẫn**.
- Khi giải được nhiệm vụ tương ứng, sử dụng `restoreKnowledgeBranch('behavior' | 'domestication' | 'care')` để cập nhật tiến độ Archive.
- Xem lại Prologue không xóa tiến độ đã có.

Để xem hướng dẫn kỹ hơn, mở `README.md`.
