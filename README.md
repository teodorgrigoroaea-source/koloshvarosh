# 🏰 Koloshvarosh - Ghid Cluj-Napoca (React + Tailwind)

Aplicație interactivă completă pentru descoperirea orașului Cluj-Napoca într-o escapadă de 3 zile, **fără orar rigid pe ore/zile**.

Construită special pentru cineva care merge pentru prima dată la Cluj și vrea să aleagă spontan ce să vadă, ce să mănânce și unde să se relaxeze.

---

## 🚀 Cum rulezi aplicația local

În PowerShell sau Terminal în acest folder:

```powershell
# Dacă PowerShell dă eroare la npm din cauza execution policy, folosește npm.cmd:
npm.cmd run dev
```

Aplicația se va deschide automat în browser la:
👉 **`http://localhost:3000`**

Dacă vrei să recompilezi pentru producție:
```powershell
npm.cmd run build
```

---

## ✨ Ce include aplicația:

1. **Categorii esențiale de explorat**:
   - 🏰 **Must-See & Simboluri**: Piața Unirii, Biserica Sf. Mihail, Dealul Cetățuia la apus, Grădina Botanică, Parcul Central & lacul Chios, Turnul Pompierilor.
   - ☕ **Capitala Specialty Coffee & Brunch**: Olivo, roots, Meron, Let's Coffee.
   - 🍲 **Mâncare & Restaurante**: Legendara Vărzărie (Varză a la Cluj autentică din comunism), Restaurant Roata (tradițional cu papanași), Zama (ciorbă în pită), Samsara Foodhouse (renumit vegetarian cu măslin interior), Cimbru.
   - 🍻 **Seara & Baruri Unice**: Enigma Cafe (primul bar steampunk cinetic din lume!), Charlie (cocktail lounge anii '20), Klausen Burger Rooftop, /FORM.
   - 🌿 **Natură & Mister**: Pădurea Hoia-Baciu (legende și copaci contorsionați), Parcul Etnografic Romulus Vuia (Muzeul Satului), Lacul Iulius.
   - 🚗 **Escapade Rapide (< 40 min)**: Salina Turda (minune sci-fi subterană), Cheile Turzii (canion spectaculos), Castelul Bánffy de la Bonțida (Electric Castle).

2. **Instrumente interactive utile**:
   - 🎲 **Butonul „Surprinde-mă (Ce să fac ACUM?)”**: Ruletă distractivă cu animație și confetti când nu știi ce să alegi pe moment.
   - ❤️ **„Lista Mea de Cluj” (Wishlist)**: Salvează locuri în `localStorage`, cu bară de progres și opțiune de a bifa ce ai vizitat.
   - 🔍 **Căutare inteligentă**: Caută după nume, cartier, mâncare („varză”, „apus”, „steampunk”, etc.).
   - ⏳ **Filtru după ritm & durată**: Rapid (< 1h), Relaxat (1-2h), Jumătate de zi, Gratuit.
   - 🗺️ **Linkuri directe Google Maps**: Fiecare card și modal te duce cu un click direct la navigația pe hartă.
   - 💡 **Ponturi de localnic**: Fiecare atracție conține recomandări despre ce să comanzi și când e cel mai bun moment să mergi.
   - 🚌 **Ghidul de supraviețuire pentru prima dată în Cluj**: Detalii despre plata contactless direct în autobuz, autobuzul 5 de la aeroport, ritmul calm ardelenesc și siguranță.
