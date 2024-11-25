const mezok = document.querySelectorAll(".mezo");
const eredmeny = document.getElementById("eredmeny");
const ujJatekGomb = document.getElementById("uj-jatek");
const ketJatekosGomb = document.getElementById("ket-jatekos");
const egyJatekosGomb = document.getElementById("egy-jatekos");

let aktivJatek = true;
let aktualisJatekos = "X";
let jatekMod = "ket-jatekos"; 
let allapot = Array(9).fill(null);

const nyeroKombinaciok = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function ellenorzes() {
    for (const kombinacio of nyeroKombinaciok) {
        const [a, b, c] = kombinacio;
        if (allapot[a] && allapot[a] === allapot[b] && allapot[a] === allapot[c]) {
            aktivJatek = false;
            eredmeny.textContent = `${aktualisJatekos} játékos nyert.`;
            return;
        }
    }

    if (!allapot.includes(null)) {
        aktivJatek = false;
        eredmeny.textContent = "A játék döntetlen.";
    }
}

function gepLepes() {
    const szabadMezok = allapot.map((mezo, index) => (mezo === null ? index : null)).filter(index => index !== null);
    const veletlenIndex = szabadMezok[Math.floor(Math.random() * szabadMezok.length)];
    mezok[veletlenIndex].textContent = aktualisJatekos;
    mezok[veletlenIndex].classList.add("foglalt");
    allapot[veletlenIndex] = aktualisJatekos;
    ellenorzes();
    aktualisJatekos = "X";
}

mezok.forEach(mezo => {
    mezo.addEventListener("click", () => {
        const index = mezo.dataset.index;
        if (aktivJatek && !allapot[index]) {
            mezo.textContent = aktualisJatekos;
            mezo.classList.add("foglalt");
            allapot[index] = aktualisJatekos;

            ellenorzes();

            if (aktivJatek) {
                aktualisJatekos = aktualisJatekos === "X" ? "O" : "X";
                if (jatekMod === "egy-jatekos" && aktualisJatekos === "O") {
                    setTimeout(gepLepes, 500);
                }
            }
        }
    });
});

ujJatekGomb.addEventListener("click", () => {
    allapot.fill(null);
    mezok.forEach(mezo => {
        mezo.textContent = "";
        mezo.classList.remove("foglalt");
    });
    eredmeny.textContent = "";
    aktivJatek = true;
    aktualisJatekos = "X";
});

ketJatekosGomb.addEventListener("click", () => {
    jatekMod = "ket-jatekos";
    ujJatekGomb.click();
});

egyJatekosGomb.addEventListener("click", () => {
    jatekMod = "egy-jatekos";
    ujJatekGomb.click();
});
