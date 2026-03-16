/*
  Quan ly game tai day:
  - Them/xoa category trong mang categories
  - Moi category co nhieu block
  - Moi block co nhieu game (name + url + note + image)
  - image co the la link online, link Drive, hoac duong dan local (vi du: "images/game-a.jpg")
*/

window.GAME_HUB_DATA = {
  auth: {
    enabled: true,
    mockAccounts: [
      {
        username: "admin",
        password: "123456",
        displayName: "Admin",
      },
      {
        username: "guest",
        password: "guest123",
        displayName: "Guest",
      },
    ],
  },
  categories: [
    {
      id: "mini-game",
      label: "Mini Game",
      subtitle: "Cac mini game, vao la choi ngay.",
      blocks: [
        {
          title: "Puzzle Mini",
          description: "Mini game giải đố vui nhộn.",
          games: [
            {
              name: "Crossword Game",
              url: "https://kydung.github.io/CrossWordGame-Remake/",
              note: "Đoán các từ khóa thông qua gợi ý!!.",
              image:
                "https://drive.google.com/file/d/1zkTXpqjuCYBdF7SHxKkbnfkN9odWalQz/view?usp=sharing",
            },
          ],
        },
      ],
    },
    {
      id: "random-game",
      label: "Random Game",
      subtitle: "Nhóm game gọi tên ngẫu nhiên",
      blocks: [
        {
          title: "",
          description: "Các game random vui nhộn.",
          games: [
            {
              name: "Slot Machine",
              url: "https://kydung.github.io/SlotMachine_Random/",
              note: "Máy slot có thể quay tên ngẫu nhiên.",
              image:
                "https://drive.google.com/file/d/1nhHq515Mt5Aq6hA8V27PumhcWispymq7/view?usp=sharing",
            },
            {
              name: "Poke-Run",
              url: "https://kydung.github.io/PokeRun/",
              note: "Tham gia cuộc đua và tìm ra người chiến thắng.",
              image:
                "https://drive.google.com/file/d/19X4NmX5QCRp21-X18piJ9vEkacok-az3/view?usp=sharing",
            },
          ],
        },
      ],
    },
  ],
};
