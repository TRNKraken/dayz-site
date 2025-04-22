
let ammoData = [
  {
    name: "5.56x45mm HP",
    health: 95,
    blood: 150,
    shock: 125,
    boxImage: "images/556_hp_box.png",
    bulletImage: "images/556_hp_bullet.png",
    caliber: "5.56x45mm"
  },
  {
    name: "5.56x45mm M856",
    health: 115,
    blood: 100,
    shock: 70,
    boxImage: "images/556_m856_box.png",
    bulletImage: "images/556_m856_bullet.png",
    caliber: "5.56x45mm"
  }
];

function renderCards() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  ammoData.forEach((ammo, index) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow';
    card.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${ammo.name}</h2>
      <p>Health: <input type="number" value="${ammo.health}" onchange="updateValue(${index}, 'health', this.value)"></p>
      <p>Blood: <input type="number" value="${ammo.blood}" onchange="updateValue(${index}, 'blood', this.value)"></p>
      <p>Shock: <input type="number" value="${ammo.shock}" onchange="updateValue(${index}, 'shock', this.value)"></p>
      <p>Box Image: <img src="${ammo.boxImage}" class="w-24 mt-2"></p>
      <p>Bullet Image: <img src="${ammo.bulletImage}" class="w-24 mt-2"></p>
      <button onclick="deleteAmmo(${index})" class="mt-2 text-red-500">Delete</button>
    `;
    app.appendChild(card);
  });
}

function updateValue(index, field, value) {
  ammoData[index][field] = parseInt(value);
  renderCards();
}

function deleteAmmo(index) {
  ammoData.splice(index, 1);
  renderCards();
}

function downloadJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ammoData, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute("href", dataStr);
  dlAnchor.setAttribute("download", "ammo_data.json");
  dlAnchor.click();
}

document.getElementById('jsonUpload').addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = function () {
    ammoData = JSON.parse(reader.result);
    renderCards();
  };
  reader.readAsText(e.target.files[0]);
});

window.onload = renderCards;
