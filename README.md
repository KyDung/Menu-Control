# Game Hub Static Page

Trang web tinh de ban deploy mien phi bang GitHub Pages.

## Deploy nhanh

1. Push toan bo file len repository GitHub.
2. Vao **Settings > Pages**.
3. Chon source: **Deploy from a branch**.
4. Chon branch (thuong la `main`) va folder `/root`.
5. Save, doi GitHub Pages build.

## Them / xoa game

Ban chi can sua file `data.js`.

- `categories`: Danh sach nhom chinh (hien tai la Mini Game va Random Game).
- `blocks`: Moi category co the co nhieu block.
- `games`: Moi block co danh sach game (chi can `name` va `url`).

## Dang nhap mock (ao)

Tinh nang dang nhap duoc cau hinh trong `data.js`:

- `auth.enabled`: bat/tat dang nhap (`true` hoac `false`).
- `auth.mockAccounts`: danh sach tai khoan mock.

### Mau tai khoan

```js
{
  username: "admin",
  password: "123456",
  displayName: "Admin"
}
```

Khi dang nhap thanh cong, thong tin tai khoan duoc luu vao `localStorage` de lan sau vao thang, chi dang nhap lai khi bam logout.

### Mau them game

```js
{
  name: "Ten Game",
  url: "https://your-username.github.io/ten-game/"
}
```

### Mau them block

```js
{
  title: "Block Moi",
  description: "Mo ta ngan",
  games: [
    {
      name: "Game A",
      url: "https://your-username.github.io/game-a/"
    }
  ]
}
```

## Tuy chinh giao dien

- Doi mau/chu o `styles.css`.
- Doi noi dung title + mo ta o `index.html`.
