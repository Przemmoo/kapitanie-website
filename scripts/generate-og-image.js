import { createCanvas, registerFont, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Konfiguracja obrazu
const WIDTH = 1200;
const HEIGHT = 630;

// Kolory zgodne z brand identity
const COLORS = {
  bg: '#121212',
  bgSecondary: '#1F1F1F',
  blue: '#00A9FF',
  gold: '#FFD700',
  textMain: '#F5F5F5',
  textSecondary: '#B3B3B3'
};

async function generateOGImage() {
  console.log('🎨 Generowanie obrazu og-default.jpg...');
  
  // Tworzenie canvas
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // Gradient tło
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, COLORS.bg);
  gradient.addColorStop(0.6, COLORS.bgSecondary);
  gradient.addColorStop(1, COLORS.bg);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtelny pattern/noise effect
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = COLORS.blue;
    ctx.fillRect(
      Math.random() * WIDTH,
      Math.random() * HEIGHT,
      Math.random() * 3,
      Math.random() * 3
    );
  }
  ctx.globalAlpha = 1;

  // Główny nagłówek "kapitanie"
  ctx.fillStyle = COLORS.textMain;
  ctx.font = 'bold 72px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const logoText = 'kapitanie';
  const logoY = HEIGHT * 0.35;
  ctx.fillText(logoText, WIDTH / 2, logoY);

  // Podkreślenie pod logo
  const logoWidth = ctx.measureText(logoText).width;
  const underlineY = logoY + 40;
  const underlineGradient = ctx.createLinearGradient(
    WIDTH / 2 - logoWidth / 2, underlineY,
    WIDTH / 2 + logoWidth / 2, underlineY
  );
  underlineGradient.addColorStop(0, COLORS.blue);
  underlineGradient.addColorStop(0.5, COLORS.gold);
  underlineGradient.addColorStop(1, COLORS.blue);
  
  ctx.fillStyle = underlineGradient;
  ctx.fillRect(WIDTH / 2 - logoWidth / 2, underlineY, logoWidth, 4);

  // Tagline
  ctx.fillStyle = COLORS.blue;
  ctx.font = '32px Arial, sans-serif';
  const tagline = 'Twój cel, nasza nawigacja';
  ctx.fillText(tagline, WIDTH / 2, HEIGHT * 0.52);

  // Opis usług
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = '24px Arial, sans-serif';
  const description = 'Kompleksowa produkcja eventów';
  ctx.fillText(description, WIDTH / 2, HEIGHT * 0.62);

  // Usługi
  ctx.fillStyle = COLORS.gold;
  ctx.font = '20px Arial, sans-serif';
  const services = 'Multimedia • Oświetlenie • Nagłośnienie • Obsługa techniczna';
  ctx.fillText(services, WIDTH / 2, HEIGHT * 0.70);

  // URL strony
  ctx.fillStyle = COLORS.textSecondary;
  ctx.font = '18px Arial, sans-serif';
  const url = 'kapitanie.com';
  ctx.fillText(url, WIDTH / 2, HEIGHT * 0.85);

  // Dodanie subtelnych akcentów po bokach
  // Lewy akcent
  const leftAccent = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  leftAccent.addColorStop(0, COLORS.blue + '40');
  leftAccent.addColorStop(0.5, COLORS.gold + '40');
  leftAccent.addColorStop(1, COLORS.blue + '40');
  ctx.fillStyle = leftAccent;
  ctx.fillRect(0, 0, 8, HEIGHT);

  // Prawy akcent
  const rightAccent = ctx.createLinearGradient(WIDTH - 8, 0, WIDTH, HEIGHT);
  rightAccent.addColorStop(0, COLORS.blue + '40');
  rightAccent.addColorStop(0.5, COLORS.gold + '40');
  rightAccent.addColorStop(1, COLORS.blue + '40');
  ctx.fillStyle = rightAccent;
  ctx.fillRect(WIDTH - 8, 0, 8, HEIGHT);

  // Dodanie subtelnego logo/ikony w rogu (opcjonalne)
  ctx.fillStyle = COLORS.blue + '20';
  ctx.beginPath();
  ctx.arc(WIDTH - 80, 80, 30, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = COLORS.blue;
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('K', WIDTH - 80, 85);

  // Zapisanie pliku
  const outputPath = path.join(__dirname, '../public/images/og-default.jpg');
  
  // Sprawdź czy folder istnieje
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Konwersja do JPEG z jakością 90%
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ Obraz og-default.jpg został wygenerowany!');
  console.log(`📁 Lokalizacja: ${outputPath}`);
  console.log(`📐 Wymiary: ${WIDTH}x${HEIGHT}px`);
  console.log(`📊 Rozmiar: ${(buffer.length / 1024).toFixed(1)}KB`);
  
  return outputPath;
}

// Uruchomienie skryptu
generateOGImage().catch(console.error);

export { generateOGImage };
