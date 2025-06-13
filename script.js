let playerBalance = 2000000;
let ownedFactories = [];
let siloStorage = { zelazo: 0, wegiel: 0 };
let industrialStorage = { stal: 0 };
let coldStorage = { owoce: 0, warzywa: 0 };
let chilledTrucks = ["Chłodnia Volvo", "Chłodnia Mercedes"];

function startBuilding() {
    let factoryType = document.getElementById("factoryType").value;
    let cost = factoryType === "kopalnia_zelaza" ? 300000 : factoryType === "huta_stali" ? 600000 : 200000;

    if (playerBalance >= cost) {
        playerBalance -= cost;
        ownedFactories.push(factoryType);
        document.getElementById("buildingStatus").innerText = `✅ Fabryka ${factoryType} została zbudowana!`;
        updateDashboard();

        if (factoryType === "plantacja") {
            startFarming();
        }
    } else {
        document.getElementById("buildingStatus").innerText = `❌ Nie masz wystarczających funduszy!`;
    }
}

function startFarming() {
    setTimeout(() => {
        coldStorage.owoce += 50;
        coldStorage.warzywa += 50;
        document.getElementById("buildingStatus").innerText = `✅ Uprawa zakończona! Dodano 50 jednostek owoców i warzyw do magazynu.`;
        updateStorage();
    }, 30000);
}

function updateDashboard() {
    document.getElementById("ownedFactories").innerHTML = ownedFactories.map(f => `<li>${f}</li>`).join('');
    document.getElementById("chilledTrucks").innerHTML = chilledTrucks.map(t => `<li>${t}</li>`).join('');
}

function updateStorage() {
    document.getElementById("siloStorage").innerHTML = Object.entries(siloStorage).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    document.getElementById("industrialStorage").innerHTML = Object.entries(industrialStorage).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
    document.getElementById("coldStorage").innerHTML = Object.entries(coldStorage).map(([key, value]) => `<li>${key}: ${value}</li>`).join('');
}

function showTab(tab) {
    document.querySelectorAll("section").forEach(section => section.style.display = "none");
    document.getElementById(tab).style.display = "block";
}

updateDashboard();
updateStorage();
