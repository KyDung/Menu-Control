const categoryButtons = document.getElementById("categoryButtons");
const categoryContent = document.getElementById("categoryContent");

const categoryTemplate = document.getElementById("categoryTemplate");
const blockTemplate = document.getElementById("blockTemplate");
const gameTemplate = document.getElementById("gameTemplate");

const loginGate = document.getElementById("loginGate");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginMessage = document.getElementById("loginMessage");
const currentUserLabel = document.getElementById("currentUserLabel");
const logoutButton = document.getElementById("logoutButton");

const dataConfig = window.GAME_HUB_DATA ?? {};
const authConfig = dataConfig.auth ?? {};
const mockAccounts = authConfig.mockAccounts ?? [];
const authEnabled = authConfig.enabled !== false;
const categories = dataConfig.categories ?? [];

const STORAGE_KEYS = {
  rememberedAccount: "gameHub.rememberedAccount",
};

let activeCategoryId = categories[0]?.id || null;

if (!authEnabled) {
  unlockApp("Guest");
} else {
  setupAuth();
}

bindLogoutHandler();

function setupAuth() {
  const remembered = readRememberedAccount();
  if (remembered) {
    unlockApp(remembered.displayName || remembered.username);
    return;
  }

  showLogin();

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const account = validateAccount(username, password);

    if (!account) {
      loginMessage.textContent = "Sai username hoac password.";
      return;
    }

    saveRememberedAccount(account);
    loginMessage.textContent = "";
    unlockApp(account.displayName || account.username);
  });
}

function bindLogoutHandler() {
  logoutButton?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.rememberedAccount);
    showLogin();

    if (usernameInput) {
      usernameInput.value = "";
      usernameInput.focus();
    }
    if (passwordInput) {
      passwordInput.value = "";
    }
    if (loginMessage) {
      loginMessage.textContent = "Ban da logout.";
    }
  });
}

function showLogin() {
  document.body.classList.remove("authenticated");

  if (loginGate) {
    loginGate.hidden = false;
    loginGate.style.display = "grid";
  }
  if (appShell) {
    appShell.hidden = true;
    appShell.style.display = "none";
  }
}

function unlockApp(displayName) {
  document.body.classList.add("authenticated");

  if (loginGate) {
    loginGate.hidden = true;
    loginGate.style.display = "none";
  }
  if (appShell) {
    appShell.hidden = false;
    appShell.style.display = "block";
  }
  if (currentUserLabel) {
    currentUserLabel.textContent = displayName;
  }
  renderPortal();
}

function validateAccount(username, password) {
  return mockAccounts.find(
    (account) => account.username === username && account.password === password,
  );
}

function saveRememberedAccount(account) {
  const remembered = {
    username: account.username,
    password: account.password,
    displayName: account.displayName || account.username,
  };
  localStorage.setItem(
    STORAGE_KEYS.rememberedAccount,
    JSON.stringify(remembered),
  );
}

function readRememberedAccount() {
  const raw = localStorage.getItem(STORAGE_KEYS.rememberedAccount);

  if (!raw) {
    return null;
  }

  try {
    const remembered = JSON.parse(raw);
    const account = validateAccount(remembered.username, remembered.password);
    return account || null;
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEYS.rememberedAccount);
    return null;
  }
}

function renderPortal() {
  if (!categories.length) {
    categoryContent.innerHTML =
      '<p class="empty-state">Chua co category nao. Ban hay them du lieu trong file data.js.</p>';
    categoryButtons.innerHTML = "";
    return;
  }

  if (!activeCategoryId) {
    activeCategoryId = categories[0].id;
  }

  renderCategoryButtons();
  renderCategoryPanel(activeCategoryId);
}

function renderCategoryButtons() {
  categoryButtons.innerHTML = "";

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-button";
    button.textContent = category.label;
    button.dataset.id = category.id;

    if (category.id === activeCategoryId) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      activeCategoryId = category.id;
      updateActiveButton();
      renderCategoryPanel(activeCategoryId);
    });

    categoryButtons.appendChild(button);
  });
}

function updateActiveButton() {
  const buttons = categoryButtons.querySelectorAll(".category-button");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.id === activeCategoryId);
  });
}

function renderCategoryPanel(categoryId) {
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    categoryContent.innerHTML =
      '<p class="empty-state">Khong tim thay category duoc chon.</p>';
    return;
  }

  categoryContent.innerHTML = "";

  const panelFragment = categoryTemplate.content.cloneNode(true);
  panelFragment.querySelector(".panel-title").textContent = category.label;
  panelFragment.querySelector(".panel-subtitle").textContent =
    category.subtitle || "";

  const blocksGrid = panelFragment.querySelector(".blocks-grid");

  if (!category.blocks?.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Category nay chua co block nao.";
    blocksGrid.appendChild(empty);
  } else {
    category.blocks.forEach((block, index) => {
      const blockFragment = blockTemplate.content.cloneNode(true);
      blockFragment.querySelector(".block-title").textContent = block.title;
      blockFragment.querySelector(".block-description").textContent =
        block.description || "";

      const blockNode = blockFragment.querySelector(".game-block");
      blockNode.style.animationDelay = `${index * 70}ms`;

      const gameList = blockFragment.querySelector(".game-list");

      if (!block.games?.length) {
        const emptyGame = document.createElement("p");
        emptyGame.className = "empty-state";
        emptyGame.textContent = "Block nay chua co game.";
        gameList.appendChild(emptyGame);
      } else {
        block.games.forEach((game) => {
          const gameFragment = gameTemplate.content.cloneNode(true);
          const gameCard = gameFragment.querySelector(".game-card");
          const gameImage = gameFragment.querySelector(".game-image");
          const gamePlaceholder =
            gameFragment.querySelector(".game-placeholder");
          const gameNote = gameFragment.querySelector(".game-note");
          const normalizedImageUrl = normalizeGameImageUrl(game.image);

          gameCard.href = game.url;
          gameFragment.querySelector(".game-name").textContent = game.name;

          if (gameNote) {
            gameNote.textContent = game.note || "Nhan de mo game";
          }

          if (normalizedImageUrl && gameImage && gamePlaceholder) {
            gameImage.src = normalizedImageUrl;
            gameImage.alt = `Anh minh hoa cua ${game.name}`;
            gameImage.hidden = false;
            gamePlaceholder.hidden = true;
          } else if (gamePlaceholder && gameImage) {
            const firstLetter =
              String(game.name || "G")
                .trim()
                .charAt(0) || "G";
            gamePlaceholder.textContent = firstLetter.toUpperCase();
            gamePlaceholder.hidden = false;
            gameImage.hidden = true;
            gameImage.removeAttribute("src");
          }

          gameList.appendChild(gameFragment);
        });
      }

      blocksGrid.appendChild(blockFragment);
    });
  }

  categoryContent.appendChild(panelFragment);
}

function normalizeGameImageUrl(imageValue) {
  if (!imageValue || typeof imageValue !== "string") {
    return "";
  }

  const trimmed = imageValue.trim();
  if (!trimmed) {
    return "";
  }

  const fileIdByPath = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (fileIdByPath?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileIdByPath[1]}&sz=w1200`;
  }

  const fileIdByQuery = trimmed.match(/[?&]id=([^&]+)/i);
  if (trimmed.includes("drive.google.com") && fileIdByQuery?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileIdByQuery[1]}&sz=w1200`;
  }

  return trimmed;
}
